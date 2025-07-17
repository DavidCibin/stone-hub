from sqlalchemy import Column, String, Integer, Float, ForeignKey # Import ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, UUID # Import UUID
from sqlalchemy.orm import relationship # Import relationship for ORM linking
from db.base import Base # Assuming this path is correct for your Base

class Slab(Base):
    __tablename__ = "slabs"

    # Renamed from SlabID and type changed to UUID
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    Material = Column(String, nullable=False)
    Name = Column(String, nullable=False)
    count = Column(Integer, nullable=False)
    scColor = Column(String, nullable=False)
    # Added unique=True constraint as per DB changes
    slug = Column(String, nullable=False, unique=True)
    texture = Column(String, nullable=False)

    # Define relationship to SlabDetail for easy access from Slab
    # 'SlabDetail.parent_id' refers to the column in the SlabDetail model that links back
    slab_details = relationship("SlabDetail", back_populates="parent_slab")


class SlabDetail(Base):
    __tablename__ = "slab_details"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    InventoryID = Column(String, nullable=False)
    Length_Actual = Column(Float, nullable=False)
    Width_Actual = Column(Float, nullable=False)
    UsableArea = Column(Float, nullable=False)
    Lot = Column(String, nullable=False)
    Name = Column(String, nullable=False)
    Origin = Column(String, nullable=True)
    Material = Column(String, nullable=False)
    Thickness_Nominal = Column(String, nullable=False)
    Finish = Column(String, nullable=False)
    scColor = Column(String, nullable=False)
    slug = Column(String, nullable=False) 
    
    parent_id = Column(UUID(as_uuid=True), ForeignKey("slabs.id"), nullable=False)

    # Relationship to the parent Slab object for easy access from SlabDetail
    parent_slab = relationship("Slab", back_populates="slab_details")
    colors = Column(ARRAY(String), default=[])