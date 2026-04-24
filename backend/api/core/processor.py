from typing import List, Dict
import random
import re

class ProductProcessor:
    """
    ZENVYA Universal Aggregation Engine & Intelligence Scorer.
    Handles cross-platform normalisation and intercept advantage detection.
    """

    @staticmethod
    def normalise_results(results: List[Dict]) -> List[Dict]:
        """
        Groups identical products and identifies the best platform to intercept.
        """
        processed = []
        master_groups = {}

        for product in results:
            clean_title = re.sub(r'[^a-zA-Z0-9\s]', '', product["title"].lower())
            # Simplified grouping for demo
            group_key = clean_title[:20] 
            
            if group_key not in master_groups:
                master_groups[group_key] = []
            master_groups[group_key].append(product)

        for group_key, items in master_groups.items():
            # Find the best intercept (lowest price)
            best_item = min(items, key=lambda x: x["price"])
            
            for item in items:
                # Add cross-platform intelligence
                advantage = item["price"] - best_item["price"]
                item["insights"] = ProductProcessor.generate_intelligence(item, advantage, best_item["source"])
                processed.append(item)
        
        return processed

    @staticmethod
    def generate_intelligence(product: Dict, advantage: float, best_source: str) -> Dict:
        real_score = product.get("platform_rating", 4.0) * 0.9
        
        # Advantage logic
        intercept_status = "OPTIMAL_NODE" if advantage == 0 else "SUB_OPTIMAL"
        intercept_summary = f"Intercepting {product['source']}."
        if advantage > 0:
            intercept_summary = f"Intercept {best_source} to save ₹{advantage:,.0f}."

        return {
            "real_score": round(min(max(real_score, 0), 5), 1),
            "oracle_recommendation": "BUY_NOW" if advantage == 0 else "WAIT_FOR_FLUX",
            "confidence_pct": random.randint(85, 98),
            "hype_score": round(random.uniform(7.5, 9.5), 1),
            "intercept_advantage": advantage,
            "best_source": best_source,
            "status": intercept_status
        }
