"use client";

import { useSearchParams } from "next/navigation";
import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

export default function Invitation({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const m = searchParams?.get("m")?.trim() ?? "";

  const guestLabel = m
    ? `${UI.dearGuest[locale]}, ${m}`
    : UI.defaultGuest[locale];

  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <p className="eyebrow">{UI.dearGuest[locale]}</p>
      <p className="font-display mt-4 text-4xl leading-tight text-charcoal">
        {guestLabel}
      </p>
      <Ornament className="mt-6" />
      <p className="mt-8 max-w-md text-base leading-relaxed text-charcoal-soft">
        {couple.greeting[locale]}
      </p>

      <figure className="mt-12 w-full rounded-sm border border-gold-300/30 bg-gold-50/60 px-6 py-7 shadow-soft">
        <span
          className="font-display gold-foil block text-5xl leading-none"
          aria-hidden="true"
        >
          “
        </span>
        <figcaption className="mt-2 text-[15px] italic leading-relaxed text-charcoal">
          {couple.verse[locale]}
        </figcaption>
        <div className="mt-4 divider-ornament mx-auto" />
        <p className="mt-2 eyebrow">{UI.verseCaption[locale]}</p>
      </figure>
    </Reveal>
  );
}
