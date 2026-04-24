import os
import logging
from typing import List

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("RealScore")

try:
    from transformers import pipeline
    # Initialize the sentiment analysis pipeline using a lightweight pre-trained model
    # distilbert-base-uncased-finetuned-sst-2-english is excellent for positive/negative classification
    logger.info("Loading NLP Sentiment Model (this may take a moment on first run)...")
    sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
    MODEL_LOADED = True
except ImportError:
    logger.warning("transformers package not installed. Falling back to mock sentiment analysis.")
    MODEL_LOADED = False


def calculate_real_score(reviews: List[str], platform_rating: float) -> float:
    """
    Analyzes a list of review texts and calculates a "Real Score" (0.0 to 5.0).
    It adjusts the platform rating based on the genuine sentiment of the reviews,
    stripping away fake 5-star ratings if the actual text is negative.
    """
    if not reviews:
        return platform_rating

    if not MODEL_LOADED:
        # Mock logic if transformers isn't installed
        return round(max(1.0, platform_rating - 0.5), 1)

    positive_weight = 0.0
    negative_weight = 0.0
    
    # Process each review through the NLP model
    results = sentiment_analyzer(reviews)
    
    for result in results:
        label = result['label'] # 'POSITIVE' or 'NEGATIVE'
        score = result['score'] # Confidence (0.0 to 1.0)
        
        if label == 'POSITIVE':
            positive_weight += score
        else:
            # Negative reviews carry more weight in discovering product flaws
            negative_weight += (score * 1.5) 
            
    total_weight = positive_weight + negative_weight
    if total_weight == 0:
        return platform_rating
        
    # Calculate genuine sentiment ratio (0.0 to 1.0)
    sentiment_ratio = positive_weight / total_weight
    
    # Map the sentiment ratio to a 1.0 - 5.0 scale
    sentiment_based_score = 1.0 + (sentiment_ratio * 4.0)
    
    # The final "Real Score" blends the platform rating with our NLP sentiment score
    # We weight the NLP sentiment heavily (70%) vs the raw platform rating (30%)
    real_score = (sentiment_based_score * 0.7) + (platform_rating * 0.3)
    
    return round(max(1.0, min(5.0, real_score)), 1)


# --- Example Usage ---
if __name__ == "__main__":
    test_reviews = [
        "Absolutely garbage. It broke after 2 days. Do not buy!",
        "Terrible quality, the seller is a scammer.",
        "It's okay, but not worth the price.",
        "Battery life is completely fake.",
        "Arrived damaged."
    ]
    # Assume platform rating is artificially inflated by bots
    fake_platform_rating = 4.8 
    
    print(f"Platform Rating: {fake_platform_rating} / 5.0")
    real = calculate_real_score(test_reviews, fake_platform_rating)
    print(f"Zenvya Real Score: {real} / 5.0")
