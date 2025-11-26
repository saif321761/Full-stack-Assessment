import json
from redis.asyncio import Redis
from app.config import settings
from pydantic import BaseModel

redis: Redis = None

async def init_redis():
    global redis
    redis = Redis.from_url(settings.REDIS_URL, decode_responses=True)


async def cache_get(key: str):
    value = await redis.get(key)
    return json.loads(value) if value else None


async def cache_set(key: str, value, expire=3600):
    if isinstance(value, BaseModel):
        value = value.dict()
    elif isinstance(value, list) and all(isinstance(v, BaseModel) for v in value):
        value = [v.dict() for v in value]
    await redis.set(key, json.dumps(value), ex=expire)
