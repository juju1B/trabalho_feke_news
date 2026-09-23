// Base de dados dos conteúdos para estudo
const studyCards = [
  {
    id: 1,
    title: "Array.prototype.map()",
    category: "javascript",
    tags: ["JS", "Arrays", "Métodos"],
    content: "const novosItens = array.map(item => item * 2);"
  },
  {
    id: 2,
    title: "Centralizar Div com Flexbox",
    category: "css",
    tags: ["CSS", "Flexbox", "Layout"],
    content: "display: flex;\njustify-content: center;\nalign-items: center;"
  },
  {
    id: 3,
    title: "Destructuring Assignment",
    category: "javascript",
    tags: ["JS", "ES6", "Sintaxe"],
    content: "const { nome, idade } = usuario;"
  },
  {
    id: 4,
    title: "Promises / Async-Await",
    category: "teoria",
    tags: ["JS", "Assíncrono", "API"],
    content: "async function fetchData() {\n  const res = await fetch(url);\n  const data = await res.json();\n}"
  },
  {
    id: 5,
    title: "Grid Básico CSS",
    category: "css",
    tags: ["CSS", "Grid"],
    content: "display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngap: 1rem;"
  },
  {
    id: 6,
    title: "Atalho VS Code: Duplicar Linha",
    category: "atribuitos",
    tags: ["VSCode", "Atalhos"],
    content: "Shift + Alt + Seta para Baixo (Windows)\nShift + Option + Seta para Baixo (Mac)"
  }
];

// Elementos DOM
const cardsContainer = document.getElementById('cards-container');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('no-results');
const btnFontIncrease = document.getElementById('font-increase');
const btnFontDecrease = document.getElementById('font-decrease');

let currentCategory = 'all';
let currentSearch = '';
let currentFontSize = 1; // 0: sm, 1: base, 2: lg
const fontClasses = ['font-size-sm', 'font-size-base', 'font-size-lg'];

// Renderização dos cartões
function renderCards() {
  cardsContainer.innerHTML = '';
  
  const filtered = studyCards.filter(card => {
    const matchesCategory = currentCategory === 'all' || card.category === currentCategory;
    const matchesSearch = card.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          card.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase())) ||
                          card.content.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }

  filtered.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'bg-white rounded-2xl p-5 border border-magenta-suave/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between';
    
    cardEl.innerHTML = `
      <div>
        <div class="flex justify-between items-start mb-3">
          <h3 class="font-bold text-lg text-magenta-suave">${card.title}</h3>
          <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-rosa-pastel text-magenta-suave">
            ${card.category}
          </span>
        </div>
        
        <div class="relative group my-3">
          <pre class="code-block text-slate-800 whitespace-pre-wrap break-words">${escapeHTML(card.content)}</pre>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-bege-retro">
        <div class="flex flex-wrap gap-1">
          ${card.tags.map(tag => `<span class="text-[11px] text-magenta-suave/70 bg-bege-retro px-2 py-0.5 rounded-md">#${tag}</span>`).join('')}
        </div>
      </div>
    `;

    cardsContainer.appendChild(cardEl);
  });
}

// Auxiliar para tratar HTML especial
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Filtros
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderCards();
  });
});

// Busca
searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderCards();
});

// Controle de tamanho de fonte
btnFontIncrease.addEventListener('click', () => {
  if (currentFontSize < 2) {
    cardsContainer.classList.remove(fontClasses[currentFontSize]);
    currentFontSize++;
    cardsContainer.classList.add(fontClasses[currentFontSize]);
  }
});

btnFontDecrease.addEventListener('click', () => {
  if (currentFontSize > 0) {
    cardsContainer.classList.remove(fontClasses[currentFontSize]);
    currentFontSize--;
    cardsContainer.classList.add(fontClasses[currentFontSize]);
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
});