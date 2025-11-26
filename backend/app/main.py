from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.redis_cache import init_redis
from app.routers import items
from app.database import engine, Base

app = FastAPI(title="High Performance API")

# Allow frontend host
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_redis()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(items.router)
