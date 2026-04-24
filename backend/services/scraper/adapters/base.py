from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseAdapter(ABC):
    """
    Abstract base class for all marketplace scrapers.
    Ensures all adapters return data in a normalized format.
    """
    
    @property
    @abstractmethod
    def platform_name(self) -> str:
        pass

    @abstractmethod
    def search(self, query: str) -> List[Dict[str, Any]]:
        """
        Search for a product.
        Must return a list of dictionaries with keys:
        - title
        - price
        - currency
        - url
        - image_url
        - rating
        - review_count
        """
        pass
        
    @abstractmethod
    def get_product_details(self, product_url: str) -> Dict[str, Any]:
        """
        Fetch deep details for a specific product, including reviews.
        """
        pass
