"use client";

import { useState } from "react";
import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

export default function Contacts({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <Ornament />
      <h2 className="font-display mt-6 text-2xl text-charcoal">
        {UI.contactsTitle[locale]}
      </h2>

      <ul className="mt-10 w-full">
        {couple.phones.map((p, i) => (
          <li key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-5">
            <span className="eyebrow text-right">{p.label}</span>
            <span
              className="block h-px w-12 border-b border-dashed border-gold-300/60"
              aria-hidden="true"
            />
            <CopyablePhone value={p.phone} />
          </li>
        ))}
      </ul>

      <a
        href={`https://t.me/${couple.telegram.replace(/^@/, "")}`}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-300 px-5 py-2 text-sm text-charcoal transition-colors duration-500 hover:bg-espresso-100 hover:text-gold-200"
      >
        <span>Telegram</span>
        <span className="font-display italic">{couple.telegram}</span>
      </a>
    </Reveal>
  );
}

function CopyablePhone({ value }: { value: string }) {
  const { locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex items-center justify-start gap-2">
      <a
        href={`tel:${value.replace(/\s+/g, "")}`}
        className="font-display text-lg text-charcoal hover:text-gold-500"
      >
        {value}
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={UI.copyNumber[locale]}
        className="text-gold-500 transition-opacity hover:text-gold-400"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {copied ? (
            <path d="M5 12l5 5 9-11" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </>
          )}
        </svg>
      </button>
      <span
        className={`text-[10px] uppercase tracking-widest text-gold-500 transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {UI.copied[locale]}
      </span>
    </div>
  );
}
