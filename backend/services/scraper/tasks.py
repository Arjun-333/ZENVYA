import os
from celery import Celery

# Initialize Celery
# We use Redis as both the broker and the result backend
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "scraper_tasks",
    broker=redis_url,
    backend=redis_url
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300, # 5 minutes max per scrape
)

@celery_app.task(bind=True, max_retries=3)
def scrape_product_task(self, platform: str, query: str):
    """
    Celery task to scrape products from a specific platform.
    This will be picked up by the Celery workers.
    """
    try:
        from .adapters.flipkart import FlipkartAdapter
        
        # In a real scenario, we'd use a registry pattern to pick the adapter
        if platform.lower() == "flipkart":
            adapter = FlipkartAdapter()
        else:
            return {"status": "error", "message": f"Platform {platform} not supported"}
            
        results = adapter.search(query)
        return {"status": "success", "platform": platform, "query": query, "data": results}
        
    except Exception as exc:
        # Exponential backoff retry
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)
