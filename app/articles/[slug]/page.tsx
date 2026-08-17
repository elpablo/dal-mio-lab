import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleSharing from "../ArticleSharing";
import {
  formatArticleDate,
  getAdjacentArticles,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/articles";
import {
  siteLocale,
  siteName,
  siteSocialImagePath,
  siteUrl,
} from "@/lib/site";

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

  if (!article) {
    return { title: "Articolo non trovato" };
  }

  const canonicalPath = `/articles/${article.slug}`;
  const socialImagePath = article.socialImage ?? siteSocialImagePath;
  const socialTitle = `Dal mio Lab #${article.number} — ${article.title}`;

  return {
    title: socialTitle,
    description: article.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: socialTitle,
      description: article.excerpt,
      url: canonicalPath,
      siteName,
      locale: siteLocale,
      type: "article",
      publishedTime: `${article.date}T00:00:00.000Z`,
      tags: article.tags,
      images: [
        {
          url: socialImagePath,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: article.excerpt,
      images: [socialImagePath],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { previousArticle, nextArticle } = getAdjacentArticles(article.slug);

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

        <ArticleSharing articleUrl={`${siteUrl}/articles/${article.slug}`} />

        <nav className="article-navigation" aria-label="Navigazione tra gli articoli">
          <div className="article-navigation__links">
            {previousArticle && (
              <Link
                className="article-navigation__link"
                href={`/articles/${previousArticle.slug}`}
              >
                <span className="article-navigation__label">← Articolo precedente</span>
                <span className="article-navigation__title">
                  #{String(previousArticle.number).padStart(2, "0")} — {previousArticle.title}
                </span>
              </Link>
            )}
            {nextArticle && (
              <Link
                className="article-navigation__link article-navigation__link--next"
                href={`/articles/${nextArticle.slug}`}
              >
                <span className="article-navigation__label">Articolo successivo →</span>
                <span className="article-navigation__title">
                  #{String(nextArticle.number).padStart(2, "0")} — {nextArticle.title}
                </span>
              </Link>
            )}
          </div>
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
