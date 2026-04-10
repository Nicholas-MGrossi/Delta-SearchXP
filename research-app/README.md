# Research Vector Deployment App

## Overview
Goal-locked app for meta-prompt engineering, context isolation, steelpoint synthesis using **real-time trending research only** [^1^][^2^]. No training data/memory.

**Cites Live Sources:**
- [^1^]: arXiv 2505.09024 (Meta-PE ToM alignment)
- [^2^]: arXiv 2311.11482 (Meta Prompting framework)
- Others in app.

## Run (No Setup)
```cmd
cd c:/Users/axiom/Desktop/Delta-SearchXP/research-app
start index.html
```
Opens in browser. Enter goal → Fetches/synthesizes steelpoint with vectors.

## Features
- Live arXiv/GitHub fetch (mock preloaded).
- JS Vector DB: TF-IDF embed, cosine kNN.
- Meta-Prompt: Recursive judge from [^1^], goal-isolated.
- Steelpoint: Robust synthesis from top research.

Built per bounds: Trending-only, research-first.
