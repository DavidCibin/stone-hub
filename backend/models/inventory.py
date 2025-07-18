from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime # Add DateTime
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func # Import func for timestamps
from db.base import Base

class Slabs(Base):
    __tablename__ = "slabs"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    material = Column(String, nullable=False)
    name = Column(String, nullable=False)
    count = Column(Integer, nullable=False)
    sc_color = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True)
    texture = Column(String, nullable=False)

    # New fields: Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationship to related slab details
    slab_details = relationship("SlabDetails", back_populates="parent_slab")


class SlabDetails(Base):
    __tablename__ = "slab_details"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    inventory_id = Column(String, nullable=False)
    length_actual = Column(Float, nullable=False)
    width_actual = Column(Float, nullable=False)
    usable_area = Column(Float, nullable=False)
    lot = Column(String, nullable=False)
    name = Column(String, nullable=False)
    origin = Column(String, nullable=True)
    material = Column(String, nullable=False)
    thickness_nominal = Column(String, nullable=False)
    finish = Column(String, nullable=False)
    sc_color = Column(String, nullable=False)
    slug = Column(String, nullable=False)

    parent_id = Column(UUID(as_uuid=True), ForeignKey("slabs.id"), nullable=False)
    parent_slab = relationship("Slabs", back_populates="slab_details")

    colors = Column(ARRAY(String), default=[])

    # New fields: Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)