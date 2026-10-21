"use client";

import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import { formatWeddingDate } from "@/lib/dateFormat";
import type { Couple } from "@/lib/types";

export default function Details({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  const parts = formatWeddingDate(couple.date, locale);
  const g = `https://www.google.com/maps/search/?api=1&query=${couple.venueLat},${couple.venueLng}`;
  const y = `https://yandex.uz/maps/?text=${couple.venueLat},${couple.venueLng}&z=17`;

  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <p className="eyebrow">{UI.detailsTitle[locale]}</p>
      <h2 className="font-display mt-3 text-3xl text-ink-primary">
        {UI.whenAndWhereTitle[locale]}
      </h2>
      <Ornament className="mt-6" />

      <div className="mt-12 flex flex-col items-center">
        <span className="font-display leading-none text-[88px] text-ink-primary">
          {parts.day}
        </span>
        <span className="font-display mt-3 text-xl uppercase tracking-[0.18em] text-gold-600">
          {parts.month}
        </span>
        <span className="font-display mt-1 text-2xl text-ink-primary">
          {parts.year}
        </span>
        <span className="eyebrow mt-4 text-ink-muted">
          {parts.weekday}
        </span>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <span className="font-display text-[60px] leading-none gold-foil">
          {couple.time}
        </span>
        <p className="mt-4 text-sm text-charcoal-soft">
          <span className="eyebrow mr-2 text-ink-muted">
            {UI.gatheringLabel[locale]}
          </span>
          <span className="font-mono text-[13px] tracking-widest text-ink-primary">
            {couple.gatheringTime}
          </span>
        </p>
      </div>

      <Ornament className="mt-12" />

      <div className="mt-8 flex flex-col items-center">
        <p className="font-display text-2xl text-ink-primary">
          {couple.venue[locale]}
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-charcoal-soft">
          {couple.address[locale]}
        </p>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        <Pill href={g} label={UI.googleMaps[locale]} />
        <Pill href={y} label={UI.yandexMaps[locale]} />
      </div>

      <div className="relative mt-12 w-full overflow-hidden rounded-[14px] border border-gold-300/45 bg-ivory-200/70 px-6 py-7 text-left shadow-soft">
        <span
          className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.35),transparent_70%)]"
          aria-hidden="true"
        />
        <p className="eyebrow">{UI.dressCodeTitle[locale]}</p>
        <p className="font-display mt-3 text-2xl italic text-ink-primary">
          {couple.dressCode[locale]}
        </p>
      </div>

      <div
        className="mt-12 flex flex-col items-center text-charcoal-soft"
        aria-hidden="true"
      >
        <p className="font-mono text-[11px] tracking-[0.4em] text-ink-muted">
          {UI.reviewCta[locale]}
        </p>
        <svg
          viewBox="0 0 24 24"
          className="mt-3 h-5 w-5 animate-bounce text-gold-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </Reveal>
  );
}

function Pill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-gold-300 bg-ivory-50/60 px-3 py-3 text-[13px] text-charcoal transition-all duration-500 ease-out hover:border-gold-400 hover:bg-espresso-100 hover:text-gold-300"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] stroke-gold-400 group-hover:stroke-gold-300 transition-colors"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
