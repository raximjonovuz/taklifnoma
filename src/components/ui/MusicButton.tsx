"use client";

import type { MusicApi } from "@/lib/useMusic";

export default function MusicButton({
  music,
  label,
}: {
  music: MusicApi;
  label: string;
}) {
  return (
    <button
      className={`music${music.isPlaying ? " is-playing" : ""}`}
      type="button"
      aria-label={label}
      aria-pressed={music.isPlaying}
      onClick={music.toggle}
    >
      <span className="music__bars">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}