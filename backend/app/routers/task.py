from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.db import SessionLocal
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.services.auth_service import get_user_id  # Import the get_user_id function

# from app.services.auth_service import get_user_id
from app.services.task_service import create_task, delete_task, get_tasks, update_task

router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Task)
def create_new_task(task: TaskCreate,
                    db: Session = Depends(get_db),
                    user_id: int = Depends(get_user_id),  # Dynamically get user_id from auth service
                    ):
    return create_task(db, task, user_id)

@router.get("/", response_model=List[Task])
def read_tasks(db: Session = Depends(get_db), user_id: int = Depends(get_user_id)):  # Dynamically get user_id from auth service
    return get_tasks(db, user_id)

@router.patch("/{task_id}", response_model=Task)
def update_existing_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), user_id: int = Depends(get_user_id)):  # Dynamically get user_id from auth service
    task = update_task(db, task_id, task_update)  # Ensure update_task checks for the correct user
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", response_model=dict)
def delete_existing_task(task_id: int, db: Session = Depends(get_db)):
    success = delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Task deleted successfully"}
