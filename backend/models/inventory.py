from typing import List, Optional
from pydantic import BaseModel, Field, model_validator

class Slabs(BaseModel):
    Material: str
    Name: str
    SlabID: str
    count: int
    scColor: str
    slug: str
    texture: str

class SlabDetails(BaseModel):
    SlabID: str
    InventoryID: str
    Length_Actual: float
    Width_Actual: float
    UsableArea: float
    Lot: str
    Name: str
    Origin: Optional[str] = None
    Material: str
    Thickness_Nominal: str
    Finish: str
    scColor: str
    slug: str
    colors: List[str] = Field(default_factory=list)

    sc1: Optional[str] = None
    sc2: Optional[str] = None
    sc3: Optional[str] = None
    sc4: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def combine_colors(cls, data):
        colors = [data.get("sc1"), data.get("sc2"), data.get("sc3"), data.get("sc4")]
        data["colors"] = [c for c in colors if c]
        return data
