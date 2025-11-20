from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from .models import VehicleType, CreditStatus

# Client Schemas
class ClientBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Vehicle Schemas
class VehicleBase(BaseModel):
    name: str
    type: VehicleType
    price: float
    brand: str
    image_url: Optional[str] = None
    description: Optional[str] = None

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: int

    class Config:
        from_attributes = True

# Credit Schemas
class CreditApplicationBase(BaseModel):
    client_id: int
    vehicle_id: int
    amount: float
    term_months: int
    interest_rate: float
    monthly_payment: float

class CreditApplicationCreate(CreditApplicationBase):
    pass

class CreditApplication(CreditApplicationBase):
    id: int
    status: CreditStatus
    created_at: datetime

    class Config:
        from_attributes = True

# New Schema for Dashboard with Nested Details
class CreditApplicationWithDetails(CreditApplication):
    client: Optional[Client] = None
    vehicle: Optional[Vehicle] = None
    total_paid: float = 0.0
    total_debt: float = 0.0

# Payment Schemas
class PaymentBase(BaseModel):
    credit_id: int
    amount: float

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int
    payment_date: datetime

    class Config:
        from_attributes = True
