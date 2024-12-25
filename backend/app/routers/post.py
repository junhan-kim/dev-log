from app.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.post import PostCreate, PostResponse, PostUpdate
from app.services import post_service
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("/", response_model=PostResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return post_service.create_post(post, db, current_user["id"])


@router.get("/{post_id}", response_model=PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    return post_service.read_post(post_id, db)


@router.get("/", response_model=list[PostResponse])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return post_service.read_posts(skip, limit, db)


@router.put("/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return post_service.update_post(post_id, post, db, current_user["id"])


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return post_service.delete_post(post_id, db, current_user["id"])
