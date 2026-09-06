import Link from "next/link";
import {
  formatArticleDate,
  getAllArticles,
  type Article,
  type ArticleLanguage,
} from "@/lib/articles";
import { getArticlePath } from "./articles/ArticlePage";

type HomeCopy = {
  eyebrow: string;
  intro: string;
  listLabel: string;
  tagLabel: string;
  readingTime: string;
  readArticle: string;
  headerNote: string;
  footerNote: string;
};

const copy: Record<ArticleLanguage, HomeCopy> = {
  it: {
    eyebrow: "Un laboratorio aperto",
    intro: "Storie dal Lab su software engineering, AI, sfide tecniche, fallimenti e soluzioni",
    listLabel: "Gli appunti",
    tagLabel: "Tag dell'articolo",
    readingTime: "min di lettura",
    readArticle: "Leggi l'articolo",
    headerNote: "note di lavoro / 01",
    footerNote: "Costruito un passo alla volta.",
  },
  en: {
    eyebrow: "An open lab",
    intro: "Stories from the Lab about software engineering, AI, technical challenges, failures and solutions",
    listLabel: "Notes",
    tagLabel: "Article tags",
    readingTime: "min read",
    readArticle: "Read the article",
    headerNote: "working notes / 01",
    footerNote: "Built one step at a time.",
  },
};

function ArticleCard({ article, language }: { article: Article; language: ArticleLanguage }) {
  const articlePath = getArticlePath(language, article.slug);
  const labels = copy[language];

  return (
    <article className="article-card">
      <div className="article-card__topline">
        <span className="article-number">#{String(article.number).padStart(2, "0")}</span>
        {article.date && (
          <time dateTime={article.date}>{formatArticleDate(article.date, language)}</time>
        )}
      </div>
      <h2>
        <Link href={articlePath}>{article.title}</Link>
      </h2>
      <p className="article-card__excerpt">{article.excerpt}</p>
      <div className="article-card__footer">
        <ul className="tag-list" aria-label={labels.tagLabel}>
          {article.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <span className="reading-time">{article.readingTime} {labels.readingTime}</span>
      </div>
      <Link className="read-link" href={articlePath}>
        {labels.readArticle} <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

type HomePageProps = {
  language: ArticleLanguage;
};

export default function HomePage({ language }: HomePageProps) {
  const articles = getAllArticles(language);
  const labels = copy[language];
  const homePath = language === "en" ? "/en/" : "/";

  return (
    <div className="site-shell" lang={language}>
      <header className="site-header site-header--home">
        <Link className="site-mark" href={homePath} aria-label="Dal mio Lab, home">
          <span className="site-mark__symbol" aria-hidden="true">✳</span>
          <span>dal mio lab</span>
        </Link>
        <div className="header-rule" aria-hidden="true" />
        <span className="header-note">{labels.headerNote}</span>
      </header>

      <main>
        <section className="home-intro" aria-labelledby="site-title">
          <p className="eyebrow">{labels.eyebrow}</p>
          <h1 id="site-title">Dal mio Lab</h1>
          <p className="home-intro__copy">{labels.intro}</p>
        </section>

        <section className="article-list" aria-labelledby="latest-heading">
          <div className="section-heading">
            <p className="eyebrow" id="latest-heading">{labels.listLabel}</p>
            <span className="section-heading__count">{String(articles.length).padStart(2, "0")} / 01</span>
          </div>
          {articles.map((article) => <ArticleCard article={article} language={language} key={article.slug} />)}
        </section>
      </main>

      <footer className="site-footer">
        <span>Paolo / Dal mio Lab</span>
        <span>{labels.footerNote}</span>
      </footer>
    </div>
  );
}
