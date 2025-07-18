import uuid
import enum # Import enum
from sqlalchemy import Column, String, Boolean, DateTime # Add DateTime
from sqlalchemy.dialects.postgresql import UUID, ENUM as PgEnum # Import PgEnum for PostgreSQL specific ENUM
from sqlalchemy.sql import func # Import func for timestamps
from db.base import Base

# Define your user types as a Python Enum
class UserType(enum.Enum):
    USER = "user"
    DESIGNER = "designer"
    ARCHITECT = "architect"
    SUPERADMIN = "superadmin"
    DISTRIBUTOR = "distributor"
    # Add more types as needed

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

    # New fields: Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # New field: User Type
    user_type = Column(PgEnum(UserType, name="user_type"), nullable=False, default=UserType.USER)
    # Note: 'name="user_type"' is important for Alembic to create the ENUM type in Postgres.
    # The default value should be one of the enum members, e.g., UserType.USER