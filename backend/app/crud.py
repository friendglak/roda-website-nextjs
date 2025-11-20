from sqlalchemy.orm import Session
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
    return db.query(models.CreditApplication).filter(models.CreditApplication.client_id == client_id).all()

def get_all_credits(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CreditApplication).offset(skip).limit(limit).all()

# Payment CRUD
def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(**payment.model_dump())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    
    # Update credit status logic could go here (e.g., check if fully paid)
    
    return db_payment
