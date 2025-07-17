# Routes for slabs
from fastapi import APIRouter, Query, Depends
from typing import List, Optional
from models.inventory import Slabs, SlabDetails
from schemas.inventory import SlabsSchema, SlabDetailsSchema
from sqlalchemy.orm import Session
from deps.deps import get_db
from devtools import debug


router = APIRouter()

@router.get("/slabs", response_model=list[SlabsSchema])
async def get_slabs(db: Session = Depends(get_db)):
    slabs = db.query(Slabs).all()
    return list(slabs)


@router.get("/slab-details", response_model=List[SlabDetailsSchema])
async def get_slab_details(
    db: Session = Depends(get_db), 
    id: Optional[str] = Query(None, min_length=1)
):
    slab_details = db.query(SlabDetails).filter(SlabDetails.parent_id == id).all()
    return list(slab_details)
