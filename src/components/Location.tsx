"use client";

import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

export default function Location({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  const g = `https://www.google.com/maps/search/?api=1&query=${couple.venueLat},${couple.venueLng}`;
  const y = `https://yandex.uz/maps/?text=${couple.venueLat},${couple.venueLng}&z=17`;

  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <Ornament />
      <h2 className="font-display mt-6 text-2xl text-charcoal">
        {UI.locationTitle[locale]}
      </h2>
      <p className="font-display mt-6 text-2xl text-charcoal">
        {couple.venue[locale]}
      </p>
      <p className="mt-2 text-sm text-charcoal-soft">
        {couple.address[locale]}
      </p>
      <div className="mt-10 grid w-full grid-cols-2 gap-3">
        <Pill href={g} label={UI.googleMaps[locale]} />
        <Pill href={y} label={UI.yandexMaps[locale]} />
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
