import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  siteDescription,
  siteLocale,
  siteName,
  siteSocialImagePath,
  siteUrl,
} from "@/lib/site";
import "./globals.css";

const homeUrl = `${siteUrl}/`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s — Dal mio Lab",
  },
  description: siteDescription,
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: homeUrl,
    siteName,
    locale: siteLocale,
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
    description: siteDescription,
    images: [siteSocialImagePath],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
