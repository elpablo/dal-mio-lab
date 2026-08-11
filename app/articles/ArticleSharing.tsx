"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "success" | "error";

type ArticleSharingProps = {
  articleUrl: string;
};

export default function ArticleSharing({ articleUrl }: ArticleSharingProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function showTemporaryState(state: Exclude<CopyState, "idle">) {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    setCopyState(state);
    resetTimer.current = setTimeout(() => {
      setCopyState("idle");
      resetTimer.current = null;
    }, 2200);
  }

  async function handleCopyLink() {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(articleUrl);
      showTemporaryState("success");
    } catch {
      showTemporaryState("error");
    }
  }

  const copyLabel =
    copyState === "success"
      ? "Link copiato ✓"
      : copyState === "error"
        ? "Copia non riuscita"
        : "Copia link";

  return (
    <div className="article-sharing" role="group" aria-label="Azioni articolo">
      <a
        className="share-action"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Condividi su LinkedIn (si apre in una nuova scheda)"
      >
        Condividi su LinkedIn <span aria-hidden="true">↗</span>
      </a>
      <span className="article-sharing__separator" aria-hidden="true">·</span>
      <button
        className="share-action share-action--button"
        type="button"
        onClick={handleCopyLink}
        aria-live="polite"
        aria-atomic="true"
      >
        {copyLabel}
      </button>
    </div>
  );
}
