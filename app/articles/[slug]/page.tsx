import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatArticleDate,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return article
    ? { title: article.title, description: article.excerpt }
    : { title: "Articolo non trovato" };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="site-shell site-shell--article">
      <header className="site-header">
        <Link className="site-mark" href="/" aria-label="Torna alla home di Dal mio Lab">
          <span className="site-mark__symbol" aria-hidden="true">✳</span>
          <span>dal mio lab</span>
        </Link>
        <Link className="back-link" href="/">← Home</Link>
      </header>

      <main>
        <header className="article-header">
          <div className="article-header__meta">
            <span className="article-number">#{String(article.number).padStart(2, "0")}</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <span>{article.readingTime} min di lettura</span>
          </div>
          <ul className="tag-list" aria-label="Tag dell'articolo">
            {article.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </header>

        <article className="prose" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

        <nav className="article-navigation" aria-label="Navigazione articolo">
          <Link className="back-home" href="/">
            <span aria-hidden="true">←</span> Torna agli appunti
          </Link>
        </nav>
      </main>

      <footer className="site-footer">
        <span>Paolo / Dal mio Lab</span>
        <span>Fine dell&apos;appunto.</span>
      </footer>
    </div>
  );
}
