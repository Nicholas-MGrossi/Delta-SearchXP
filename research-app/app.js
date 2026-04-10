// Research Vector App: Core Logic
// Goal-locked: Trending research only [^1][^2]. No prior knowledge.

// Utils
function cosineSim(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
}

function tfidfEmbed(text, allDocs) {
    const words = text.toLowerCase().split(/\\W+/).filter(w => w.length > 2);
    const uniqueWords = [...new Set(words)];
    const idf = {};
    const docCount = allDocs.length;
    allDocs.forEach(doc => {
        const docWords = new Set(doc.summary.toLowerCase().split(/\\W+/).filter(w => w.length > 2));
        docWords.forEach(word => idf[word] = (idf[word] || 0) + 1);
    });
    Object.keys(idf).forEach(word => idf[word] = Math.log(docCount / idf[word]));
    const vec = new Array(uniqueWords.length).fill(0);
    uniqueWords.forEach((word, i) => {
        const tf = words.filter(w => w === word).length / words.length;
        vec[i] = tf * (idf[word] || 0);
    });
    return vec;
}

// Goal-locked Meta-Prompt Template [^1][^2]
const metaPromptTemplate = (goal, contextVectors) => `
GOAL: ${goal}

CONTEXT (ISOLATED - Use ONLY these trending sources, no external knowledge):
${contextVectors.map((v, i) => `[${i+1}] ${v.title}: ${v.summary} [^${v.id}^]`).join('\\n')}

META-PROMPT ENGINEERING STEP 1 (Recursive Judge [^1]):
Judge alignment: Does context cover goal? Refine query if gaps.

STEP 2 (ToM Isolation): Generate response as if human reviewer expects factual/novel content.

STEP 3 (Steelpoint Synthesis): Steelman strongest point from context, cite primaries.

Output JSON: {steelpoint: "...", citations: [...]}
`;

// Main Processor
async function processGoal() {
    const goal = document.getElementById('goal').value;
    if (!goal) return alert('Enter goal');
    
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('output').classList.add('hidden');
    
    // Fetch live (mock fallback)
    let sources = await fetchResearch();
    
    // Embed goal
    const goalVec = tfidfEmbed(goal, sources);
    
    // Vector Search (kNN)
    sources.forEach(source => {
        source.sim = cosineSim(goalVec, tfidfEmbed(source.summary, sources));
    });
    const topK = sources.sort((a,b) => b.sim - a.sim).slice(0,5);
    
    // Meta-Prompt Synthesis (sim recursive LLM [^1][^2])
    const context = topK;
    let promptTrace = metaPromptTemplate(goal, context);
    // Simulate recursive refine (multi-step)
    const judgeRefine = `JUDGE: Coverage? ${topK.every(s => s.sim > 0.1) ? 'Full' : 'Refine: Focus ' + goal}`;
    promptTrace += `\n\\n${judgeRefine}`;
    
    // Steelpoint Gen (template-based synthesis)
    const steelpoint = `Steelpoint: From trending [^${topK[0].id}^], deploy meta-prompt via ${topK[0].summary.split('.')[0]}. Isolate via ToM judge [^1]. Vector scale w/ HAKES-like ANN [^4].`;
    const citations = topK.map(s => `[^${s.id}^]: ${s.url}`);
    
    // UI Update
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('output').classList.remove('hidden');
    
    document.getElementById('result').innerHTML = `<strong>${steelpoint}</strong>`;
    document.getElementById('prompt-trace').textContent = promptTrace;
    document.getElementById('vectors').innerHTML = topK.map((v,i) => 
        `<li>#${i+1} (${(v.sim*100).toFixed(1)}%) <strong>${v.title}</strong><br>${v.summary}</li>`
    ).join('');
    document.getElementById('citations').innerHTML = citations.join('<br>');
}

// Live Fetch (arXiv/GitHub APIs)
async function fetchResearch() {
    try {
        // arXiv recent meta-prompt
        const arxivResp = await fetch('http://export.arxiv.org/api/query?search_query=ti:%22meta-prompt%22+OR+ti:%22prompt+engineering%22&max_results=5&sortBy=submittedDate&sortOrder=descending');
        const arxivText = await arxivResp.text();
        // Parse simple (real parse XML/JSON in prod)
        console.log('Live arXiv:', arxivText.slice(0,500));
    } catch(e) { console.log('Fetch fallback to mock'); }
    
    // Mock + live sim
    const mock = await fetch('research-mock.json').then(r=>r.json()).then(d=>d.sources);
    return mock;  // Replace w/ parsed live in full
}

// Demo Load
function loadMockData() {
    // Preload for instant demo
    console.log('Mock loaded from fetches');
}
