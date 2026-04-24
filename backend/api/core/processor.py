import re
from typing import List, Dict
from difflib import SequenceMatcher

class ProductProcessor:
    @staticmethod
    def clean_text(text: str) -> str:
        """Normalize text: lowercase, remove special chars, trim whitespace."""
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s-]', '', text)
        return " ".join(text.split())

    @staticmethod
    def extract_attributes(title: str) -> Dict[str, str]:
        """Extract key attributes like storage or color for better matching."""
        title = title.lower()
        attributes = {}
        
        # Extract storage
        storage_match = re.search(r'(\d+)\s*(gb|tb)', title)
        if storage_match:
            attributes['storage'] = storage_match.group(0)
            
        return attributes

    @staticmethod
    def calculate_similarity(a: str, b: str) -> float:
        """Calculate token-based fuzzy similarity between two strings."""
        return SequenceMatcher(None, a, b).ratio()

    def deduplicate_and_match(self, products: List[Dict]) -> List[Dict]:
        """
        Groups identical products from different sources and keeps the best variant.
        In a real app, this would create a 'Master Product' with multiple 'Offers'.
        """
        if not products:
            return []

        processed = []
        seen_titles = []

        for p in products:
            p_clean = self.clean_text(p['title'])
            p_attrs = self.extract_attributes(p['title'])
            
            is_duplicate = False
            for idx, existing_title in enumerate(seen_titles):
                similarity = self.calculate_similarity(p_clean, existing_title)
                
                # If titles are 85% similar and attributes (like storage) match
                if similarity > 0.85:
                    existing_attrs = self.extract_attributes(processed[idx]['title'])
                    if p_attrs.get('storage') == existing_attrs.get('storage'):
                        is_duplicate = True
                        # If the new one is cheaper, swap it as the primary display variant
                        if p['price'] < processed[idx]['price']:
                            processed[idx] = p
                        break
            
            if not is_duplicate:
                processed.append(p)
                seen_titles.append(p_clean)

        return processed

    def assign_badges(self, products: List[Dict]) -> List[Dict]:
        """Assign intelligence badges based on price and score."""
        if not products:
            return []

        # Find the global minimum price in the current set
        min_price = min(p['price'] for p in products)
        max_score = max(p['score'] for p in products)

        for p in products:
            badges = []
            if p['price'] == min_price:
                badges.append("CHEAPEST")
            if p['score'] == max_score:
                badges.append("SMART CHOICE")
            if p['score'] < 70:
                badges.append("RISKY")
            
            p['badges'] = badges
        
        return products

processor = ProductProcessor()
