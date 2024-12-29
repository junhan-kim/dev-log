from app.models.post import Post
from app.schemas.post import PostCreate, PostResponse, PostUpdate
from fastapi import HTTPException
from sqlalchemy.orm import Session


def create_post(post: PostCreate, db: Session, author_id: int) -> PostResponse:
    new_post = Post(
        title=post.title,
        content=post.content,
        author_id=author_id,
        published=post.published,
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def read_post(post_id: int, db: Session) -> PostResponse:
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


def read_posts_with_count(skip: int, limit: int, db: Session) -> dict:
    total_count = db.query(Post).count()
    posts = db.query(Post).offset(skip).limit(limit).all()
    return {
        "posts": posts,
        "total_count": total_count
    }


def update_post(post_id: int, post: PostUpdate, db: Session, author_id: int) -> PostResponse:
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.author_id != author_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")

    for key, value in post.dict(exclude_unset=True).items():
        setattr(db_post, key, value)

    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(post_id: int, db: Session, author_id: int) -> dict:
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != author_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")

    db.delete(post)
    db.commit()
    return {"message": "Post deleted successfully"}
