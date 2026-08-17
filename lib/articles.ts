import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDirectory = path.join(process.cwd(), "content");

export type Article = {
  slug: string;
  title: string;
  number: number;
  date: string;
  excerpt: string;
  tags: string[];
  socialImage?: string;
  readingTime: number;
  contentHtml: string;
};

type ArticleFrontmatter = Omit<Article, "slug" | "readingTime" | "contentHtml">;

function estimateReadingTime(content: string): number {
  const wordCount = content
    .replace(/[`*_>#-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

function articleFromFile(filename: string): Article {
  const slug = filename.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(contentDirectory, filename), "utf8");
  const parsed = matter(source);
  const data = parsed.data as ArticleFrontmatter;
  const { content } = parsed;

  return {
    ...data,
    slug,
    readingTime: estimateReadingTime(content),
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}

export function getAllArticles(): Article[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(articleFromFile)
    .sort((first, second) => second.number - first.number);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getAdjacentArticles(slug: string): {
  previousArticle?: Article;
  nextArticle?: Article;
} {
  const articles = getAllArticles();
  const currentIndex = articles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previousArticle: articles[currentIndex + 1],
    nextArticle: articles[currentIndex - 1],
  };
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
