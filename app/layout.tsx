import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dal mio Lab",
    template: "%s — Dal mio Lab",
  },
  description:
    "Storie dal Lab su software engineering, AI, sfide tecniche, fallimenti e soluzioni.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
