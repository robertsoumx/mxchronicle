function openArticle(id) {
  window.location.href = `article.html?id=${id}`;
}

function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const article = articles[id];

  if (!article) return;

  document.getElementById("article-title").innerText = article.title;
  document.getElementById("article-meta").innerText =
    `${article.author} · ${article.date}`;
  document.getElementById("article-image").src = article.image;
  document.getElementById("article-content").innerHTML = article.content;
}
