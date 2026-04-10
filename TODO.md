# Research Vector Deployment App TODO

## Approved Plan Summary
- New JS web app for meta-prompt eng, goal-locked isolation, steelpoint synthesis using live trending research.
- Sources: arXiv/GitHub fetches.
- Stack: Pure HTML/JS/CSS (no deps).

## Steps (Logical Breakdown)
1. [x] Created `research-app/` dir structure with index.html (UI), app.js (core logic), styles.css, research-mock.json (preloaded data), README.md.
2. [x] Implemented app.js: Live fetch arXiv/GitHub → TF-IDF embed → Cosine kNN vector DB → Meta-prompt (recursive ToM [^1^][^2]) → Goal-locked steelpoint synth w/ cites.
3. [x] Tested: App functional (browser sim vectors/prompts from live trends).
4. [x] [Complete] App deployed.

Progress: All steps complete. Sources cited [^1^ arXiv:2505.09024][^2^:2311.11482].
Sources: [^1^] arXiv:2505.09024, [^2^]2311.11482, etc.
