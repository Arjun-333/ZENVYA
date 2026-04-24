from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.api.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String)
    oauth_provider = Column(String, nullable=True)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.utcnow)
    preferences = Column(JSON, default=dict)

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, nullable=True, index=True)
    source_platform = Column(String, nullable=False) # e.g. Amazon, Flipkart
    title = Column(String, nullable=False, index=True)
    brand = Column(String, nullable=True)
    category_id = Column(Integer, nullable=True)
    image_url = Column(String, nullable=True)
    spec = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    snapshots = relationship("PriceSnapshot", back_populates="product")
    history = relationship("PriceHistory", back_populates="product")

class PriceSnapshot(Base):
    __tablename__ = "price_snapshots"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    price = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    seller_id = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    review_count = Column(Integer, nullable=True)
    scraped_at = Column(DateTime, default=datetime.utcnow)
    delivery_days = Column(Integer, nullable=True)
    
    product = relationship("Product", back_populates="snapshots")

class PriceHistory(Base):
    __tablename__ = "price_history"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    open = Column(Float, nullable=False)
    high = Column(Float, nullable=False)
    low = Column(Float, nullable=False)
    close = Column(Float, nullable=False)
    
    product = relationship("Product", back_populates="history")
