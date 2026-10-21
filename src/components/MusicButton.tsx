"use client";

import { useLocale } from "@/lib/LocaleContext";
import { UI } from "@/lib/translations";
import type { AudioApi } from "@/lib/useAudio";

export default function MusicButton({ audio }: { audio: AudioApi }) {
  const { locale } = useLocale();
  const playing = audio.isPlaying;
  return (
    <button
      type="button"
      onClick={() => audio.toggle()}
      aria-label={playing ? UI.musicOn[locale] : UI.musicOff[locale]}
      className="frosted fixed right-4 bottom-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/70 text-gold-500 shadow-soft transition hover:scale-105 active:scale-95"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <span className="sr-only">
        {playing ? UI.musicOn[locale] : UI.musicOff[locale]}
      </span>
      {playing ? (
        <span className="vinyl vinyl--playing" />
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
