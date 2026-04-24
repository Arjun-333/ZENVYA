from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.core.config import settings
from backend.api.routers import search, products, auth

app = FastAPI(
    title="ZENVYA Neural Engine",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router, prefix="/api/search", tags=["Search"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(auth.router, prefix="/api/auth", tags=["Identity"])

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ZENVYA API Gateway"}
