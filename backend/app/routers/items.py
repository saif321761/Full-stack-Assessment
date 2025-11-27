from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.models import Product
from app.schemas import ProductOut
from app.redis_cache import cache_get, cache_set

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=list[ProductOut])
async def get_products(
    filter: str = Query("", alias="filter", description="Search keyword for product name"),
    sort: str = Query("id", description="Column to sort by"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Sort order"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Number of items per page"),
    session: AsyncSession = Depends(get_session)
):
    """
    Fetch paginated products with optional filtering and sorting.
    Uses Redis caching for faster responses.
    """

    key = f"products:{filter}:{sort}:{order}:{page}:{limit}"
    cached = await cache_get(key)
    if cached:
        return cached

    stmt = select(Product)

    if filter:
        stmt = stmt.where(Product.name.ilike(f"%{filter}%"))
        print(f"Filtering products with name containing: {filter}")

    if not hasattr(Product, sort):
        raise HTTPException(status_code=400, detail=f"Invalid sort column: {sort}")
    column = getattr(Product, sort)
    stmt = stmt.order_by(column.asc() if order == "asc" else column.desc())

    offset = (page - 1) * limit
    stmt = stmt.offset(offset).limit(limit)

    result = await session.execute(stmt)
    rows = result.scalars().all()

    response = [ProductOut.model_validate(p) for p in rows]

    await cache_set(key, response, expire=60)

    return response

@router.get("/{product_id}", response_model=ProductOut)
async def get_product_by_id(
    product_id: int,
    session: AsyncSession = Depends(get_session)
):
    key = f"product:{product_id}"
    cached = await cache_get(key)

    if cached:
        return cached

    result = await session.execute(
        select(Product).where(Product.id == product_id)
    )
    product = result.scalar_one_or_none()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    response = ProductOut.model_validate(product)
    await cache_set(key, response, expire=120)

    return response
