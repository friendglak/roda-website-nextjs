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
    return db.query(models.CreditApplication).filter(models.CreditApplication.client_id == client_id).all()

def get_all_credits(db: Session, skip: int = 0, limit: int = 100):
    credits = db.query(models.CreditApplication).offset(skip).limit(limit).all()
    
    # Enrich with calculated totals
    results = []
    for credit in credits:
        total_paid = sum(p.amount for p in credit.payments)
        total_debt = credit.monthly_payment * credit.term_months
        
        # Convert to Pydantic model manually to include extra fields
        # Or rely on Pydantic's from_attributes if we attach attributes to the ORM object
        # Attaching to ORM object is a python hack but works for Pydantic serialization usually
        credit.total_paid = total_paid
        credit.total_debt = total_debt
        results.append(credit)
        
    return results

# Payment CRUD
def create_payment(db: Session, payment: schemas.PaymentCreate):
    # 1. Create Payment
    db_payment = models.Payment(**payment.model_dump())
    db.add(db_payment)
    
    # 2. Check total paid for this credit
    total_paid = db.query(func.sum(models.Payment.amount))\
        .filter(models.Payment.credit_id == payment.credit_id)\
        .scalar() or 0
    
    # Include current payment (since it's not committed yet, query might not see it depending on isolation, 
    # but easier to add it manually or flush first)
    db.flush() # Make db_payment visible in transaction
    
    # Re-calculate total (now includes current payment)
    total_paid = db.query(func.sum(models.Payment.amount))\
        .filter(models.Payment.credit_id == payment.credit_id)\
        .scalar() or 0

    # 3. Get Credit to check total amount
    credit = db.query(models.CreditApplication).filter(models.CreditApplication.id == payment.credit_id).first()
    
    if credit:
        # Calculate total debt (Amount + Interest) - Simplified logic
        # In a real app, we'd have a proper amortization schedule table.
        # Here: Total Debt = Monthly Payment * Terms
        total_debt = credit.monthly_payment * credit.term_months
        
        if total_paid >= total_debt - 100: # Tolerance for rounding
            credit.status = models.CreditStatus.PAID
        elif credit.status == models.CreditStatus.PENDING:
             # If first payment is made, move to approved/active if it was pending?
             # Or maybe just keep it approved. Let's assume Approved -> Paid.
             pass

    db.commit()
    db.refresh(db_payment)
    
    return db_payment
