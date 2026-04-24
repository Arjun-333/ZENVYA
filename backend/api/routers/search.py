from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.api.core.database import get_db

router = APIRouter()

@router.get("/")
async def search_products(
    q: str = Query(..., description="Search query"),
    db: Session = Depends(get_db)
):
    """
    Search for products across platforms (mocked for now).
    Will dispatch async scrape tasks to Celery workers.
    """
    return {
        "query": q,
        "results": [
            {
                "id": 1,
                "title": f"Sony WH-1000XM5 matching '{q}'",
                "brand": "Sony",
                "cheapest_price": 29990,
                "currency": "INR",
                "best_value_score": 92,
                "image_url": "https://dummyimage.com/300x300",
                "source": "Amazon"
            }
        ]
    }
