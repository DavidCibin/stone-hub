# Routes for slabs
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models.inventory import Slabs, SlabDetails
import httpx

router = APIRouter()

@router.get("/slabs", response_model=List[Slabs])
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

@router.get("/slab-details", response_model=List[SlabDetails])
async def get_slab_details(
    slug: str = Query(..., min_length=1),
    cq_type: str = "Slab",
    mat: Optional[str] = None,
):
    try:
        async with httpx.AsyncClient() as client:
            params = {"slug": slug, "cq_type": cq_type}
            if mat:
                params["mat"] = mat
            response = await client.get("https://slabcloud.com/api/v2/product/v2", params=params)
            response.raise_for_status()
            data = response.json()

            return [
                SlabDetails(**item)
                for item in data["slabs"]
                if isinstance(item, dict)
            ]
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"External API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch slab details: {str(e)}")
