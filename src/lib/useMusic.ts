"use client";

import { useEffect, useRef, useState } from "react";

export type MusicApi = {
  play: () => Promise<void>;
  toggle: () => Promise<void>;
  isPlaying: boolean;
};

/** Fon musiqasi — fayl `preload="none"` bilan faqat bosilganda yuklanadi */
export function useMusic(src?: string): MusicApi {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0;
    ref.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      ref.current = null;
    };
  }, [src]);

  const fadeTo = (to: number, ms: number) =>
    new Promise<void>((resolve) => {
      const audio = ref.current;
      if (!audio) return resolve();
      const from = audio.volume;
      const steps = 24;
      let i = 0;
      const id = window.setInterval(() => {
        i++;
        audio.volume = Math.max(0, Math.min(1, from + (to - from) * (i / steps)));
        if (i >= steps) {
          window.clearInterval(id);
          resolve();
        }
      }, ms / steps);
    });

  /** Sekin aloqada (2G/3G, "iqtisod rejimi") avtomatik ishga tushmaydi */
  const play = async () => {
    const audio = ref.current;
    if (!audio) return;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      conn?.saveData ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "3g"
    ) {
      return;
    }
    try {
      await audio.play();
      await fadeTo(0.45, 900);
    } catch {
      setPlaying(false);
    }
  };

  const toggle = async () => {
    const audio = ref.current;
    if (!audio) return;
    if (audio.paused) await play();
    else {
      await fadeTo(0, 320);
      audio.pause();
    }
  };

  return { play, toggle, isPlaying };
}