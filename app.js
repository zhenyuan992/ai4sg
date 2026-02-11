const tools = [
    {
        name: "Trackpy Tuner",
        url: "https://trackpy.ai4.sg/",
        category: "Trackpy Tuner",
        sg: true,
        desc: "Trackpy tuner for segmentation of nanoparticles for image analysis."
    },
    {
        name: "ChatGPT",
        url: "https://chatgpt.com/",
        category: "General assistant",
        sg: false,
        desc: "General-purpose assistant for writing, coding, and analysis."
    },
    {
        name: "Perplexity",
        url: "https://www.perplexity.ai/",
        category: "Search and research",
        sg: false,
        desc: "Answer engine with web sources for fast research."
    },
    {
        name: "Notion AI",
        url: "https://www.notion.so/product/ai",
        category: "Writing and notes",
        sg: false,
        desc: "Draft, summarize, and rewrite inside your docs."
    },
    {
        name: "Cursor",
        url: "https://www.cursor.com/",
        category: "Coding",
        sg: false,
        desc: "AI code editor for building faster."
    },
    {
        name: "Canva Magic Studio",
        url: "https://www.canva.com/magic/",
        category: "Design",
        sg: false,
        desc: "AI features for slides, posters, and quick visuals."
    },
    {
        name: "Grammarly",
        url: "https://www.grammarly.com/",
        category: "Writing and notes",
        sg: false,
        desc: "Writing support and tone improvements."
    }
];

const qEl = document.getElementById("q");
const catEl = document.getElementById("cat");
const sgEl = document.getElementById("sgOnly");
const gridEl = document.getElementById("grid");
const emptyEl = document.getElementById("empty");
const countEl = document.getElementById("count");

function uniq(arr) { return [...new Set(arr)].sort((a, b) => a.localeCompare(b)); }

function buildCategories() {
    const cats = uniq(tools.map(t => t.category));
    for (const c of cats) {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        catEl.appendChild(opt);
    }
}

function matches(tool) {
    const q = (qEl.value || "").trim().toLowerCase();
    const cat = catEl.value;
    const sgOnly = sgEl.checked;

    if (sgOnly && !tool.sg) return false;
    if (cat !== "all" && tool.category !== cat) return false;

    if (!q) return true;

    const hay = `${tool.name} ${tool.category} ${tool.desc}`.toLowerCase();
    return hay.includes(q);
}

function render() {
    const filtered = tools.filter(matches);
    gridEl.innerHTML = "";

    for (const t of filtered) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h3>${escapeHtml(t.name)}</h3>
        <div class="muted">${escapeHtml(t.desc)}</div>
        <div class="tags">
          <span class="tag">${escapeHtml(t.category)}</span>
          ${t.sg ? `<span class="tag sg">Built in SG</span>` : ``}
        </div>
        <a class="link" href="${t.url}" target="_blank" rel="noopener">Open</a>
      `;
        gridEl.appendChild(card);
    }

    emptyEl.hidden = filtered.length !== 0;
    countEl.textContent = `${filtered.length} tool${filtered.length === 1 ? "" : "s"}`;
}

function escapeHtml(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.getElementById("year").textContent = new Date().getFullYear();

buildCategories();
render();

[qEl, catEl, sgEl].forEach(el => el.addEventListener("input", render));