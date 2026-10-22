"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { Lang } from "./types";

const STORAGE_KEY = "taklifnoma.lang";
const DEFAULT: Lang = "uz";
const EVENT = "taklifnoma:lang";

const isLang = (v: string | null | undefined): v is Lang =>
  !!v && (v === "uz" || v === "ru" || v === "en");

function readLang(): Lang {
  if (typeof window === "undefined") return DEFAULT;
  try {
    // 1) Foydalanuvchi tanlagan til (localStorage) — eng ustun
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
    // 2) Havoladagi ?lang= — bir marta qabul qilinib saqlanadi
    const url = new URLSearchParams(window.location.search).get("lang");
    if (isLang(url)) {
      window.localStorage.setItem(STORAGE_KEY, url);
      return url;
    }
    // 3) Brauzer tili
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (isLang(nav)) return nav;
  } catch {}
  return DEFAULT;
}

/**
 * React bergan `onStoreChange` ni to'g'ridan-to'g'ri ishlatamiz.
 * (Event'ni qayta dispatch qilsak, cheksiz sikl bo'lib sahifa osilib qoladi.)
 */
function subscribe(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onStoreChange);
  };
}

/**
 * Til holati: localStorage → `?lang=` → brauzer tili.
 * SSR paytida har doim `uz` qaytaradi, shuning uchun gidratsiya mos keladi.
 */
export function useLang(): [Lang, (l: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const set = useCallback((l: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    if (document.documentElement.lang !== l) document.documentElement.lang = l;
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return [lang, set];
}