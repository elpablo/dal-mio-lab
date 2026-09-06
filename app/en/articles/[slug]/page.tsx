import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage, { getArticleMetadata } from "@/app/articles/ArticlePage";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";

type EnglishArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EnglishArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "en");

  if (!article) {
    return { title: "Article not found" };
  }

  return getArticleMetadata(article, "en");
}

export default async function EnglishArticlePage({ params }: EnglishArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "en");

  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} language="en" />;
}
