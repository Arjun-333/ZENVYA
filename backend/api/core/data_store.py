import random
from typing import List, Dict
import json
import os

PRODUCT_DB = [
    # === ELECTRONICS ===
    {"id":101,"title":"Apple iPhone 15 (Blue, 128GB)","price":72990,"category":"electronics","source":"Amazon","image":"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800","platform_rating":4.6},
    {"id":102,"title":"Samsung Galaxy S24 Ultra","price":129999,"category":"electronics","source":"Flipkart","image":"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800","platform_rating":4.8},
    {"id":103,"title":"OnePlus 12 256GB","price":64999,"category":"electronics","source":"Amazon","image":"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800","platform_rating":4.5},
    {"id":104,"title":"Google Pixel 8 Pro","price":83999,"category":"electronics","source":"Croma","image":"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800","platform_rating":4.6},
    {"id":105,"title":"Sony WH-1000XM5 Headphones","price":29990,"category":"electronics","source":"Amazon","image":"https://images.unsplash.com/photo-1618366712277-721919bc586d?w=800","platform_rating":4.7},
    {"id":106,"title":"Apple AirPods Pro 2","price":24900,"category":"electronics","source":"Flipkart","image":"https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800","platform_rating":4.8},
    {"id":107,"title":"MacBook Air M3 256GB","price":114900,"category":"electronics","source":"Amazon","image":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800","platform_rating":4.9},
    {"id":108,"title":"iPad Air M2 64GB","price":59900,"category":"electronics","source":"Croma","image":"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800","platform_rating":4.7},
    {"id":109,"title":"Samsung Galaxy Watch 6","price":26999,"category":"electronics","source":"Flipkart","image":"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800","platform_rating":4.4},
    {"id":110,"title":"JBL Flip 6 Bluetooth Speaker","price":9999,"category":"electronics","source":"Amazon","image":"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800","platform_rating":4.5},
    {"id":111,"title":"Logitech MX Master 3S Mouse","price":8995,"category":"electronics","source":"Amazon","image":"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800","platform_rating":4.6},
    {"id":112,"title":"Canon EOS R50 Camera","price":74990,"category":"electronics","source":"Croma","image":"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800","platform_rating":4.7},

    # === FASHION ===
    {"id":201,"title":"Nike Air Max 90 Sneakers","price":12995,"category":"fashion","source":"Amazon","image":"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800","platform_rating":4.5},
    {"id":202,"title":"Levi's 501 Original Jeans","price":3999,"category":"fashion","source":"Flipkart","image":"https://images.unsplash.com/photo-1542272604-787c3835535d?w=800","platform_rating":4.5},
    {"id":203,"title":"Ray-Ban Aviator Sunglasses","price":7490,"category":"fashion","source":"Amazon","image":"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800","platform_rating":4.4},
    {"id":204,"title":"Men's Slim Fit Blazer","price":4990,"category":"fashion","source":"Flipkart","image":"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800","platform_rating":4.3},
    {"id":205,"title":"Women's Silk Saree","price":8990,"category":"fashion","source":"Amazon","image":"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800","platform_rating":4.7},
    {"id":206,"title":"Adidas Ultraboost Running Shoes","price":16999,"category":"fashion","source":"Flipkart","image":"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800","platform_rating":4.6},
    {"id":207,"title":"Casio G-Shock Watch","price":9995,"category":"fashion","source":"Amazon","image":"https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800","platform_rating":4.6},
    {"id":208,"title":"Men's Leather Wallet","price":1299,"category":"fashion","source":"Flipkart","image":"https://images.unsplash.com/photo-1627123424574-724758594e93?w=800","platform_rating":4.1},
    {"id":209,"title":"Women's Running Shoes","price":5499,"category":"fashion","source":"Amazon","image":"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800","platform_rating":4.3},
    {"id":210,"title":"Designer Leather Handbag","price":12000,"category":"fashion","source":"Flipkart","image":"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800","platform_rating":4.6},
    {"id":211,"title":"Kids Cartoon Print T-Shirts","price":999,"category":"fashion","source":"Amazon","image":"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800","platform_rating":4.2},
    {"id":212,"title":"Cotton Polo Shirt","price":1499,"category":"fashion","source":"Flipkart","image":"https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800","platform_rating":4.3},

    # === TOYS & GAMES ===
    {"id":301,"title":"LEGO Star Wars Millennium Falcon","price":64990,"category":"toys","source":"Amazon","image":"https://images.unsplash.com/photo-1472457897821-70d319950880?w=800","platform_rating":4.9},
    {"id":302,"title":"PS5 Digital Edition Console","price":44990,"category":"toys","source":"Flipkart","image":"https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800","platform_rating":4.7},
    {"id":303,"title":"Nintendo Switch OLED","price":34999,"category":"toys","source":"Amazon","image":"https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800","platform_rating":4.8},
    {"id":304,"title":"Monopoly Board Game","price":1299,"category":"toys","source":"Flipkart","image":"https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800","platform_rating":4.5},
    {"id":305,"title":"Rubik's Cube Speed Edition","price":599,"category":"toys","source":"Amazon","image":"https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?w=800","platform_rating":4.4},
    {"id":306,"title":"Xbox Series X Console","price":49990,"category":"toys","source":"Croma","image":"https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800","platform_rating":4.6},
    {"id":307,"title":"Hot Wheels Track Builder Set","price":2499,"category":"toys","source":"Flipkart","image":"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800","platform_rating":4.3},
    {"id":308,"title":"Chess Set Wooden Premium","price":1499,"category":"toys","source":"Amazon","image":"https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800","platform_rating":4.7},
    {"id":309,"title":"Remote Control Racing Car","price":3499,"category":"toys","source":"Flipkart","image":"https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800","platform_rating":4.2},
    {"id":310,"title":"Drone with HD Camera","price":8999,"category":"toys","source":"Amazon","image":"https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800","platform_rating":4.5},

    # === HOME & KITCHEN ===
    {"id":401,"title":"Nespresso Vertuo Coffee Machine","price":18990,"category":"kitchen","source":"Croma","image":"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800","platform_rating":4.6},
    {"id":402,"title":"Instant Pot Duo 7-in-1","price":8999,"category":"kitchen","source":"Amazon","image":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800","platform_rating":4.7},
    {"id":403,"title":"Philips Air Fryer HD9200","price":7999,"category":"kitchen","source":"Flipkart","image":"https://images.unsplash.com/photo-1585515320310-259814833e62?w=800","platform_rating":4.5},
    {"id":404,"title":"KitchenAid Stand Mixer","price":42990,"category":"kitchen","source":"Amazon","image":"https://images.unsplash.com/photo-1585659722983-3a675dabf23c?w=800","platform_rating":4.8},
    {"id":405,"title":"Dyson V15 Vacuum Cleaner","price":52900,"category":"kitchen","source":"Croma","image":"https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800","platform_rating":4.6},
    {"id":406,"title":"Borosil Glass Dinner Set","price":3499,"category":"kitchen","source":"Flipkart","image":"https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800","platform_rating":4.4},
    {"id":407,"title":"Milton Thermosteel Flask 1L","price":899,"category":"kitchen","source":"Amazon","image":"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800","platform_rating":4.2},
    {"id":408,"title":"Wonderchef Nutri-Blend Mixer","price":2499,"category":"kitchen","source":"Flipkart","image":"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800","platform_rating":4.3},
    {"id":409,"title":"Prestige Induction Cooktop","price":2999,"category":"kitchen","source":"Amazon","image":"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800","platform_rating":4.3},
    {"id":410,"title":"Cello Opalware Dinner Set","price":1999,"category":"kitchen","source":"Flipkart","image":"https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800","platform_rating":4.1},

    # === FURNITURE ===
    {"id":501,"title":"Ergonomic Mesh Office Chair","price":15500,"category":"furniture","source":"Amazon","image":"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","platform_rating":4.4},
    {"id":502,"title":"Wooden Study Desk","price":8999,"category":"furniture","source":"Flipkart","image":"https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800","platform_rating":4.3},
    {"id":503,"title":"L-Shaped Corner Sofa","price":45990,"category":"furniture","source":"Amazon","image":"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800","platform_rating":4.6},
    {"id":504,"title":"King Size Bed with Storage","price":32999,"category":"furniture","source":"Flipkart","image":"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800","platform_rating":4.5},
    {"id":505,"title":"Bookshelf 5-Tier Wooden","price":4999,"category":"furniture","source":"Amazon","image":"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800","platform_rating":4.2},
    {"id":506,"title":"TV Unit with LED Panel","price":12990,"category":"furniture","source":"Flipkart","image":"https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800","platform_rating":4.4},
    {"id":507,"title":"Dining Table Set 6 Seater","price":24999,"category":"furniture","source":"Amazon","image":"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800","platform_rating":4.5},
    {"id":508,"title":"Standing Desk Adjustable","price":18999,"category":"furniture","source":"Croma","image":"https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800","platform_rating":4.6},
    {"id":509,"title":"Bean Bag Chair XXL","price":3499,"category":"furniture","source":"Flipkart","image":"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800","platform_rating":4.3},
    {"id":510,"title":"Wardrobe 3-Door Mirror","price":19999,"category":"furniture","source":"Amazon","image":"https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800","platform_rating":4.4},

    # === DAILY ESSENTIALS ===
    {"id":601,"title":"Oral-B Electric Toothbrush","price":2499,"category":"essentials","source":"Amazon","image":"https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=800","platform_rating":4.5},
    {"id":602,"title":"Nivea Body Lotion 400ml","price":349,"category":"essentials","source":"Flipkart","image":"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800","platform_rating":4.1},
    {"id":603,"title":"Himalaya Face Wash Pack","price":399,"category":"essentials","source":"Amazon","image":"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800","platform_rating":4.3},
    {"id":604,"title":"Dove Shampoo 650ml","price":449,"category":"essentials","source":"Flipkart","image":"https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800","platform_rating":4.2},
    {"id":605,"title":"Dettol Handwash 900ml","price":199,"category":"essentials","source":"Amazon","image":"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800","platform_rating":4.2},
    {"id":606,"title":"Pampers Baby Diapers Pack","price":1299,"category":"essentials","source":"Flipkart","image":"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800","platform_rating":4.4},
    {"id":607,"title":"Colgate Total Toothpaste","price":299,"category":"essentials","source":"Amazon","image":"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800","platform_rating":4.0},
    {"id":608,"title":"Gillette Mach3 Razor Kit","price":599,"category":"essentials","source":"Flipkart","image":"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800","platform_rating":4.3},
    {"id":609,"title":"Vaseline Intensive Care Lotion","price":279,"category":"essentials","source":"Amazon","image":"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800","platform_rating":4.0},
    {"id":610,"title":"Sunscreen SPF 50 Lotion","price":499,"category":"essentials","source":"Flipkart","image":"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800","platform_rating":4.3},

    # === EBOOKS ===
    {"id":701,"title":"Atomic Habits - James Clear","price":399,"category":"ebooks","source":"Amazon","image":"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800","platform_rating":4.8},
    {"id":702,"title":"Sapiens - Yuval Noah Harari","price":449,"category":"ebooks","source":"Flipkart","image":"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800","platform_rating":4.7},
    {"id":703,"title":"The Psychology of Money","price":349,"category":"ebooks","source":"Amazon","image":"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800","platform_rating":4.6},
    {"id":704,"title":"Rich Dad Poor Dad","price":299,"category":"ebooks","source":"Flipkart","image":"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800","platform_rating":4.5},
    {"id":705,"title":"Ikigai - Japanese Secret","price":249,"category":"ebooks","source":"Amazon","image":"https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800","platform_rating":4.4},
    {"id":706,"title":"Think and Grow Rich","price":199,"category":"ebooks","source":"Flipkart","image":"https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800","platform_rating":4.3},
    {"id":707,"title":"The Alchemist - Paulo Coelho","price":299,"category":"ebooks","source":"Amazon","image":"https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800","platform_rating":4.7},
    {"id":708,"title":"Deep Work - Cal Newport","price":349,"category":"ebooks","source":"Flipkart","image":"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800","platform_rating":4.5},
    {"id":709,"title":"Zero to One - Peter Thiel","price":399,"category":"ebooks","source":"Amazon","image":"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800","platform_rating":4.6},
    {"id":710,"title":"Start with Why - Simon Sinek","price":349,"category":"ebooks","source":"Flipkart","image":"https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800","platform_rating":4.4},
]

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
USER_FILE = os.path.join(BASE_DIR, "users.json")
USER_DB = {}

if os.path.exists(USER_FILE):
    try:
        with open(USER_FILE, "r") as f: USER_DB = json.load(f)
    except: USER_DB = {}

def save_users():
    with open(USER_FILE, "w") as f: json.dump(USER_DB, f)

def register_user(name, email, password):
    if email in USER_DB: return None
    user = {"id": len(USER_DB)+1, "name": name, "email": email, "password": password}
    USER_DB[email] = user
    save_users()
    return user

def authenticate_user(email, password):
    if os.path.exists(USER_FILE):
        try:
            with open(USER_FILE, "r") as f:
                global USER_DB
                USER_DB = json.load(f)
        except: pass
    user = USER_DB.get(email)
    if user and user["password"] == password: return user
    return None

def search_internal_db(query: str) -> List[Dict]:
    import re
    query = query.lower().strip()
    
    # All valid categories
    CATEGORIES = {"electronics", "fashion", "furniture", "kitchen", "toys", "essentials", "ebooks"}
    
    # Handle subcategory queries like "fashion-men", "fashion-women"
    if "-" in query:
        parts = query.split("-", 1)
        category = parts[0]
        keyword = parts[1]
        pattern = re.compile(r'\b' + re.escape(keyword), re.IGNORECASE)
        results = [p for p in PRODUCT_DB if p["category"] == category and pattern.search(p["title"])]
        if results:
            return results
        results = [p for p in PRODUCT_DB if p["category"] == category]
        if results:
            return results
    
    # Exact category match
    if query in CATEGORIES:
        return [p for p in PRODUCT_DB if p["category"] == query]
    
    # Title search
    results = [p for p in PRODUCT_DB if query in p["title"].lower()]
    if results:
        return results
    
    # Natural language: extract keywords and try matching categories/titles
    words = query.split()
    for word in words:
        if word in CATEGORIES:
            return [p for p in PRODUCT_DB if p["category"] == word]
    
    # Try each word against product titles
    for word in words:
        if len(word) > 2:  # skip short words like "me", "the"
            results = [p for p in PRODUCT_DB if word in p["title"].lower()]
            if results:
                return results
    
    return random.sample(PRODUCT_DB, min(len(PRODUCT_DB), 12))

def get_product_by_id(product_id: int) -> Dict:
    for p in PRODUCT_DB:
        if p["id"] == product_id: return p
    return PRODUCT_DB[0]
