from typing import List, Optional
from pydantic import BaseModel, Field
from uuid import UUID

class Slabs(BaseModel):
    id: UUID
    Material: str
    Name: str
    count: int
    scColor: str
    slug: str
    texture: str

class SlabDetails(BaseModel):
    id: UUID
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
    parent_id: UUID