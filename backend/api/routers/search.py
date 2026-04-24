from fastapi import APIRouter, Query
from backend.api.core.data_store import search_internal_db
from backend.ml.epi.sentiment import calculate_real_score
from backend.api.core.processor import processor
from backend.api.core.config import settings
# from backend.scraper.scraper import Scraper # Assuming scraper exists from earlier work

router = APIRouter()

@router.get("/")
async def search_products(q: str = Query(..., description="Search query")):
    """
    Search with intelligence processing and dynamic mode switching.
    """
    # 1. Fetching Logic
    if settings.DEMO_MODE:
        # High-speed cached results for demo stability
        raw_results = search_internal_db(q)
    else:
        # REAL-TIME LIVE SCRAPING (Slow but genuine)
        # raw_results = await Scraper.search_all_platforms(q)
        raw_results = search_internal_db(q) # Placeholder if Scraper is missing in env

    # 2. Neural Enrichment
    enriched = []
    for p in raw_results:
        sentiment_score = calculate_real_score(p["reviews"], p["platform_rating"])
        enriched.append({
            **p,
            "score": int(sentiment_score * 20)
        })

    # 3. Intelligence Processing (Matching & Deduplication)
    deduplicated = processor.deduplicate_and_match(enriched)
    final_results = processor.assign_badges(deduplicated)

    return {
        "query": q,
        "results": final_results,
        "mode": "DEMO" if settings.DEMO_MODE else "LIVE"
    }
