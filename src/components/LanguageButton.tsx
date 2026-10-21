"use client";

import { useState } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { LOCALE_FLAG, LOCALE_LABEL } from "@/lib/translations";
import type { Locale } from "@/lib/types";

export default function LanguageButton() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const locales: Locale[] = ["uz", "ru", "en"];

  return (
    <div className="frosted fixed left-4 top-4 z-40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        className="inline-flex h-10 items-center gap-1 rounded-full border border-gold-300/70 px-3 text-sm text-charcoal"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {LOCALE_FLAG[locale]}
        <svg
          viewBox="0 0 12 12"
          className="h-3 w-3 text-gold-500"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M3 5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <ul className="frosted mt-2 overflow-hidden rounded-2xl border border-gold-300/70 reveal reveal--in">
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`flex w-36 items-center justify-between px-4 py-2 text-sm hover:bg-ivory-200/70 ${
                  l === locale ? "font-semibold text-gold-500" : "text-charcoal"
                }`}
              >
                <span>{LOCALE_LABEL[l]}</span>
                <span className="text-xs text-charcoal-soft">
                  {LOCALE_FLAG[l]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
