import time
import random
from typing import List, Dict, Any
from .base import BaseAdapter

class FlipkartAdapter(BaseAdapter):
    """
    Flipkart scraper adapter.
    For Phase 1 MVP, this is a highly realistic mock to ensure demo stability
    without getting IP blocked. We will upgrade this to Playwright in Phase 2.
    """
    
    @property
    def platform_name(self) -> str:
        return "Flipkart"

    def search(self, query: str) -> List[Dict[str, Any]]:
        # Simulate network latency (Playwright overhead)
        time.sleep(random.uniform(1.0, 2.5))
        
        # Generate realistic looking mock data based on the query
        base_price = random.randint(1500, 45000)
        
        return [
            {
                "title": f"{query.title()} - 8GB RAM, 128GB Storage (Midnight Black)",
                "price": base_price,
                "currency": "INR",
                "url": f"https://www.flipkart.com/search?q={query.replace(' ', '+')}",
                "image_url": "https://dummyimage.com/400x400/ececec/000000&text=Product+Image",
                "rating": round(random.uniform(3.5, 4.8), 1),
                "review_count": random.randint(100, 15000)
            },
            {
                "title": f"{query.title()} - Pro Edition (Ocean Blue)",
                "price": int(base_price * 1.15),
                "currency": "INR",
                "url": f"https://www.flipkart.com/search?q={query.replace(' ', '+')}",
                "image_url": "https://dummyimage.com/400x400/ececec/000000&text=Product+Image",
                "rating": round(random.uniform(4.0, 4.9), 1),
                "review_count": random.randint(50, 8000)
            }
        ]

    def get_product_details(self, product_url: str) -> Dict[str, Any]:
        time.sleep(random.uniform(1.0, 2.0))
        return {
            "description": "High performance device with excellent battery life.",
            "specifications": {"Brand": "Generic", "Color": "Varies", "Warranty": "1 Year"},
            "top_reviews": [
                "Amazing product, totally worth the price!",
                "Battery drains a bit fast, but performance is solid.",
                "Worst purchase ever. Arrived damaged."
            ]
        }
