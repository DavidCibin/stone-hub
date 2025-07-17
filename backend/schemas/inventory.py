from typing import List, Optional
from pydantic import BaseModel, Field
from uuid import UUID

class SlabsSchema(BaseModel):
    id: UUID
    material: str
    name: str
    count: int
    sc_color: str = Field(..., alias="scColor")
    slug: str
    texture: str

    class Config:
        from_attributes = True
        populate_by_name = True
        orm_mode = True


class SlabDetailsSchema(BaseModel):
    id: UUID
    inventory_id: str = Field(..., alias="inventoryId")
    length_actual: float = Field(..., alias="lengthActual")
    width_actual: float = Field(..., alias="widthActual")
    usable_area: float = Field(..., alias="usableArea")
    lot: str
    name: str
    origin: Optional[str]
    material: str
    thickness_nominal: str = Field(..., alias="thicknessNominal")
    finish: str 
    sc_color: str
    slug: str
    colors: List[str] = Field(default_factory=list)
    parent_id: UUID

    class Config:
        from_attributes = True
        populate_by_name = True
        orm_mode = True
