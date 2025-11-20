from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
import redis
import json
import os
import logging
from datetime import timedelta

from . import crud, models, schemas, auth
from .database import engine, get_db
from .seed import seed_data

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Define root_path if behind a proxy like Nginx
app = FastAPI(title="Mini Roda API", version="1.0.0", root_path="/api")

# Run seed in background on startup
@app.on_event("startup")
def startup_event():
    try:
        seed_data()
    except Exception as e:
        logger.error(f"Seed failed: {e}")

# Configure Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
try:
    redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
    logger.info("Connected to Redis")
except Exception as e:
    logger.warning(f"Redis connection failed: {e}")
    redis_client = None

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Mini Roda API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "redis": "connected" if redis_client else "disconnected"}

# --- Authentication ---

@app.post("/token", response_model=dict)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Hardcoded admin user for MVP
    # In a real app, query a "users" table
    ADMIN_USER = "admin@roda.com"
    ADMIN_PASS_HASH = auth.get_password_hash("admin123")
    
    if form_data.username != ADMIN_USER or not auth.verify_password(form_data.password, ADMIN_PASS_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- Clients ---

@app.post("/clients/", response_model=schemas.Client, tags=["Clients"])
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_client = crud.get_client_by_email(db, email=client.email)
    if db_client:
        raise HTTPException(status_code=400, detail="Email already registered")
    logger.info(f"Creating client: {client.email}")
    return crud.create_client(db=db, client=client)

@app.get("/clients/", response_model=List[schemas.Client], tags=["Clients"])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Protected route
    return crud.get_clients(db, skip=skip, limit=limit)

@app.get("/clients/{client_id}", response_model=schemas.Client, tags=["Clients"])
def read_client(client_id: int, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Protected route
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

# --- Vehicles ---
# Vehicles are public (Catalog)

@app.post("/vehicles/", response_model=schemas.Vehicle, tags=["Vehicles"])
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Only admin can create vehicles
    db_vehicle = crud.create_vehicle(db=db, vehicle=vehicle)
    logger.info(f"Created vehicle: {db_vehicle.name}")
    
    if redis_client:
        try:
            redis_client.delete("vehicles_list")
            logger.info("Invalidated vehicle cache")
        except Exception as e:
            logger.error(f"Redis error on delete: {e}")
            
    return db_vehicle

@app.get("/vehicles/", response_model=List[schemas.Vehicle], tags=["Vehicles"])
def read_vehicles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Public route
    cache_key = "vehicles_list"
    
    if redis_client and skip == 0 and limit == 100:
        try:
            cached = redis_client.get(cache_key)
            if cached:
                logger.info("Cache HIT: vehicles")
                return json.loads(cached)
        except Exception as e:
            logger.error(f"Redis read error: {e}")

    logger.info("Cache MISS: vehicles - Fetching from DB")
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    
    if redis_client and skip == 0 and limit == 100:
        try:
            vehicles_data = [json.loads(schemas.Vehicle.model_validate(v).model_dump_json()) for v in vehicles]
            redis_client.setex(cache_key, 600, json.dumps(vehicles_data)) 
            logger.info("Cache SET: vehicles")
        except Exception as e:
            logger.error(f"Redis write error: {e}")
            
    return vehicles

# --- Credits ---

@app.post("/credits/", response_model=schemas.CreditApplication, tags=["Credits"])
def create_credit_application(credit: schemas.CreditApplicationCreate, db: Session = Depends(get_db)):
    # Public: Clients apply for credit
    client = crud.get_client(db, client_id=credit.client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    logger.info(f"Creating credit application for client {credit.client_id}")
    return crud.create_credit_application(db=db, credit=credit)

@app.get("/credits/{credit_id}", response_model=schemas.CreditApplication, tags=["Credits"])
def read_credit(credit_id: int, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Protected: Only admin sees details or owner (simplified to admin here)
    db_credit = crud.get_credit(db, credit_id=credit_id)
    if db_credit is None:
        raise HTTPException(status_code=404, detail="Credit application not found")
    return db_credit

@app.get("/credits/", response_model=List[schemas.CreditApplicationWithDetails], tags=["Credits"])
def read_all_credits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Protected: Admin dashboard only
    return crud.get_all_credits(db, skip=skip, limit=limit)

@app.get("/clients/{client_id}/credits", response_model=List[schemas.CreditApplication], tags=["Credits"])
def read_client_credits(client_id: int, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Protected
    return crud.get_credits_by_client(db, client_id=client_id)

# --- Payments ---

@app.post("/payments/", response_model=schemas.Payment, tags=["Payments"])
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    # Only admin registers payments for now
    credit = crud.get_credit(db, credit_id=payment.credit_id)
    if not credit:
        raise HTTPException(status_code=404, detail="Credit application not found")
        
    return crud.create_payment(db=db, payment=payment)
