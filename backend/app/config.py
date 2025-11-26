from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    POSTGRES_URL: str = "postgresql+asyncpg://postgres:Password3456@23.239.19.196:5432/fastapi_db"
    REDIS_URL: str = "redis://localhost:6380/0"

    class Config:
        env_file = ".env"


settings = Settings()
