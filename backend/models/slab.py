from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.dialects.postgresql import ARRAY
from db.base import Base

class Slab(Base):
    __tablename__ = "slabs"

    SlabID = Column(String, primary_key=True, index=True)
    Material = Column(String, nullable=False)
    Name = Column(String, nullable=False)
    count = Column(Integer, nullable=False)
    scColor = Column(String, nullable=False)
    slug = Column(String, nullable=False)
    texture = Column(String, nullable=False)


class SlabDetail(Base):
    __tablename__ = "slab_details"

    SlabID = Column(String, primary_key=True, index=True)
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

    sc1 = Column(String, nullable=True)
    sc2 = Column(String, nullable=True)
    sc3 = Column(String, nullable=True)
    sc4 = Column(String, nullable=True)

    # Optional: use ARRAY for the combined `colors` field (PostgreSQL only)
    colors = Column(ARRAY(String), default=[])
