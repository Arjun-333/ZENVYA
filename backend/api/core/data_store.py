import random
from typing import List, Dict
import json
import os

# --- PRODUCT STORE ---
PRODUCT_DB = [
    {
        "id": 101,
        "title": "Apple iPhone 15 (Blue, 128 GB)",
        "price": 72990,
        "category": "Electronics",
        "source": "Amazon",
        "image": "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop",
        "platform_rating": 4.6,
        "reviews": ["Love the dynamic island.", "Battery is decent.", "Standard iPhone experience."]
    },
    {
        "id": 102,
        "title": "iPhone 15 128GB - Blue",
        "price": 71490,
        "category": "Electronics",
        "source": "Flipkart",
        "image": "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop",
        "platform_rating": 4.5,
        "reviews": ["Best phone for the price.", "Got it for a steal!"]
    },
    {
        "id": 1,
        "title": "Sony WH-1000XM5 Wireless Noise Canceling",
        "price": 29990,
        "category": "Audio",
        "source": "Amazon",
        "image": "https://images.unsplash.com/photo-1618366712277-721919bc586d?q=80&w=800&auto=format&fit=crop",
        "platform_rating": 4.5,
        "reviews": ["Best noise cancellation ever.", "Sound is crisp."]
    }
]

# --- USER STORE (Persistent for the session) ---
USER_FILE = "users.json"
USER_DB = {}

if os.path.exists(USER_FILE):
    try:
        with open(USER_FILE, "r") as f:
            USER_DB = json.load(f)
    except:
        USER_DB = {}

def save_users():
    with open(USER_FILE, "w") as f:
        json.dump(USER_DB, f)

def register_user(name, email, password):
    if email in USER_DB:
        return None
    user = {
        "id": len(USER_DB) + 1,
        "name": name,
        "email": email,
        "password": password, # In production, use bcrypt
        "trust_score": 85,
        "history": []
    }
    USER_DB[email] = user
    save_users()
    return user

def authenticate_user(email, password):
    user = USER_DB.get(email)
    if user and user["password"] == password:
        return user
    return None

# --- SEARCH FUNCTIONS ---
def search_internal_db(query: str) -> List[Dict]:
    query = query.lower()
    results = [p for p in PRODUCT_DB if query in p["title"].lower() or query in p["category"].lower()]
    if not results:
        return random.sample(PRODUCT_DB, min(len(PRODUCT_DB), 3))
    return results

def get_product_by_id(product_id: int) -> Dict:
    for p in PRODUCT_DB:
        if p["id"] == product_id:
            return p
    return PRODUCT_DB[0]
