"""Add test_column to users

Revision ID: 310bda8a35c4
Revises: 3bae71a673ec
Create Date: 2024-12-25 13:45:20.759824

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '310bda8a35c4'
down_revision: Union[str, None] = '3bae71a673ec'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('test_column', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'test_column')
    # ### end Alembic commands ###