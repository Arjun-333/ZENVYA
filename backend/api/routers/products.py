from fastapi import APIRouter, HTTPException
from backend.api.core.data_store import get_product_by_id
from backend.ml.epi.sentiment import calculate_real_score

router = APIRouter()

@router.get("/{product_id}")
async def get_product_detail(product_id: int):
    """
    Fetch full product details with dynamic intelligence data.
    """
    p = get_product_by_id(product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")

    real_score = calculate_real_score(p["reviews"], p["platform_rating"])
    
    # Oracle logic based on price and score
    rec = "BUY_NOW" if real_score > 4.2 else "WAIT"

    return {
        "id": p["id"],
        "title": p["title"],
        "price": p["price"],
        "category": p["category"],
        "insights": {
            "real_score": real_score,
            "oracle_recommendation": rec,
            "confidence_pct": int(real_score * 18) # Mocked confidence based on model score
        }
    }

@router.get("/{product_id}/predict")
async def get_price_prediction(product_id: int):
    """
    Simulate price flux predictions.
    """
    p = get_product_by_id(product_id)
    base_price = p["price"]
    
    return {
        "product_id": product_id,
        "recommendation": "BUY_NOW" if random.random() > 0.5 else "WAIT",
        "prediction_intervals": {
            "7_day": int(base_price * 0.98),
            "14_day": int(base_price * 1.02)
        }
    }
