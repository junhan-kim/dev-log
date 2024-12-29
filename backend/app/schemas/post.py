from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class PostBase(BaseModel):
    title: str
    content: str
    published: Optional[bool] = True


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    pass


class PostResponse(PostBase):
    id: int
    author_id: int
    date_created: datetime
    date_updated: datetime

    model_config = ConfigDict(from_attributes=True)


class PostsWithCountResponse(BaseModel):
    posts: List[PostResponse]
    total_count: int
