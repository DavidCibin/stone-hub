from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from deps.deps import get_db
from models.slab import Slab

router = APIRouter()

@router.get("/slab")
def get_slabs(db: Session = Depends(get_db)):
    return db.query(Slab).all()
