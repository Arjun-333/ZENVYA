# PriceHive
## Intelligent Price Aggregation & AI Shopping Platform

**Document Type:** Detailed Project Report (DPR)  
**Version:** 1.0 – April 2026  
**Classification:** Hackathon Submission  
**Status:** Draft for Review

---

## Table of Contents
1. Executive Summary
2. Project Overview
3. Problem Statement
4. Proposed Solution: PriceHive
5. Unique & Differentiating Features
6. System Architecture
7. Technology Stack
8. Core Modules & Feature Breakdown
9. Database Schema
10. API Design
11. UI/UX Design System
12. AI/ML Pipeline
13. Security & Compliance
14. Performance & Scalability
15. Project Timeline & Milestones
16. Team Structure & Roles
17. Risk Analysis
18. Success Metrics & KPIs
19. Enhanced Prompt (Revised)
20. Conclusion

---

## 1. Executive Summary
PriceHive is a next-generation, AI-powered eCommerce intelligence platform that aggregates real-time product listings from multiple online marketplaces, applies machine learning to predict price movements, and delivers hyper-personalised shopping recommendations. The platform transforms the fragmented online shopping experience into a single, elegant interface that empowers consumers to buy smarter, save more, and never overpay again.

Built for hackathon impact and real-world scalability, PriceHive combines a robust Python FastAPI backend, a Next.js 14 App Router frontend, a distributed scraping engine, Redis-backed caching, and a multi-model AI pipeline. Key differentiators include: a Behavioural Commerce Graph, Emotional Pricing Intelligence, a Carbon Footprint Score per product, and a Conversational Shopping Co-Pilot powered by a fine-tuned LLM.

| Metric | Target |
| :--- | :--- |
| Supported marketplaces at launch | 8+ |
| Average search-to-result latency | < 1.5 s |
| Price prediction accuracy (MAPE) | < 8% |
| Concurrent users (baseline infra) | 5,000 |
| Average user saving per purchase | 12–18% |

---

## 2. Project Overview

| Attribute | Details |
| :--- | :--- |
| **Project Name** | PriceHive |
| **Tagline** | "Buy Smart. Save Always." |
| **Type** | Full-Stack Web Application (Hackathon Track: AI + eCommerce) |
| **Target Users** | Online shoppers, deal hunters, price-conscious consumers |
| **Unique Value** | Real-time multi-source aggregation + AI price intelligence |
| **Monetisation** | Affiliate commissions, SaaS B2B API, premium alerts tier |
| **Primary Language** | TypeScript (Frontend) \| Python (Backend) |
| **Licence** | MIT (open-source core) |

---

## 3. Problem Statement
The modern online shopping experience suffers from four critical pain points:

1. **Fragmentation** – Product listings are siloed across dozens of platforms (Amazon, Flipkart, Myntra, Meesho, etc.), forcing shoppers to manually cross-check prices, wasting an average of 23 minutes per purchase decision.
2. **Price Volatility** – Prices can change hundreds of times a day due to dynamic pricing algorithms. Consumers consistently overpay, missing discounts that existed only hours earlier.
3. **Information Asymmetry** – Sellers have sophisticated pricing intelligence; buyers have none. There is no accessible tool that predicts whether a price will drop in the next 24–72 hours.
4. **Decision Paralysis** – An overwhelming number of product variants, conflicting reviews, and sponsored placements erode consumer confidence and inflate cart-abandonment rates (industry average: 70.2%).
5. **Environmental Blindness** – Consumers have no visibility into the carbon cost of shipping choices, contributing to unchecked logistics emissions.

---

## 4. Proposed Solution: PriceHive
PriceHive addresses each pain point with a dedicated, production-ready module:

* **Universal Aggregation Engine:** Scrapes and normalises listings from 8+ platforms in < 1.5 s using an async distributed scraper pool.
* **AI Price Oracle:** LSTM + gradient-boosted ensemble predicts price trajectories with a "Buy Now / Wait" recommendation, confidence interval, and countdown timer.
* **Behavioural Commerce Graph:** A knowledge graph (Neo4j) maps user interactions into preference vectors, enabling collaborative + content-based hybrid recommendations.
* **Emotional Pricing Intelligence:** Sentiment NLP over 500k+ reviews surfaces hidden product risks and inflated ratings, giving shoppers an honest "Real Score."
* **Carbon Footprint Scorer:** Estimates CO₂-equivalent per delivery option; highlights the greener choice without sacrificing price.
* **Conversational Shopping Co-Pilot:** GPT-4o fine-tuned assistant guides users from vague intent ("I need a gift under ₹1,500 for a 5-year-old") to a curated shortlist.

---

## 5. Unique & Differentiating Features
Beyond the core specification, PriceHive introduces eight original innovations:

🧠 **Behavioural Commerce Graph**
A Neo4j knowledge graph ingests every click, dwell time, scroll depth, and cart action. Graph neural network embeddings power real-time "people like you also bought" recommendations that go far beyond collaborative filtering.

🧠 **Emotional Pricing Intelligence (EPI)**
NLP models (fine-tuned RoBERTa) analyse review sentiment at the aspect level (build quality, battery life, etc.) and generate a "Real Score" that strips out astroturfed reviews, giving an honest product assessment independent of platform manipulation.

🧠 **GreenCart Score**
Every delivery option is scored for estimated CO₂-equivalent (kg) using carrier emission factors and route-length heuristics. A "Green Badge" appears on eco-optimal choices, enabling conscious consumerism.

🧠 **Micro-Deal Sniper**
A background job continuously monitors flash sales, coupon leaks, and cashback stacking opportunities across platforms. When a composite deal (price + coupon + cashback) beats a user's saved alert threshold, a push notification fires within 90 seconds.

🧠 **Counterfactual Price Simulator**
Users can ask "what would this phone cost if I wait 3 weeks?" and see an animated forecast ribbon with confidence bands, powered by a seasonal decomposition + LSTM hybrid model trained on 24 months of historical data.

🧠 **Cross-Border Arbitrage Detector**
For eligible product categories, the engine compares import-inclusive pricing across 12 regional Amazon stores (US, UK, DE, JP, etc.) and flags cases where importing is cheaper than domestic purchase, including estimated customs duty.

🧠 **Social Proof Aggregator**
Pulls YouTube unboxing video sentiment, Reddit thread analysis, and Twitter/X mention velocity to generate a "Hype Score" that separates genuine enthusiasm from paid promotion.

🧠 **Decentralised Price Ledger (Optional Track)**
An EVM-compatible smart contract records price snapshots immutably on-chain (Polygon PoS), enabling auditable price history that cannot be manipulated by sellers—positioning PriceHive as a trust layer for the open commerce web.

---

## 6. System Architecture
PriceHive follows a microservices-oriented, event-driven architecture. All services are containerised (Docker) and orchestrated via Docker Compose (development) or Kubernetes (production). Communication between services uses a combination of REST (synchronous queries), WebSockets (live price feed), and a Redis Pub/Sub bus (event fan-out).

### 6.1 High-Level Component Diagram
* **CLIENT LAYER:** Next.js 14 App (SSR/RSC) | Mobile PWA | Voice Interface
* **API GATEWAY:** FastAPI (async) + Nginx Reverse Proxy | Rate Limiting | JWT Validation
* **CORE SERVICES:** Search Orchestrator | Scraping Engine | Price Engine | AI Recommendation Service | Alert Service | Auth Service
* **AI / ML LAYER:** Price Oracle (LSTM) | EPI Sentiment (RoBERTa) | Commerce Graph (GNN) | LLM Co-Pilot (GPT-4o)
* **DATA LAYER:** PostgreSQL (relational) | Redis (cache + pub/sub) | Neo4j (graph) | Elasticsearch (search index) | S3 (media)
* **INFRA LAYER:** Docker / Kubernetes | GitHub Actions CI/CD | Prometheus + Grafana | Sentry

---

## 7. Technology Stack

**Frontend**
* **Framework:** Next.js 14 (App Router, RSC, Streaming)
* **Language:** TypeScript 5
* **Styling:** Tailwind CSS 3 + shadcn/ui
* **Animations:** Framer Motion 11
* **State:** Zustand + TanStack Query v5
* **Charts:** Recharts + D3.js
* **3D / AR:** Three.js (product viewer)
* **Voice:** Web Speech API + Whisper API

**Backend**
* **Framework:** FastAPI (Python 3.12, async)
* **Task Queue:** Celery + Redis Broker
* **Scraping:** Playwright (headless) + BeautifulSoup4 + httpx
* **Auth:** python-jose (JWT) + Authlib (OAuth 2.0)
* **WebSockets:** FastAPI WebSocket + Redis Pub/Sub
* **Validation:** Pydantic v2

**AI / ML**
* **Price Forecasting:** PyTorch (LSTM) + LightGBM + Prophet
* **NLP / Sentiment:** HuggingFace Transformers (RoBERTa-base fine-tuned)
* **Recommendations:** PyTorch Geometric (GNN) + Scikit-learn
* **LLM Co-Pilot:** OpenAI GPT-4o via API (function-calling)
* **Embeddings:** text-embedding-3-small + FAISS vector index

**Data & Infrastructure**
* **Primary DB:** PostgreSQL 16 + pgvector extension
* **Cache / Broker:** Redis 7 (caching, sessions, pub/sub)
* **Graph DB:** Neo4j 5 (AuraDB cloud)
* **Search Index:** Elasticsearch 8
* **Object Store:** AWS S3 / MinIO (local dev)
* **Containerisation:** Docker + Docker Compose + Kubernetes (Helm charts)
* **CI/CD:** GitHub Actions → ECR → EKS
* **Observability:** Prometheus + Grafana + Sentry + OpenTelemetry

---

## 8. Core Modules & Feature Breakdown

### 8.1 Universal Product Search
* Async parallel scraping across 8+ marketplaces with circuit-breaker pattern
* Product data normalisation: title, price, currency, rating, review count, image, URL
* Typo-tolerant full-text search via Elasticsearch (BM25 + semantic re-ranking)
* Smart autocomplete powered by historical query index
* Cheapest-option highlight with animated badge
* "Best Value" composite score = f(price_rank, rating, delivery_speed)

### 8.2 Distributed Scraping Engine
* Headless Chromium workers (Playwright) for JavaScript-rendered pages
* Rotating user-agent pool + residential proxy support (optional)
* Exponential back-off retry logic with jitter (max 3 attempts)
* Scrape-result caching in Redis with configurable TTL (default 15 min)
* Scraper health dashboard: success rate, latency p95, error log
* Pluggable adapter interface: add new marketplace in < 50 lines of Python

### 8.3 Price Comparison & Ranking Engine
* Multi-currency normalisation with real-time FX rates (cron-refreshed)
* Composite ranking: Price 50% + Rating 30% + Delivery Speed 20%
* "Price Delta" indicator: shows % more expensive vs. cheapest option
* Filter panel: price range, rating, brand, seller, delivery SLA
* Side-by-side specification comparison table for electronics category

### 8.4 AI Price Oracle
* LSTM sequence model trained per product category (30-day lookback window)
* LightGBM meta-learner stacks LSTM output with seasonality/event features
* "Buy Now / Wait" recommendation with confidence percentage (e.g., 87% confident)
* Animated forecast ribbon with 80% & 95% prediction intervals
* Seasonal event detection: festivals, flash-sale calendars, product launch cycles
* "Price dropped X% in last 7 days" contextual signals

### 8.5 AI Recommendation System
* Commerce Graph (Neo4j): nodes = users, products, brands; edges = viewed, bought, rated
* Graph Neural Network (GraphSAGE) generates 128-dim product embeddings
* FAISS vector index for sub-10 ms approximate nearest-neighbour search
* Hybrid ranking: Graph score (40%) + Content similarity (35%) + Popularity (25%)
* "Complete the set" bundles (accessories frequently bought with a product)
* Cold-start handled by category-level trending products

### 8.6 Smart Cart & Checkout Optimiser
* Auto-cheapest-seller assignment on cart add (overridable)
* Real-time "You could save ₹X by switching seller Y to Z" banner
* Coupon + cashback stacking calculator
* Estimated delivery date display per seller per item
* One-click redirect to checkout on partner platform (affiliate link)

### 8.7 Product Insights Dashboard
* 90-day interactive price history chart (Recharts + D3 zoom/pan)
* Rating trend line (average rating over time, flagging review bombing)
* "Hype Score" from Reddit + YouTube + Twitter/X social signal aggregation
* EPI "Real Score": sentiment-adjusted rating stripping paid reviews
* Popularity rank within category (percentile badge)
* Similar product performance radar chart

### 8.8 Price Alert & Notification System
* Target price alert (e.g., "notify me when below ₹12,999")
* Percentage-drop alert (e.g., "notify me on ≥ 15% drop")
* "Best ever price" one-tap alert
* Delivery channels: Web Push, Email (SendGrid), SMS (Twilio, optional)
* Alert history log with snooze / pause / delete controls
* Micro-Deal Sniper: automated coupon stack detection fires within 90 s

### 8.9 Conversational Shopping Co-Pilot
* Function-calling integration with search, compare, and alert APIs
* Supports vague queries: "best laptop for college under ₹50k"
* Remembers session context for follow-up refinements
* Proactively surfaces the GreenCart Score and EPI Real Score
* Exportable chat transcript (PDF)

### 8.10 Auth, User Profile & Personalisation
* JWT access (15 min) + refresh token (7 days) with HttpOnly cookie storage
* Google OAuth 2.0 + email/password with bcrypt hashing
* User preference profile: preferred brands, blocked sellers, currency
* Browsing history and saved searches with privacy-mode toggle
* Role-based access: Guest, Registered, Premium, Admin

---

## 9. Database Schema

### 9.1 PostgreSQL – Core Tables
| Table | Key Columns |
| :--- | :--- |
| `users` | id, email, password_hash, oauth_provider, role, created_at, preferences (JSONB) |
| `products` | id, external_id, source_platform, title, brand, category_id, image_url, spec (JSONB), created_at |
| `price_snapshots` | id, product_id, price, currency, seller_id, rating, review_count, scraped_at, delivery_days |
| `price_history` | id, product_id, date (DATE), open, high, low, close – OHLC for ML training |
| `alerts` | id, user_id, product_id, condition_type, threshold, status, last_fired_at |
| `cart_items` | id, user_id, product_id, seller_id, quantity, added_at, override_seller |
| `searches` | id, user_id (nullable), query, result_count, clicked_product_id, session_id, ts |
| `categories` | id, name, slug, parent_id, icon_url |
| `sellers` | id, platform, seller_name, rating, verified, affiliate_url_template |
| `social_signals` | id, product_id, source, signal_type, score, volume, captured_at |

### 9.2 Neo4j – Graph Schema
**Node types:** `(:User)`, `(:Product)`, `(:Brand)`, `(:Category)`, `(:Seller)`  
**Relationship types:**
* `(:User)-[:VIEWED {timestamp, dwell_ms}]->(:Product)`
* `(:User)-[:PURCHASED {timestamp, price}]->(:Product)`
* `(:User)-[:SAVED]->(:Product)`
* `(:Product)-[:BELONGS_TO]->(:Category)`
* `(:Product)-[:MADE_BY]->(:Brand)`
* `(:Product)-[:SIMILAR_TO {cosine_score}]->(:Product)`

---

## 10. API Design

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/search` | Execute product search across all adapters |
| GET | `/products/{id}` | Full product detail with latest prices |
| GET | `/products/{id}/history` | 90-day price OHLC history |
| GET | `/products/{id}/predict` | Price forecast + Buy/Wait recommendation |
| GET | `/products/{id}/insights` | Social signals, EPI score, hype score |
| GET | `/recommendations` | Personalised feed for authenticated user |
| POST | `/cart` | Add item; returns optimised cart state |
| GET | `/cart/optimise` | Recompute cart for cheapest combination |
| POST | `/alerts` | Create price alert |
| GET | `/alerts` | List user alerts with status |
| DELETE | `/alerts/{id}` | Remove alert |
| POST | `/auth/register` | Email registration |
| POST | `/auth/login` | JWT token issuance |
| POST | `/auth/refresh` | Rotate refresh token |
| GET | `/auth/google` | Initiate Google OAuth flow |
| POST | `/copilot/chat` | Send message to Shopping Co-Pilot |
| GET | `/admin/scrapers/status` | Scraper health & metrics (admin only) |
| POST | `/admin/scrapers/trigger` | Manually trigger scrape job (admin only) |
| GET | `/ws/prices` | WebSocket – real-time price update stream |

---

## 11. UI/UX Design System

### 11.1 Design Philosophy
PriceHive's visual language is "Warm Intelligence" — organic warmth combined with sharp, data-driven clarity. The palette avoids the clinical coldness of typical SaaS tools in favour of a premium editorial aesthetic inspired by luxury retail catalogues and modern fintech dashboards.

### 11.2 Colour Tokens
| Token | Hex | Name | Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#6F4E37` | Coffee Brown | CTAs, headings, active states |
| `--color-secondary` | `#C07A30` | Amber Gold | Highlights, badges, accents |
| `--color-surface` | `#F5F5DC` | Cream Beige | Card backgrounds, page fill |
| `--color-surface-alt` | `#EDE0CC` | Sand | Table rows, input backgrounds |
| `--color-text-primary` | `#2D1F12` | Dark Espresso | Body text, headings |
| `--color-text-muted` | `#7A6552` | Warm Taupe | Captions, meta text |
| `--color-success` | `#276B3A` | Forest Green | "Buy Now", saving indicators |
| `--color-danger` | `#B52B2B` | Terracotta Red | Price increase, errors |

### 11.3 Page Inventory
* **Home / Landing:** Hero search, trending section, "Deal of the Day" banner, social proof ticker
* **Search Results:** Product grid (3 cols desktop / 1 col mobile), filter sidebar, sort bar, cheapest badge, lazy-load pagination
* **Product Detail:** Gallery, price comparison table, Price Oracle panel, 90-day chart, EPI score, Co-Pilot sidebar
* **Product Compare:** Side-by-side spec table (up to 4 products), composite score bars
* **User Dashboard:** Saved items, active alerts, purchase history, activity heatmap, preference settings
* **Shopping Cart:** Smart cart with seller optimiser, savings calculator, coupon input
* **Co-Pilot Chat:** Full-page conversational interface with product cards in responses
* **Admin Panel:** Scraper status board, job logs, data freshness heatmap, user analytics
* **Auth:** Sign-in / register / forgot-password — minimal, on-brand

---

## 12. AI/ML Pipeline

### 12.1 Price Oracle Pipeline
* Raw price snapshots → pandas cleaning (outlier removal, imputation)
* Feature engineering: lag features (1d, 7d, 30d), rolling stats, event dummies (sale season, product launch)
* Prophet seasonal decomposition → trend + weekly + yearly components
* LSTM (3-layer, hidden=256, dropout=0.2) trained on 24-month sequences (30-day window → next-day prediction)
* LightGBM meta-learner stacks LSTM predictions + Prophet output + 15 hand-crafted features
* Output: point forecast + 80 / 95% prediction intervals → Buy / Wait classification threshold at 3% expected drop
* Model retrained weekly via Celery beat task; versioned with MLflow

### 12.2 EPI Sentiment Pipeline
* Review ingestion: scrape top-500 reviews per product per platform
* Language detection → translate non-English to English (googletrans)
* Aspect-based sentiment extraction using fine-tuned RoBERTa (ABSA)
* Astroturf detection: flag reviews with unusually similar language patterns (DBSCAN clustering)
* Weighted Real Score = f(verified_purchase_weight, review_age_decay, aspect_scores)
* Scores cached in Redis for 24 hours; updated on new review ingestion

### 12.3 Commerce Graph (GNN) Pipeline
* Event stream (click, view, purchase) → Kafka topic → Neo4j ingestion worker
* Nightly batch: export graph to PyTorch Geometric edge-list format
* GraphSAGE model (3 layers, aggregator=mean, 128-dim embeddings) trained for 50 epochs
* Node embeddings stored in FAISS flat index (cosine similarity)
* Online serving: given user node, retrieve k=20 nearest product nodes via FAISS
* Re-rank candidates with LightGBM ranker (XGBoost-style features + embedding dot product)

---

## 13. Security & Compliance
* **Authentication:** JWT RS256 (asymmetric); HttpOnly SameSite=Strict cookie; PKCE for OAuth
* **Secrets:** All secrets via environment variables; HashiCorp Vault in production
* **Input Validation:** Pydantic v2 strict mode on all API inputs; SQL injection prevention via SQLAlchemy ORM
* **Rate Limiting:** Nginx + slowapi: 60 rpm authenticated / 20 rpm anonymous on search endpoints
* **HTTPS:** TLS 1.3 enforced; HSTS header; Let's Encrypt / ACM certificates
* **CORS:** Strict allow-list; credentials flag only for first-party origins
* **Data Privacy:** PII encrypted at rest (AES-256); GDPR data-export and account-deletion endpoints
* **Scraping Ethics:** Robots.txt respected; rate-limited scrape delays (2–5 s); no credential scraping
* **Dependency Audit:** Dependabot + pip-audit in CI; SBOM generated on each release

---

## 14. Performance & Scalability
* Redis multi-tier caching: L1 in-process (128 MB) → L2 Redis (15 min TTL on scrape results)
* Elasticsearch for full-text + semantic search; Postgres only for structured queries
* Next.js RSC + streaming SSR; Lighthouse target ≥ 90 on all four metrics
* Image lazy-loading + WebP conversion + CDN (CloudFront) with 1-year cache on static assets
* Database: read replicas for analytics queries; pg_bouncer connection pooling (max_pool=50)
* Horizontal scraper scaling: Kubernetes HPA scales Celery worker pods on queue depth
* WebSocket rooms per product; fan-out via Redis Pub/Sub to avoid N-connection bottleneck
* API response compression: Brotli (br) via Nginx; JSON minification in production
* Target SLA: p50 < 400 ms, p95 < 1.2 s, p99 < 3 s for search endpoint

---

## 15. Project Timeline & Milestones

| Phase | Duration | Key Deliverables | Owner |
| :--- | :--- | :--- | :--- |
| **Phase 0: Foundation** | Week 1 | Repo setup, Docker env, DB schema, CI/CD skeleton, design tokens | All |
| **Phase 1: Core Scraping** | Weeks 2–3 | 4 marketplace adapters live, Redis caching, price normalisation engine, admin scraper dashboard | Backend |
| **Phase 2: Frontend Alpha** | Weeks 2–3 | Home, Search Results, Product Detail pages; design system; Recharts price chart | Frontend |
| **Phase 3: AI – Oracle** | Week 4 | Price history data pipeline, LSTM model training, forecast API, Buy/Wait UI component | ML |
| **Phase 4: AI – Recommend** | Week 5 | Commerce Graph ingestion, GNN training, FAISS index, recommendation feed | ML |
| **Phase 5: Smart Features** | Week 6 | Smart Cart, Alert System, EPI pipeline, GreenCart Score, Social Aggregator | Backend + ML |
| **Phase 6: Co-Pilot** | Week 7 | GPT-4o integration, function-calling, Co-Pilot chat UI, session memory | Full-stack |
| **Phase 7: Polish & Perf** | Week 8 | Lighthouse ≥ 90, Framer Motion animations, mobile responsive, accessibility (WCAG 2.1 AA) | Frontend |
| **Phase 8: Hardening** | Week 9 | Security audit, load testing (k6), error handling, monitoring dashboards, docs | All |
| **Phase 9: Demo Prep** | Week 10 | Demo script, seed data, screen recordings, pitch deck, README + architecture diagram | All |

---

## 16. Team Structure & Roles

| Role | Responsibilities |
| :--- | :--- |
| **Full-Stack Lead** | Architecture decisions, API design, integration, code review |
| **Backend Engineer** | FastAPI services, scraping engine, Celery workers, database design |
| **Frontend Engineer** | Next.js pages, design system implementation, Framer Motion animations |
| **ML / AI Engineer** | Price Oracle, GNN model, EPI pipeline, model serving |
| **DevOps / Infra** | Docker, K8s, CI/CD, monitoring, security hardening |
| **UI/UX Designer** | Figma prototypes, design tokens, user testing, accessibility |
| **Data Engineer** | Pipeline automation, data quality, Elasticsearch indexing |
| **Product / Demo** | Requirements, pitch deck, demo script, documentation |

---

## 17. Risk Analysis

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Scraper Blocking** | High | High | Rotating proxies, Playwright stealth mode, per-domain delay config, fallback to cached data |
| **AI Model Accuracy** | Medium | High | MAPE threshold alerts; graceful degradation to "Insufficient data" UI state; model A/B testing |
| **API Rate Limits (OpenAI)** | Medium | Medium | Request queue with exponential back-off; local fallback model (LLaMA 3) for Co-Pilot |
| **GDPR / Legal Exposure** | Low | Critical | Scrape only public pricing data; ToS review per marketplace; no personal data harvested |
| **Scaling Under Load** | Medium | High | K8s HPA; Redis caching absorbs search burst; read replicas for analytics |
| **Data Freshness** | High | Medium | TTL alerts in admin panel; user-facing "Last updated X min ago" badge on all prices |

---

## 18. Success Metrics & KPIs

| Category | Metric | Target | Measurement Method |
| :--- | :--- | :--- | :--- |
| Performance | Search p95 latency | < 1.5 s | Prometheus histogram |
| Performance | Lighthouse score (4 metrics) | ≥ 90 each | Automated CI Lighthouse |
| AI Accuracy | Price Oracle MAPE | < 8% | Weekly offline eval on held-out set |
| UX | Recommendation CTR | > 12% | Event tracking (PostHog) |
| UX | Cart abandonment rate | < 45% | Session analytics |
| UX | Alert conversion rate | > 30% | Alert-fired → purchase click |
| Business | Avg. saving per cart | 12–18% | Computed at checkout redirect |
| Business | Affiliate click-through rate | > 8% | UTM tracking + affiliate dashboard |
| Reliability | Scraper success rate | > 92% | Admin scraper health board |
| Reliability | Uptime SLA | 99.5% | UptimeRobot / Pingdom |

---

## 19. Enhanced Prompt (Revised)

**IDENTITY**
You are a principal full-stack architect and AI engineer specialising in intelligent consumer platforms. Build PriceHive — a production-ready, hackathon-winning eCommerce intelligence platform.

**CORE CONCEPT**
PriceHive is a real-time, AI-powered price aggregation platform that:
* Scrapes and normalises product listings from 8+ marketplaces simultaneously
* Predicts price movements using a LSTM + LightGBM ensemble (AI Price Oracle)
* Recommends products via a Behavioural Commerce Graph (Neo4j + GNN)
* Surfaces an Emotional Pricing Intelligence (EPI) "Real Score" from aspect-based sentiment analysis
* Provides a GreenCart CO₂ score per delivery option
* Enables a Conversational Shopping Co-Pilot (GPT-4o with function-calling)
* Detects micro-deals via coupon + cashback stacking (Micro-Deal Sniper)
* Offers cross-border price arbitrage detection across 12 regional stores
* Optionally records price snapshots on-chain (Polygon PoS) for tamper-proof history

**TECH STACK**
* **Frontend:** Next.js 14 App Router, TypeScript 5, Tailwind CSS 3, shadcn/ui, Framer Motion 11, Zustand + TanStack Query v5, Recharts + D3, Three.js, Web Speech API
* **Backend:** FastAPI (Python 3.12 async), Celery + Redis, Playwright (headless scraping), BeautifulSoup4, httpx, python-jose (JWT), Authlib (OAuth 2.0), Pydantic v2
* **AI/ML:** PyTorch (LSTM), LightGBM, Prophet, HuggingFace Transformers (RoBERTa-base, ABSA fine-tune), PyTorch Geometric (GraphSAGE), FAISS, OpenAI GPT-4o (function-calling), text-embedding-3-small, MLflow (model registry)
* **Data:** PostgreSQL 16 + pgvector, Redis 7, Neo4j 5, Elasticsearch 8, AWS S3 / MinIO
* **Infra:** Docker + Kubernetes (Helm), GitHub Actions CI/CD, Prometheus + Grafana, Sentry, OpenTelemetry

**MODULES TO IMPLEMENT — in priority order**
1. Distributed Scraping Engine: async Playwright workers, Celery tasks, rotating UA pool, retry logic, Redis TTL cache (15 min), pluggable adapter interface, admin health dashboard
2. Search & Comparison Engine: fan-out search, price normalisation (FX), composite ranking (price 50% + rating 30% + delivery 20%), Elasticsearch full-text, cheapest/best-value badges
3. AI Price Oracle: OHLC price history pipeline, Prophet + LSTM + LightGBM stacked model, Buy/Wait API with confidence %, animated forecast ribbon, seasonal event detection
4. Behavioural Commerce Graph: Neo4j ingestion worker, GraphSAGE training pipeline, FAISS index, hybrid recommendation API (graph + content + popularity)
5. Emotional Pricing Intelligence: review scraper, RoBERTa ABSA fine-tune, astroturf detector, Real Score computation, Redis 24-hour cache
6. Smart Cart & Checkout Optimiser: auto-cheapest seller, savings calculator, coupon stacking, affiliate redirect with UTM
7. Price Alert & Micro-Deal Sniper: multi-condition alerts, SendGrid/Twilio notifications, Web Push, 90-second deal detection loop
8. Conversational Co-Pilot: GPT-4o integration, function-calling to internal APIs, session memory, product card rendering in chat
9. GreenCart Score: CO₂ estimation per delivery option, green badge UI component
10. Cross-Border Arbitrage Detector: 12-region Amazon price comparison, duty estimation
11. Auth & Personalisation: JWT RS256, Google OAuth, user preferences, history, role-based access
12. Admin Panel: scraper status board, job logs, data freshness heatmap, user analytics
13. (Optional) Decentralised Price Ledger: Polygon PoS smart contract (Solidity), price snapshot events, on-chain audit view

**UI/UX REQUIREMENTS**
* **Theme:** "Warm Intelligence" — premium, editorial, data-rich
* **Palette:** Primary `#6F4E37` (Coffee Brown), Accent `#C07A30` (Amber Gold), Surface `#F5F5DC` (Cream), Success `#276B3A`, Danger `#B52B2B`
* **Style:** claymorphism-inspired cards, soft shadows, 16-px border radius, smooth Framer Motion transitions
* **Typography:** Inter (body), Playfair Display (display headings)
* **Accessibility:** WCAG 2.1 AA; focus-visible rings; aria-labels on all interactive elements
* **Performance:** Lighthouse ≥ 90 on all four metrics; Core Web Vitals LCP < 2.5 s
* **Pages:** Home (hero search, trending, Deal of Day), Search Results (grid, filters, badges), Product Detail (gallery, price table, Oracle panel, 90-day chart, EPI, Co-Pilot sidebar), Compare (side-by-side specs), Dashboard (saved, alerts, history), Cart (smart optimiser), Co-Pilot (full-page chat), Admin Panel, Auth pages

**CODE QUALITY STANDARDS**
* Strict TypeScript — no `any`; Zod for runtime validation on frontend
* Python: type hints everywhere; mypy strict mode; ruff linter
* 80%+ test coverage (pytest + Vitest); E2E tests with Playwright
* All secrets via .env / Vault — never hard-coded
* OpenAPI schema auto-generated from FastAPI; import into frontend via openapi-ts
* Conventional commits + semantic versioning
* Each service has its own Dockerfile; docker-compose.yml for local orchestration
* Every module includes README, architecture notes, and API contract

**DELIVERABLES**
1. Monorepo folder structure (`/apps/web`, `/apps/api`, `/services/*`, `/ml/*`)
2. All frontend pages and components
3. All API service code with OpenAPI docs
4. Database migration scripts (Alembic for PG, Cypher init for Neo4j)
5. ML training notebooks + serving scripts
6. Docker Compose (dev) + Kubernetes Helm charts (prod)
7. GitHub Actions CI/CD pipeline
8. Seed data generator for demo
9. Comprehensive README with setup guide, architecture diagram (Mermaid), and demo instructions
10. Pitch deck outline (10 slides)

---

## 20. Conclusion
PriceHive represents a genuine leap beyond existing price comparison tools. By combining real-time multi-source aggregation, a rigorous ML price prediction pipeline, honest sentiment analysis, environmental awareness, and a conversational AI layer, it creates a compound moat that is technically impressive, commercially viable, and—critically—meaningfully useful to everyday shoppers.

Every architectural decision balances hackathon speed with production readiness: pluggable adapters allow rapid marketplace onboarding; MLflow versioning ensures reproducibility; the Commerce Graph grows smarter with every user action. The "Warm Intelligence" design language creates emotional connection rare in utility-first comparison tools.

PriceHive is not just a hackathon project — it is the foundation for a category-defining consumer intelligence platform. The code is written to be extended, the models are designed to be retrained, and the architecture is built to scale.

*PriceHive DPR • Version 1.0 • April 2026 • Confidential*
