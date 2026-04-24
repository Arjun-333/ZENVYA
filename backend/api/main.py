from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.core.config import settings
from backend.api.routers import search, products

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router, prefix=f"{settings.API_V1_STR}/search", tags=["Search"])
app.include_router(products.router, prefix=f"{settings.API_V1_STR}/products", tags=["Products"])

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ZENVYA API Gateway"}
