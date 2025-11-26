import asyncio
from faker import Faker
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, Base, SessionLocal
from app.models import Product

fake = Faker()

BATCH_SIZE = 1000
TOTAL_PRODUCTS = 100000

async def seed():
    # Ensure table exists
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as session:
        products_batch = []

        for i in range(1, TOTAL_PRODUCTS + 1):
            product = Product(
                name=fake.word().title(),
                category=fake.random_element(["Electronics", "Clothes", "Books", "Home"]),
                price=round(fake.random_number(digits=4) / 10, 2),
                stock=fake.random_int(min=0, max=1000),
            )
            products_batch.append(product)

            # Commit batch
            if i % BATCH_SIZE == 0:
                session.add_all(products_batch)
                await session.commit()
                products_batch = []
                print(f"{i} products inserted...")

        # Insert remaining products
        if products_batch:
            session.add_all(products_batch)
            await session.commit()
            print(f"Remaining {len(products_batch)} products inserted.")

        print("Seed completed: 100,000 products inserted.")


if __name__ == "__main__":
    asyncio.run(seed())
