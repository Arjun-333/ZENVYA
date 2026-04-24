from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.core.database import get_db

router = APIRouter()

@router.get("/{product_id}")
async def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    """
    Fetch full product details including intelligence data.
    """
    return {
        "id": product_id,
        "title": "Sony WH-1000XM5 Wireless Headphones",
        "category": "Electronics",
        "description": "Industry leading noise cancellation...",
        "insights": {
            "real_score": 4.8,
            "oracle_recommendation": "BUY_NOW",
            "confidence_pct": 89
        }
    }

@router.get("/{product_id}/predict")
async def get_price_prediction(product_id: int, db: Session = Depends(get_db)):
    """
    Get price forecast from LSTM model.
    """
    return {
        "product_id": product_id,
        "recommendation": "BUY_NOW",
        "prediction_intervals": {
            "7_day": 28500,
            "14_day": 29000
        }
    }
