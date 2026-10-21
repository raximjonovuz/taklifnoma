"use client";

import { useState } from "react";
import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

export default function Contacts({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  const tg = couple.telegram.replace(/^@/, "");
  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <Ornament />
      <p className="eyebrow mt-6">{UI.contactsTitle[locale]}</p>
      <h2 className="font-display mt-3 text-3xl text-ink-primary">
        {UI.contactInviteTitle[locale]}
      </h2>

      <ul className="mt-12 w-full">
        {couple.phones.map((p, i) => (
          <li
            key={i}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5"
          >
            <span className="text-left">
              <span className="font-display text-lg text-ink-primary">
                {p.label}
              </span>
              {p.sublabel && (
                <span className="block eyebrow mt-1 text-ink-muted">
                  {p.sublabel}
                </span>
              )}
            </span>
            <span
              className="block h-px w-full border-b border-dashed border-gold-300/55"
              aria-hidden="true"
            />
            <CopyablePhone value={p.phone} />
          </li>
        ))}
        <li className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5">
          <span className="text-left font-display text-lg text-ink-primary">
            Telegram
          </span>
          <span
            className="block h-px w-full border-b border-dashed border-gold-300/55"
            aria-hidden="true"
          />
          <a
            href={`https://t.me/${tg}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[13px] tracking-widest text-gold-600 transition-colors hover:text-gold-500"
          >
            {couple.telegram}
          </a>
        </li>
      </ul>
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
    <div className="flex items-center justify-end gap-2">
      <span
        className={`text-[10px] uppercase tracking-widest text-gold-500 transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {UI.copied[locale]}
      </span>
      <a
        href={`tel:${value.replace(/\s+/g, "")}`}
        className="font-mono text-[13px] tracking-widest text-ink-primary hover:text-gold-600"
      >
        {value}
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={UI.copyNumber[locale]}
        className="text-gold-600 transition-opacity hover:text-gold-500"
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
    </div>
  );
}
