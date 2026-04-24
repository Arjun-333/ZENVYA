import sys
import os
from datetime import datetime, timedelta
import random

# Add project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.api.core.database import SessionLocal, Base, engine
from backend.api.models.schema import Product, PriceSnapshot, PriceHistory

# Categories and base products
PRODUCTS = [
    {"title": "Sony WH-1000XM5 Wireless Headphones", "brand": "Sony", "category_id": 1, "base_price": 29990, "image": "https://dummyimage.com/400x400/2D1F12/FFF&text=Sony+XM5"},
    {"title": "Apple iPhone 15 Pro (256GB)", "brand": "Apple", "category_id": 2, "base_price": 134900, "image": "https://dummyimage.com/400x400/2D1F12/FFF&text=iPhone+15+Pro"},
    {"title": "Samsung Galaxy S24 Ultra", "brand": "Samsung", "category_id": 2, "base_price": 129999, "image": "https://dummyimage.com/400x400/2D1F12/FFF&text=Galaxy+S24"},
    {"title": "LG 27 inch 4K UHD Monitor", "brand": "LG", "category_id": 3, "base_price": 24500, "image": "https://dummyimage.com/400x400/2D1F12/FFF&text=LG+4K+Monitor"},
    {"title": "Nike Air Force 1 '07", "brand": "Nike", "category_id": 4, "base_price": 7495, "image": "https://dummyimage.com/400x400/2D1F12/FFF&text=Nike+AF1"},
]

def seed_database():
    print("Recreating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        print("Seeding products and price history...")
        for p_data in PRODUCTS:
            product = Product(
                source_platform="Multiple",
                title=p_data["title"],
                brand=p_data["brand"],
                category_id=p_data["category_id"],
                image_url=p_data["image"],
                spec={"color": "Various", "warranty": "1 Year"}
            )
            db.add(product)
            db.commit()
            db.refresh(product)
            
            # Generate 90 days of price history
            base_price = p_data["base_price"]
            current_price = base_price
            
            for i in range(90, -1, -1):
                date = datetime.utcnow() - timedelta(days=i)
                
                # Introduce some volatility
                volatility = random.uniform(-0.02, 0.02)
                if i % 14 == 0: # Simulate a sale every two weeks
                    volatility -= random.uniform(0.05, 0.15)
                    
                current_price = current_price * (1 + volatility)
                
                history = PriceHistory(
                    product_id=product.id,
                    date=date,
                    open=current_price * random.uniform(0.99, 1.01),
                    high=current_price * random.uniform(1.0, 1.05),
                    low=current_price * random.uniform(0.95, 1.0),
                    close=current_price
                )
                db.add(history)
            
            # Add latest snapshot
            snapshot = PriceSnapshot(
                product_id=product.id,
                price=current_price,
                currency="INR",
                seller_id="Retailnet",
                rating=round(random.uniform(3.8, 4.9), 1),
                review_count=random.randint(100, 10000)
            )
            db.add(snapshot)
            
        db.commit()
        print("Database seeding completed successfully!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
