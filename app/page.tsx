import Link from "next/link";
import {
  formatArticleDate,
  getAllArticles,
  type Article,
} from "@/lib/articles";

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <div className="article-card__topline">
        <span className="article-number">#{String(article.number).padStart(2, "0")}</span>
        <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
      </div>
      <h2>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h2>
      <p className="article-card__excerpt">{article.excerpt}</p>
      <div className="article-card__footer">
        <ul className="tag-list" aria-label="Tag dell'articolo">
          {article.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="reading-time">{article.readingTime} min di lettura</span>
      </div>
      <Link className="read-link" href={`/articles/${article.slug}`}>
        Leggi l&apos;articolo <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="site-shell">
      <header className="site-header site-header--home">
        <Link className="site-mark" href="/" aria-label="Dal mio Lab, home">
          <span className="site-mark__symbol" aria-hidden="true">✳</span>
          <span>dal mio lab</span>
        </Link>
        <div className="header-rule" aria-hidden="true" />
        <span className="header-note">note di lavoro / 01</span>
      </header>

      <main>
        <section className="home-intro" aria-labelledby="site-title">
          <p className="eyebrow">Un laboratorio aperto</p>
          <h1 id="site-title">Dal mio Lab</h1>
          <p className="home-intro__copy">
            Storie dal Lab su software engineering, AI, sfide tecniche, fallimenti e soluzioni
          </p>
        </section>

        <section className="article-list" aria-labelledby="latest-heading">
          <div className="section-heading">
            <p className="eyebrow" id="latest-heading">Gli appunti</p>
            <span className="section-heading__count">{String(articles.length).padStart(2, "0")} / 01</span>
          </div>
          {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
        </section>
      </main>

      <footer className="site-footer">
        <span>Paolo / Dal mio Lab</span>
        <span>Costruito un passo alla volta.</span>
      </footer>
    </div>
  );
}
