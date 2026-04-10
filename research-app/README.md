# Research Vector Deployment App

## Overview
Goal-locked app for meta-prompt engineering, context isolation, steelpoint synthesis using **real-time trending research only** [^1^][^2^]. No training data/memory.

**Standards Compliance:** This application implements the five operating standards:

1. **Academic and Professional Standard**: All factual assertions supported by verifiable external documentation (arXiv papers, GitHub repositories)
2. **Evidentiary Rigor**: Analysis traceable to primary/secondary sources; empirical TF-IDF vector matching
3. **Operator-Centric Control**: Human agency prioritized through explicit goal input and verification steps
4. **Actionable Workflow Guidance**: Includes confidence assessments, decision frameworks, and cognitive tools
5. **Strict Ethical Safety Boundaries**: Transparent limitations, bounded agent operation, error handling

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
- Live arXiv/GitHub fetch (mock preloaded with fallback).
- JS Vector DB: TF-IDF embed, cosine kNN (empirical matching).
- Meta-Prompt: Recursive judge from [^1^], goal-isolated.
- Steelpoint: Robust synthesis from top research with confidence scores.
- Operator verification: Explicit human oversight at each step.

## Standards Implementation Details

### Academic Rigor
- Sources: Peer-reviewed arXiv papers and verified GitHub repositories
- Citations: Inline references at point of relevance
- Traceability: All claims linked to primary sources

### Evidentiary Traceability
- Vector methodology: TF-IDF embedding with cosine similarity
- Confidence assessment: HIGH/LOW based on similarity thresholds
- Uncertainty flagging: Explicit warnings for low-confidence matches

### Operator-Centric Design
- Bounded agent: Explicitly limited to provided context
- Human primacy: Requires explicit goal input before processing
- Zero-drift: No external knowledge injection

### Workflow Enhancements
- Decision framework: Prioritize by cosine similarity score
- Cognitive tools: Steelmanning principle applied to evidence
- Audit trail: Console logging for transparency

## Built per bounds: Trending-only, research-first, operator-controlled.
