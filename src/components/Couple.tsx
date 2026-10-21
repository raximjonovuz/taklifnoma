"use client";

import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

export default function CoupleSection({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <Ornament />
      <div className="mt-10 w-full space-y-12">
        <div>
          <p className="font-display text-3xl text-charcoal">
            {couple.names.groomFull[locale]}
          </p>
          <p className="eyebrow mt-3">{couple.names.groomFamily[locale]}</p>
        </div>
        <p
          className="font-display italic gold-foil text-5xl leading-none"
          aria-hidden="true"
        >
          &amp;
        </p>
        <div>
          <p className="font-display text-3xl text-charcoal">
            {couple.names.brideFull[locale]}
          </p>
          <p className="eyebrow mt-3">{couple.names.brideFamily[locale]}</p>
        </div>
      </div>
      <Ornament className="mt-12" />
      <p className="mt-6 max-w-xs text-sm leading-relaxed text-charcoal-soft">
        {UI.familiesLabel[locale]}
      </p>
    </Reveal>
  );
}
