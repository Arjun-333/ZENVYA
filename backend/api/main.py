from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.api.core.data_store import (
    register_user, authenticate_user, 
    search_internal_db, get_product_by_id, PRODUCT_DB
)
from backend.api.core.processor import ProductProcessor
from backend.api.core.price_simulator import (
    start_simulator, get_current_price, get_price_history, predict_price_direction
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the price simulator on app startup
    start_simulator(PRODUCT_DB)
    yield

app = FastAPI(title="ZENVYA Neural Engine", version="2.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SEARCH ---
@app.get("/api/search")
async def search(q: str = ""):
    results = search_internal_db(q)
    normalised = ProductProcessor.normalise_results(results)
    # Inject live prices
    for r in normalised:
        live = get_current_price(r["id"])
        if live > 0:
            r["live_price"] = live
    return {"query": q, "results": normalised}

# --- PRODUCT DETAIL ---
@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if "insights" not in product:
        product["insights"] = ProductProcessor.generate_intelligence(product, 0, product.get("source", "Amazon"))
    live = get_current_price(product_id)
    if live > 0:
        product["live_price"] = live
    return product

# --- PRICE HISTORY ---
@app.get("/api/prices/{product_id}/history")
async def price_history(product_id: int):
    history = get_price_history(product_id)
    return {"product_id": product_id, "history": history, "points": len(history)}

# --- PRICE PREDICTION ---
@app.get("/api/prices/{product_id}/predict")
async def price_prediction(product_id: int):
    prediction = predict_price_direction(product_id)
    return prediction

# --- AUTH ---
@app.post("/api/auth/signup")
async def signup(name: str = Body(...), email: str = Body(...), password: str = Body(...)):
    user = register_user(name, email, password)
    if not user:
        raise HTTPException(status_code=400, detail="Account already exists.")
    return user

@app.post("/api/auth/login")
async def login(email: str = Body(...), password: str = Body(...)):
    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    return user

@app.get("/health")
def health():
    return {"status": "healthy", "service": "ZENVYA API v2.0", "simulator": "active"}
