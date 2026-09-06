import type { Metadata } from "next";
import HomePage from "../HomePage";
import {
  siteEnglishDescription,
  siteEnglishLocale,
  siteName,
  siteSocialImagePath,
  siteUrl,
} from "@/lib/site";

const englishHomeUrl = `${siteUrl}/en/`;

export const metadata: Metadata = {
  title: siteName,
  description: siteEnglishDescription,
  alternates: {
    canonical: englishHomeUrl,
    languages: {
      it: `${siteUrl}/`,
      en: englishHomeUrl,
      "x-default": `${siteUrl}/`,
    },
  },
  openGraph: {
    title: siteName,
    description: siteEnglishDescription,
    url: englishHomeUrl,
    siteName,
    locale: siteEnglishLocale,
    type: "website",
    images: [
      {
        url: siteSocialImagePath,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteEnglishDescription,
    images: [siteSocialImagePath],
  },
};

export default function EnglishHomePage() {
  return <HomePage language="en" />;
}
