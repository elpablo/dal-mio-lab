"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { ArticleLanguage as ArticleLocale } from "@/lib/articles";

export const languagePreferenceKey = "dalmiolab-language";

type ArticleLanguageProps = {
  currentLanguage: ArticleLocale;
  alternateLanguage?: ArticleLocale;
  alternateHref?: string;
};

function isArticleLocale(value: string | null): value is ArticleLocale {
  return value === "it" || value === "en";
}

export default function ArticleLanguage({
  currentLanguage,
  alternateLanguage,
  alternateHref,
}: ArticleLanguageProps) {
  useEffect(() => {
    document.documentElement.lang = currentLanguage;

    if (!alternateLanguage || !alternateHref) {
      return;
    }

    let explicitLanguage: string | null = null;

    try {
      explicitLanguage = window.localStorage.getItem(languagePreferenceKey);
    } catch {
      // Ignore storage restrictions and keep the current static page usable.
    }

    const preferredLanguage = isArticleLocale(explicitLanguage)
      ? explicitLanguage
      : navigator.language.toLowerCase().startsWith("it")
        ? "it"
        : "en";

    if (preferredLanguage !== currentLanguage && preferredLanguage === alternateLanguage) {
      window.location.replace(alternateHref);
    }
  }, [alternateHref, alternateLanguage, currentLanguage]);

  if (!alternateLanguage || !alternateHref) {
    return null;
  }

  const targetLanguage: ArticleLocale = alternateLanguage;
  const linkLabel = currentLanguage === "it"
    ? "Read in English →"
    : "Leggi in italiano →";

  function handleLanguageSelection() {
    try {
      window.localStorage.setItem(languagePreferenceKey, targetLanguage);
    } catch {
      // The link remains usable if storage is unavailable.
    }
  }

  return (
    <Link
      className="language-switch"
      href={alternateHref}
      onClick={handleLanguageSelection}
    >
      {linkLabel}
    </Link>
  );
}
