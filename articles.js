// articles.js

function getArticles(){
  return JSON.parse(localStorage.getItem('articles')) || {};
}

function saveArticles(articles){
  localStorage.setItem('articles', JSON.stringify(articles));
}

// Render all articles in 3-column grid
function renderArticles() {
  const grid = document.getElementById("articles-grid");
  if (!grid) return;

  const searchBox = document.getElementById("search-box");
  const filterIssue = document.getElementById("filter-issue");

  const articles = getArticles();

  // Populate issues dropdown
  const allIssues = [...new Set(Object.values(articles).map(a=>a.issue))].sort((a,b)=>a-b);
  filterIssue.innerHTML = '<option value="">All Issues</option>' + allIssues.map(i=>`<option value="${i}">Issue ${i}</option>`).join('');

  function displayArticles(){
    const query = searchBox.value.toLowerCase();
    const selectedIssue = filterIssue.value;
    grid.innerHTML = '';

    Object.entries(articles).forEach(([id,a])=>{
      if(selectedIssue && a.issue != selectedIssue) return;
      const combinedText = `${a.title} ${a.author} ${a.content}`.toLowerCase();
      if(query && !combinedText.includes(query)) return;

      const card = document.createElement('div');
      card.className = 'article-card';
      card.onclick = () => openArticle(id);
      card.innerHTML = `
        <h2 class="article-title">${a.title.toUpperCase()}</h2>
        <div class="article-meta">By ${a.author} · ${a.date} · Issue ${a.issue}</div>
        ${a.image?`<img src="${a.image}" alt="${a.title}">`:''}
        <p class="article-synopsis">${a.content.slice(0,180)}...</p>
      `;
      grid.appendChild(card);
    });
  }

  searchBox.addEventListener('input', displayArticles);
  filterIssue.addEventListener('change', displayArticles);

  displayArticles();
}

// Open article page
function openArticle(id){
  localStorage.setItem('currentArticle', id);
  window.location.href = 'article.html';
}

// Render single article in article.html
function renderArticlePage(){
  const articleId = localStorage.getItem('currentArticle');
  const articles = getArticles();
  if(!articleId || !articles[articleId]) return;

  const a = articles[articleId];
  const container = document.getElementById('article-container');
  if(!container) return;

  container.innerHTML = `
    <div class="article-page">
      <h1 class="article-title">${a.title.toUpperCase()}</h1>
      <div class="article-meta">By ${a.author} · ${a.date} · Issue ${a.issue}</div>
      ${a.image?`<img src="${a.image}" alt="${a.title}">`:''}
      <p class="article-content">${a.content}</p>
    </div>
  `;
}
