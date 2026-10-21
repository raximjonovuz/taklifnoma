"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  useState,
} from "react";
import type { Locale } from "@/lib/types";

const STORAGE_KEY = "wedding-locale";
const DEFAULT: Locale = "uz";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<Ctx | null>(null);

function readLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "uz" || saved === "ru" || saved === "en") return saved;
  const browser = window.navigator.language.slice(0, 2).toLowerCase();
  if (browser === "ru" || browser === "en") return browser;
  return DEFAULT;
}

function subscribeLocale(): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      window.dispatchEvent(new CustomEvent("wedding-locale-change"));
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("wedding-locale-change", onStorage as EventListener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(
      "wedding-locale-change",
      onStorage as EventListener,
    );
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    readLocale,
    () => DEFAULT,
  );

  const [, setBump] = useState(0);

  const setLocale = useCallback((l: Locale) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      window.dispatchEvent(new CustomEvent("wedding-locale-change"));
      setBump((n) => n + 1);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
