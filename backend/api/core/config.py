import os

class Config:
    # Set to False to enable real-time Playwright scraping
    DEMO_MODE = os.getenv("ZENVYA_DEMO_MODE", "True") == "True"
    
    # NLP Model Config
    SENTIMENT_MODEL = "distilbert-base-uncased-finetuned-sst-2-english"
    
    # API Config
    API_PORT = 8000
    FRONTEND_URL = "http://localhost:3000"

settings = Config()
