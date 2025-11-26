import time
import httpx

URL = "http://127.0.0.1:8000/products/"  # add trailing slash

LIMIT = 100000
PAGE = 1

async def main():
    async with httpx.AsyncClient() as client:
        start = time.perf_counter()
        response = await client.get(URL, params={"page": PAGE, "limit": LIMIT})
        end = time.perf_counter()

        if response.status_code == 200:
            data = response.json()
            print(f"Returned {len(data)} products")
            print(f"Response time: {end - start:.3f} seconds")
        else:
            print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
