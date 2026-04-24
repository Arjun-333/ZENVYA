"""
ZENVYA Dynamic Price Simulator
Runs in a background thread. Fluctuates product prices at varying intervals
and stores price history for AI prediction.
"""
import threading
import time
import random
import math
from datetime import datetime, timedelta
from typing import Dict, List

# Price history: { product_id: [ { "price": X, "timestamp": "..." }, ... ] }
PRICE_HISTORY: Dict[int, List[Dict]] = {}

# Each product gets a volatility profile and update interval
PRODUCT_PROFILES: Dict[int, Dict] = {}

_simulator_running = False
_lock = threading.Lock()


def _init_product_profile(product_id: int, base_price: float):
    """Assign each product a unique volatility and update interval."""
    with _lock:
        if product_id not in PRODUCT_PROFILES:
            # Random interval: 5, 7, or 10 minutes (use seconds for demo speed: 30/45/60s)
            interval = random.choice([30, 45, 60])
            # Volatility: how much the price swings (1-5%)
            volatility = random.uniform(0.01, 0.05)
            # Trend: slight upward or downward bias (-0.3% to +0.3% per tick)
            trend = random.uniform(-0.003, 0.003)

            PRODUCT_PROFILES[product_id] = {
                "base_price": base_price,
                "current_price": base_price,
                "interval_seconds": interval,
                "volatility": volatility,
                "trend": trend,
                "last_updated": time.time(),
            }

        if product_id not in PRICE_HISTORY:
            # Seed with some fake historical data (last 7 "ticks")
            now = datetime.now()
            history = []
            price = base_price
            for i in range(7, 0, -1):
                noise = random.uniform(-0.03, 0.03)
                price = base_price * (1 + noise)
                history.append({
                    "price": round(price),
                    "timestamp": (now - timedelta(hours=i * 12)).isoformat(),
                })
            history.append({
                "price": round(base_price),
                "timestamp": now.isoformat(),
            })
            PRICE_HISTORY[product_id] = history


def _tick_price(product_id: int):
    """Simulate one price tick for a product."""
    with _lock:
        profile = PRODUCT_PROFILES.get(product_id)
        if not profile:
            return

        current = profile["current_price"]
        vol = profile["volatility"]
        trend = profile["trend"]

        # Random walk with trend
        change = current * (trend + random.gauss(0, vol))
        new_price = max(current + change, profile["base_price"] * 0.7)  # floor at 70% of base
        new_price = min(new_price, profile["base_price"] * 1.3)  # cap at 130% of base
        new_price = round(new_price)

        profile["current_price"] = new_price
        profile["last_updated"] = time.time()

        PRICE_HISTORY.setdefault(product_id, []).append({
            "price": new_price,
            "timestamp": datetime.now().isoformat(),
        })

        # Keep only last 20 data points
        if len(PRICE_HISTORY[product_id]) > 20:
            PRICE_HISTORY[product_id] = PRICE_HISTORY[product_id][-20:]


def _simulator_loop(products: list):
    """Main simulator loop — runs in a background thread."""
    global _simulator_running
    _simulator_running = True

    # Initialize all products
    for p in products:
        _init_product_profile(p["id"], p["price"])

    while _simulator_running:
        now = time.time()
        for p in products:
            pid = p["id"]
            profile = PRODUCT_PROFILES.get(pid)
            if profile and (now - profile["last_updated"]) >= profile["interval_seconds"]:
                _tick_price(pid)
        time.sleep(5)  # Check every 5 seconds


def start_simulator(products: list):
    """Start the price simulator in a daemon thread."""
    thread = threading.Thread(target=_simulator_loop, args=(products,), daemon=True)
    thread.start()
    print(f"[ZENVYA] Price simulator started for {len(products)} products")


def stop_simulator():
    global _simulator_running
    _simulator_running = False


def get_current_price(product_id: int) -> int:
    """Get the latest simulated price for a product."""
    with _lock:
        profile = PRODUCT_PROFILES.get(product_id)
        if profile:
            return int(profile["current_price"])
    return 0


def get_price_history(product_id: int) -> List[Dict]:
    """Get price history for a product."""
    with _lock:
        return list(PRICE_HISTORY.get(product_id, []))


def predict_price_direction(product_id: int) -> Dict:
    """
    Simple trend prediction based on price history.
    Returns prediction with confidence.
    """
    history = get_price_history(product_id)
    if len(history) < 3:
        return {"direction": "stable", "confidence": 50, "reasoning": "Insufficient data"}

    prices = [h["price"] for h in history]
    recent = prices[-3:]
    older = prices[:3]

    avg_recent = sum(recent) / len(recent)
    avg_older = sum(older) / len(older)
    pct_change = ((avg_recent - avg_older) / avg_older) * 100

    profile = PRODUCT_PROFILES.get(product_id, {})
    trend = profile.get("trend", 0)

    if pct_change < -1.5 or trend < -0.001:
        direction = "dropping"
        confidence = min(92, 70 + abs(int(pct_change * 5)))
        reasoning = f"Price has fallen {abs(pct_change):.1f}% recently. Trend indicates further decline."
        recommendation = "WAIT"
    elif pct_change > 1.5 or trend > 0.001:
        direction = "rising"
        confidence = min(90, 65 + abs(int(pct_change * 5)))
        reasoning = f"Price has risen {pct_change:.1f}% recently. Buy now before further increase."
        recommendation = "BUY_NOW"
    else:
        direction = "stable"
        confidence = 75
        reasoning = "Price is stable. Good time to buy at current market rate."
        recommendation = "BUY_NOW"

    return {
        "direction": direction,
        "confidence": confidence,
        "pct_change": round(pct_change, 2),
        "reasoning": reasoning,
        "recommendation": recommendation,
        "current_price": get_current_price(product_id),
        "history_points": len(history),
    }
