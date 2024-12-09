"""Database creation and function to retrieve session."""
import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# import models for db tables
from app.models import Base
from app.models.task import Task
from app.models.user import User

# Set up database connection
DATABASE_URL = "sqlite:///test.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create tables
Base.metadata.create_all(bind=engine)
logging.info("Database Created")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        logging.info("db closed")

