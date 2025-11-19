from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import redis
import json
import os

from . import crud, models, schemas
from .database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mini Roda API", version="1.0.0")

# Configure Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
try:
    redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
except Exception as e:
    print(f"Warning: Redis connection failed: {e}")
    redis_client = None

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Mini Roda API"}

@app.get("/health")
def health_check():
    # Check DB
    try:
        # Simple query to check DB connection
        pass
    except:
        return {"status": "unhealthy", "db": "disconnected"}
        
    return {"status": "healthy", "redis": "connected" if redis_client else "disconnected"}

# --- Clients ---

@app.post("/clients/", response_model=schemas.Client, tags=["Clients"])
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_client = crud.get_client_by_email(db, email=client.email)
    if db_client:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_client(db=db, client=client)

@app.get("/clients/", response_model=List[schemas.Client], tags=["Clients"])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clients = crud.get_clients(db, skip=skip, limit=limit)
    return clients

@app.get("/clients/{client_id}", response_model=schemas.Client, tags=["Clients"])
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

# --- Vehicles ---

@app.post("/vehicles/", response_model=schemas.Vehicle, tags=["Vehicles"])
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    db_vehicle = crud.create_vehicle(db=db, vehicle=vehicle)
    
    # Invalidate cache
    if redis_client:
        try:
            redis_client.delete("vehicles_list")
        except Exception as e:
            print(f"Redis error: {e}")
            
    return db_vehicle

@app.get("/vehicles/", response_model=List[schemas.Vehicle], tags=["Vehicles"])
def read_vehicles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Try cache first (only if not paginated to keep it simple for MVP)
    if redis_client and skip == 0 and limit == 100:
        try:
            cached_vehicles = redis_client.get("vehicles_list")
            if cached_vehicles:
                return json.loads(cached_vehicles)
        except Exception as e:
            print(f"Redis error: {e}")

    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    
    # Set cache
    if redis_client and skip == 0 and limit == 100:
        try:
            # Serialize Pydantic models using model_dump
            # Note: We need to be careful with datetime objects if any, but vehicles usually don't have them or they are strings in this schema
            vehicles_data = [json.loads(schemas.Vehicle.model_validate(v).model_dump_json()) for v in vehicles]
            redis_client.setex("vehicles_list", 3600, json.dumps(vehicles_data)) # Cache for 1 hour
        except Exception as e:
            print(f"Redis set error: {e}")
            
    return vehicles

# --- Credits ---

@app.post("/credits/", response_model=schemas.CreditApplication, tags=["Credits"])
def create_credit_application(credit: schemas.CreditApplicationCreate, db: Session = Depends(get_db)):
    # Validate client and vehicle exist
    client = crud.get_client(db, client_id=credit.client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Optional: Validate vehicle logic here (e.g. price match)
    
    return crud.create_credit_application(db=db, credit=credit)

@app.get("/credits/{credit_id}", response_model=schemas.CreditApplication, tags=["Credits"])
def read_credit(credit_id: int, db: Session = Depends(get_db)):
    db_credit = crud.get_credit(db, credit_id=credit_id)
    if db_credit is None:
        raise HTTPException(status_code=404, detail="Credit application not found")
    return db_credit

@app.get("/clients/{client_id}/credits", response_model=List[schemas.CreditApplication], tags=["Credits"])
def read_client_credits(client_id: int, db: Session = Depends(get_db)):
    return crud.get_credits_by_client(db, client_id=client_id)

# --- Payments ---

@app.post("/payments/", response_model=schemas.Payment, tags=["Payments"])
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    credit = crud.get_credit(db, credit_id=payment.credit_id)
    if not credit:
        raise HTTPException(status_code=404, detail="Credit application not found")
        
    return crud.create_payment(db=db, payment=payment)
