from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, model_validator
from typing import List, Optional
import httpx

app = FastAPI()

# CORS config
origins = [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:80",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:80",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXTERNAL_API = "https://slabcloud.com/api/slabs/stonecountertopoutlet"

# ✳️ Simplified slab listing model
class Slabs(BaseModel):
    Material: str
    Name: str
    SlabID: str
    count: int
    scColor: str
    slug: str
    texture: str

# ✅ Full slab detail model
class SlabDetail(BaseModel):
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
        # Filter out empty or None values
        data["colors"] = [c for c in colors if c]
        return data

@app.get("/slabs", response_model=List[Slabs])
async def get_slabs():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("https://slabcloud.com/api/v2/inventory/v2?cq_type=Slab")
            response.raise_for_status()
            data = response.json()
            return [Slabs(**item) for item in data["inventory"] if all(key in item for key in Slabs.model_fields)]
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"External API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch slabs data: {str(e)}")

# 🔍 Slab detail endpoint with filtering
@app.get("/slab-details", response_model=List[SlabDetail])
async def get_slab_details(
    slug: str = Query(..., min_length=1),
    cq_type: str = "Slab",
    mat: str = Query(None, min_length=0),
):
    print(f"Fetching slab details for slug: {slug}, cq_type: {cq_type}, mat: {mat}")
    try:
        async with httpx.AsyncClient() as client:
            params = {
                "slug": slug,
                "cq_type": cq_type,
            }
            if mat:
                params["mat"] = mat
            response = await client.get("https://slabcloud.com/api/v2/product/v2", params=params)
            response.raise_for_status()
            data = response.json()

            filtered = []
            for item in data["slabs"]:
                try:
                    filtered.append(SlabDetail(**item))
                except (ValueError, TypeError) as e:
                    print("Skipping invalid item:", e)
                    continue

            return filtered
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"External API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch slab details: {str(e)}")
