"use client";

import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

export default function Closing({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  const year = new Date(couple.date).getFullYear();
  const groomFirst = couple.names.groomFull[locale].split(" ")[0];
  const brideFirst = couple.names.brideFull[locale].split(" ")[0];
  const signature = `${groomFirst} & ${brideFirst}`;
  const yearText = UI.yearPromise[locale].replace("{year}", String(year));

  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 pb-20 pt-4 text-center">
      <div className="relative w-full overflow-hidden rounded-[14px] border border-gold-300/55 bg-gradient-to-br from-ivory-100 via-ivory-50 to-gold-100/60 px-8 py-12 shadow-card">
        <span
          className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.32),transparent_70%)]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(31,20,10,0.10),transparent_70%)]"
          aria-hidden="true"
        />

        <Ornament />
        <h2 className="font-display mt-6 text-4xl text-ink-primary">
          {UI.closingTitle[locale]}
        </h2>
        <p className="font-display mt-6 text-[17px] italic leading-relaxed text-charcoal">
          {UI.closingLine[locale]}
        </p>

        <div className="mt-10 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <p className="font-display mt-8 italic text-2xl gold-foil">
          {signature}
        </p>
        <p className="eyebrow mt-4 text-ink-muted">{yearText}</p>
      </div>
    </Reveal>
  );
}
