from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from .database import Base
import datetime
import enum


class VehicleType(str, enum.Enum):
    EBIKE = "ebike"
    SCOOTER = "scooter"
    MOPED = "moped"


class CreditStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    PAID = "paid"
    DEFAULT = "default"


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    credits = relationship("CreditApplication", back_populates="client")


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(Enum(VehicleType))
    price = Column(Float)
    brand = Column(String)
    image_url = Column(String, nullable=True)
    description = Column(String, nullable=True)


class CreditApplication(Base):
    __tablename__ = "credit_applications"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    amount = Column(Float)
    term_months = Column(Integer)
    interest_rate = Column(Float)
    monthly_payment = Column(Float)
    status = Column(Enum(CreditStatus), default=CreditStatus.PENDING)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    client = relationship("Client", back_populates="credits")
    vehicle = relationship("Vehicle")
    payments = relationship("Payment", back_populates="credit")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    credit_id = Column(Integer, ForeignKey("credit_applications.id"))
    amount = Column(Float)
    payment_date = Column(DateTime, default=datetime.datetime.utcnow)

    credit = relationship("CreditApplication", back_populates="payments")
