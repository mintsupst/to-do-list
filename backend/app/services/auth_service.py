
import logging
from datetime import datetime, timedelta

import bcrypt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

SECRET_KEY = "secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def decode_jwt(token: str) -> int:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")





# def get_current_user(token: str = Depends(oauth2_scheme)) -> int:
#     return decode_jwt(token)

def get_user_id(token: str = Depends(oauth2_scheme)) -> int:
    try:
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Extract the user ID
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token: user_id missing")

        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def register_user(db: Session, user: UserCreate):
    try:
        db_user = db.query(User).filter(User.username == user.username).first()
        if db_user:
            logging.info(f"User {user.username} already exists.")
            return None
        hashed_password = hash_password(user.password)
        db_user = User(username=user.username, password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        logging.info(f"User {user.username} created successfully.")
        return db_user
    except Exception as e:
        logging.exception(f"Error during user registration: {e!s}")
        raise

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and verify_password(password, user.password):
        return user
    return None

