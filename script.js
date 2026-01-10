function renderArticles() {
  const list = document.getElementById("article-list");
  const q = document.getElementById("search").value.toLowerCase();
  const sort = document.getElementById("sort").value;

  let data = Object.entries(articles)
    .filter(([_, a]) =>
      a.title.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
    );

  data.sort((a, b) => a[1][sort].localeCompare(b[1][sort]));

  list.innerHTML = "";
  data.forEach(([id, a]) => {
    list.innerHTML += `
      <div class="article-list-item" onclick="openArticle('${id}')">
        <h3>${a.title}</h3>
        <div class="article-meta">${a.author} · ${a.date}</div>
      </div>`;
  });
}
// Redirect to article page
function openArticle(id) {
  window.location.href = `article.html?id=${id}`;
}
