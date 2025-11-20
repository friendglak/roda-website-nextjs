from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas

# Client CRUD


def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()


def get_client_by_email(db: Session, email: str):
    return db.query(models.Client).filter(models.Client.email == email).first()


def get_clients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Client).offset(skip).limit(limit).all()


def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(**client.model_dump())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

# Vehicle CRUD


def get_vehicles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Vehicle).offset(skip).limit(limit).all()


def create_vehicle(db: Session, vehicle: schemas.VehicleCreate):
    db_vehicle = models.Vehicle(**vehicle.model_dump())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

# Credit CRUD


def create_credit_application(db: Session, credit: schemas.CreditApplicationCreate):
    db_credit = models.CreditApplication(**credit.model_dump())
    db.add(db_credit)
    db.commit()
    db.refresh(db_credit)
    return db_credit


def get_credit(db: Session, credit_id: int):
    return db.query(models.CreditApplication).filter(models.CreditApplication.id == credit_id).first()


def get_credits_by_client(db: Session, client_id: int):
    credit_apps = db.query(models.CreditApplication).filter(
        models.CreditApplication.client_id == client_id).all()

    results = []
    for credit in credit_apps:
        total_paid = sum(p.amount for p in credit.payments)
        total_debt = credit.monthly_payment * credit.term_months
        credit.total_paid = total_paid
        credit.total_debt = total_debt
        results.append(credit)

    return results


def get_all_credits(db: Session, skip: int = 0, limit: int = 100):
    credit_apps = db.query(models.CreditApplication).offset(
        skip).limit(limit).all()

    results = []
    for credit in credit_apps:
        total_paid = sum(p.amount for p in credit.payments)
        total_debt = credit.monthly_payment * credit.term_months
        credit.total_paid = total_paid
        credit.total_debt = total_debt
        results.append(credit)

    return results


def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(**payment.model_dump())
    db.add(db_payment)

    db.flush()

    total_paid = db.query(func.sum(models.Payment.amount))\
        .filter(models.Payment.credit_id == payment.credit_id)\
        .scalar()

    credit = db.query(models.CreditApplication).filter(
        models.CreditApplication.id == payment.credit_id).first()

    if credit:
        total_debt = credit.monthly_payment * credit.term_months

        if total_paid >= total_debt - 100:
            credit.status = models.CreditStatus.PAID

    db.commit()
    db.refresh(db_payment)

    return db_payment
