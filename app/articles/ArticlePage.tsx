import type { Metadata } from "next";
import Link from "next/link";
import ArticleLanguage from "./ArticleLanguage";
import ArticleSharing from "./ArticleSharing";
import {
  formatArticleDate,
  getAdjacentArticles,
  type Article,
  type ArticleLanguage as ArticleLocale,
} from "@/lib/articles";
import {
  siteEnglishLocale,
  siteLocale,
  siteName,
  siteSocialImagePath,
  siteUrl,
} from "@/lib/site";

export function getArticlePath(language: ArticleLocale, slug: string): string {
  return language === "en" ? `/en/articles/${slug}` : `/articles/${slug}`;
}

export function getArticleMetadata(
  article: Article,
  language: ArticleLocale,
): Metadata {
  const canonicalPath = getArticlePath(language, article.slug);
  const socialImagePath = article.socialImage ?? siteSocialImagePath;
  const socialTitle = `Dal mio Lab #${article.number} — ${article.title}`;
  const alternateLanguages = article.alternateLanguage
    ? {
        it: language === "it"
          ? canonicalPath
          : getArticlePath("it", article.alternateLanguage.slug),
        en: language === "en"
          ? canonicalPath
          : getArticlePath("en", article.alternateLanguage.slug),
        "x-default": language === "it"
          ? canonicalPath
          : getArticlePath("it", article.alternateLanguage.slug),
      }
    : undefined;

  return {
    title: socialTitle,
    description: article.excerpt,
    alternates: {
      canonical: canonicalPath,
      ...(alternateLanguages ? { languages: alternateLanguages } : {}),
    },
    openGraph: {
      title: socialTitle,
      description: article.excerpt,
      url: canonicalPath,
      siteName,
      locale: language === "en" ? siteEnglishLocale : siteLocale,
      type: "article",
      publishedTime: article.date ? `${article.date}T00:00:00.000Z` : undefined,
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

type ArticlePageProps = {
  article: Article;
  language: ArticleLocale;
};

export default function ArticlePage({ article, language }: ArticlePageProps) {
  const { previousArticle, nextArticle } = getAdjacentArticles(article.slug, language);
  const homePath = language === "en" ? "/en/" : "/";
  const alternateHref = article.alternateLanguage
    ? getArticlePath(article.alternateLanguage.lang, article.alternateLanguage.slug)
    : undefined;

  return (
    <div className="site-shell site-shell--article" lang={language}>
      <header className="site-header">
        <Link
          className="site-mark"
          href={homePath}
          aria-label={language === "it" ? "Torna alla home di Dal mio Lab" : "Back to Dal mio Lab home"}
        >
          <span className="site-mark__symbol" aria-hidden="true">✳</span>
          <span>dal mio lab</span>
        </Link>
        <Link className="back-link" href={homePath}>← Home</Link>
      </header>

      <main>
        <header className="article-header">
          <div className="article-header__meta">
            <span className="article-number">#{String(article.number).padStart(2, "0")}</span>
            {article.date && (
              <time dateTime={article.date}>{formatArticleDate(article.date, language)}</time>
            )}
            <span>{article.readingTime} {language === "it" ? "min di lettura" : "min read"}</span>
          </div>
          <ul className="tag-list" aria-label={language === "it" ? "Tag dell'articolo" : "Article tags"}>
            {article.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <ArticleLanguage
            currentLanguage={language}
            alternateLanguage={article.alternateLanguage?.lang}
            alternateHref={alternateHref}
          />
        </header>

        <article className="prose">
          <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          {article.discussion && (
            <aside
              className="discussion-cta"
              aria-labelledby={`discussion-heading-${article.slug}`}
            >
              <h3 id={`discussion-heading-${article.slug}`}>
                {article.discussion.title}
              </h3>
              {article.discussion.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {article.discussion.linkedinPost && (
                <a
                  href={article.discussion.linkedinPost}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Partecipa alla conversazione su LinkedIn →
                </a>
              )}
            </aside>
          )}
        </article>

        <ArticleSharing
          articleUrl={`${siteUrl}${getArticlePath(language, article.slug)}`}
          language={language}
        />

        <nav
          className="article-navigation"
          aria-label={language === "it" ? "Navigazione tra gli articoli" : "Article navigation"}
        >
          <div className="article-navigation__links">
            {previousArticle && (
              <Link
                className="article-navigation__link"
                href={getArticlePath(language, previousArticle.slug)}
              >
                <span className="article-navigation__label">
                  {language === "it" ? "← Articolo precedente" : "← Previous article"}
                </span>
                <span className="article-navigation__title">
                  #{String(previousArticle.number).padStart(2, "0")} — {previousArticle.title}
                </span>
              </Link>
            )}
            {nextArticle && (
              <Link
                className="article-navigation__link article-navigation__link--next"
                href={getArticlePath(language, nextArticle.slug)}
              >
                <span className="article-navigation__label">
                  {language === "it" ? "Articolo successivo →" : "Next article →"}
                </span>
                <span className="article-navigation__title">
                  #{String(nextArticle.number).padStart(2, "0")} — {nextArticle.title}
                </span>
              </Link>
            )}
          </div>
          <Link className="back-home" href={homePath}>
            <span aria-hidden="true">←</span>
            {language === "it" ? "Torna agli appunti" : "Back to Notes"}
          </Link>
        </nav>
      </main>

      <footer className="site-footer">
        <span>Paolo / Dal mio Lab</span>
        <span>{language === "it" ? "Fine dell'appunto." : "End of note."}</span>
      </footer>
    </div>
  );
}
