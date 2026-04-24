<div align="center">

# Z E N V Y A

### *Intelligent Price Aggregation & AI Shopping Platform*

**Real-time price intelligence • Emotional Sentiment Scoring • 3D Immersive UI**

[![Built with Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![AI Powered](https://img.shields.io/badge/AI-HuggingFace_NLP-FF9D00?style=for-the-badge&logo=huggingface)](https://huggingface.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-a3ff12?style=for-the-badge)](LICENSE)

</div>

---

## What is Zenvya?

Zenvya is an **institutional-grade eCommerce intelligence platform** that delivers real-time price tracking, automated marketplace scraping, and AI-driven "Real Score" sentiment analysis — all wrapped in a premium, minimalist 3D interface inspired by elite web design (Igloo.inc style).

It leverages a decoupled architecture with a **FastAPI/Celery** backend engine to asynchronously scrape and parse product data, while utilizing a localized **DistilBERT NLP model** to identify fake 5-star reviews and reveal genuine customer sentiment.

---

## Key Features

| Feature | Description |
|---|---|
| **Asynchronous Scraping Engine** | Headless browser adapters (Playwright) orchestrated by Celery queues to extract clean product data. |
| **Real Score™ AI** | Local HuggingFace NLP pipeline that analyzes review text to penalize fake ratings and expose true product quality. |
| **3D Interactive UI** | Breathtaking Next.js frontend featuring an interactive, WebGL-powered 3D rotating pyramid built with Three.js. |
| **Price Snapshots** | Automated historical price tracking stored via SQLAlchemy for volatile market visualization. |
| **Warm Intelligence Aesthetic** | Premium color palette (Amber Gold, Coffee Brown, Cream Beige) utilizing modern glassmorphism. |
| **Zero-DevOps MVP** | Configured to run entirely locally with SQLite — no Docker or complex container orchestration required for hackathons. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui |
| **3D Engine** | Three.js, React Three Fiber, Drei |
| **Backend API** | FastAPI (Python), SQLAlchemy ORM |
| **Scraping Engine** | Celery, Redis (Queue), Playwright |
| **Database** | SQLite (MVP) / PostgreSQL + pgvector (Production ready) |
| **AI NLP Layer** | HuggingFace Transformers (`distilbert-base-uncased-finetuned-sst-2-english`), PyTorch |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Python** 3.10+
- **Redis** (Optional: required only if running Celery workers, defaults to local execution for MVP)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Zenvya.git
cd Zenvya
```

### 2. Start the Backend API

We use a local virtual environment to manage Python dependencies seamlessly.

```bash
# Create and activate environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r backend/api/requirements.txt
pip install transformers torch torchvision torchaudio

# Start the FastAPI server
uvicorn backend.api.main:app --reload --port 8000
```
*Note: On first run, the NLP model will automatically download from HuggingFace.*

### 3. Seed Demo Data (Optional)
To test the UI immediately without running the scrapers, populate the SQLite database with 90 days of simulated market history:
```bash
python scripts/seed_demo_data.py
```

### 4. Start the 3D Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Launch the Platform

Navigate to **[http://localhost:3000](http://localhost:3000)** and witness the future of commerce.

---

## Project Structure

```
Zenvya/
├── frontend/              # Next.js 14 Web Application
│   ├── src/
│   │   ├── app/           # App router, global CSS, layout
│   │   ├── components/    # Reusable UI (Pyramid3D.tsx)
│   │   └── lib/           # Tailwind and shadcn utilities
│   ├── tailwind.config.ts # "Warm Intelligence" design tokens
│
├── backend/               # FastAPI & Celery Engine
│   ├── api/               # API routes, Pydantic schemas, Config
│   │   ├── models/        # SQLAlchemy Database Models
│   │   ├── routers/       # Search and Product Endpoints
│   │   └── core/          # Database config (SQLite/Postgres)
│   ├── services/          # Scraper Engine
│   │   ├── scraper/       # Celery workers and Tasks
│   │   └── adapters/      # Marketplace classes (Flipkart, Amazon)
│   └── ml/                # Machine Learning Pipeline
│       └── epi/           # "Real Score" Sentiment Analysis Model
│
├── scripts/               # Utility and Seeding scripts
└── package.json           # Monorepo workspace configuration
```

---

## AI Architecture: The Real Score

```
User Searches Product
     │
     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Playwright  │────▶│  FastAPI     │────▶│  HuggingFace    │
│  Scraper     │     │  Engine      │     │  DistilBERT NLP │
└─────────────┘     └──────────────┘     └─────────────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │  Sentiment      │
                                         │  Weighted Ratio │
                                         └─────────────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │  Final ZENVYA   │
                                         │  Real Score™    │
                                         └─────────────────┘
```

The system bypasses the raw star rating of a product. It extracts the raw review text, identifies the genuine emotion (Positive vs Negative), applies a massive penalty multiplier to detailed negative complaints, and mathematical blends it to expose fake reviews.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Engineered by Arjun** · v1.0 // Zenvya Core

*Buy Smart. Save Always.*

</div>
