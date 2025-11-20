from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:postgres@db:5432/miniroda")


def get_engine(url, max_retries=5, delay=5):
    """Create engine with retry logic"""
    for attempt in range(max_retries):
        try:
            engine = create_engine(url)
            connection = engine.connect()
            connection.close()
            logger.info("Database connection established successfully.")
            return engine
        except Exception as e:
            if attempt == max_retries - 1:
                logger.error(
                    f"Failed to connect to database after {max_retries} attempts: {e}")
                raise e

            logger.warning(
                f"Database connection failed (Attempt {attempt + 1}/{max_retries}). Retrying in {delay}s...")
            time.sleep(delay)


# Initialize engine with retries
engine = get_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
