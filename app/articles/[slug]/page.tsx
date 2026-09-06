import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage, { getArticleMetadata } from "../ArticlePage";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs("it").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "it");

  if (!article) {
    return { title: "Articolo non trovato" };
  }

  return getArticleMetadata(article, "it");
}

export default async function ItalianArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "it");

  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} language="it" />;
}
