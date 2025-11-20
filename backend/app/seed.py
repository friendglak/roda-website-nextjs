from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, schemas, crud

def seed_data():
    db = SessionLocal()
    
    # Check if vehicles exist
    vehicles = crud.get_vehicles(db)
    if vehicles:
        print("Vehicles already exist. Skipping seed.")
        return

    print("Seeding vehicles...")
    
    seed_vehicles = [
        {
            "name": "Roda E-Bike Sport",
            "type": "ebike",
            "price": 3500000,
            "brand": "Roda",
            "image_url": "https://images.unsplash.com/photo-1571068316344-75bc76f778f7?auto=format&fit=crop&q=80&w=600",
            "description": "Ideal para la ciudad, ligera y rápida."
        },
        {
            "name": "Scooter Pro Max",
            "type": "scooter",
            "price": 1800000,
            "brand": "Segway",
            "image_url": "https://images.unsplash.com/photo-1512106374988-c97f527a6d82?auto=format&fit=crop&q=80&w=600",
            "description": "Portabilidad máxima para el último kilómetro."
        },
        {
            "name": "Moped Eléctrico 3000",
            "type": "moped",
            "price": 7500000,
            "brand": "NIU",
            "image_url": "https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=600",
            "description": "Potencia y autonomía para entregas largas."
        }
    ]

    for v in seed_vehicles:
        vehicle_in = schemas.VehicleCreate(**v)
        crud.create_vehicle(db, vehicle_in)
        print(f"Created {v['name']}")

    db.close()

if __name__ == "__main__":
    # Ensure tables exist
    models.Base.metadata.create_all(bind=engine)
    seed_data()

