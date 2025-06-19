import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from db.base import Base
from db.session import engine

from api import inventory, user, slab;

Base.metadata.create_all(bind=engine)


app = FastAPI()

# ✅ CORS config
origins = [
    "http://localhost:5173", "http://localhost:5174", "http://localhost:3000",
    "http://localhost", "http://127.0.0.1", "http://127.0.0.1:3000",
    "https://stonehub.davidcibin.com", "https://stone-hub-m00p.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(inventory.router)
app.include_router(user.router)
app.include_router(slab.router)

# ✅ Serve frontend
app.mount("/", StaticFiles(directory="dist", html=True), name="static")

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join("dist", "index.html"))

@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    return FileResponse(os.path.join("dist", "index.html"))
