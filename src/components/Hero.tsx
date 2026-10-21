"use client";

import Image from "next/image";
import Ornament from "./Ornament";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";
import type { Couple } from "@/lib/types";

function formatDate(locale: string, iso: string) {
  const d = new Date(iso);
  return d
    .toLocaleDateString(
      locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" },
    )
    .toUpperCase();
}

export default function Hero({ couple }: { couple: Couple }) {
  const { locale } = useLocale();
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
        <Image
          src={couple.heroImage}
          alt="Hero"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso-300/30 via-espresso-300/40 to-espresso-300" />
        <div className="absolute inset-3 rounded-[6px] border border-gold-300/35 pointer-events-none" />
        <div className="absolute inset-5 rounded-[6px] border border-gold-300/15 pointer-events-none" />
        <svg
          className="absolute top-5 left-5 h-10 w-10 text-gold-200/70"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 16 V2 H16"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M8 8 Q 14 4, 20 8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute top-5 right-5 h-10 w-10 text-gold-200/70"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M38 16 V2 H24"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M32 8 Q 26 4, 20 8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-12 pt-20 text-ivory-50">
          <p className="eyebrow text-gold-200 anim-fade-up">
            {UI.invitationWord[locale]}
          </p>
          <Ornament className="mt-3 anim-fade-up anim-delay-1" />
          <h1 className="relative mt-6 text-center font-display anim-fade-up anim-delay-2">
            <span className="block text-[42px] leading-[1.05] font-medium">
              {couple.names.groomFull[locale]}
            </span>
            <span
              className="font-display italic gold-foil block my-3 text-[58px] leading-none"
              aria-hidden="true"
            >
              &amp;
            </span>
            <span className="block text-[42px] leading-[1.05] font-medium">
              {couple.names.brideFull[locale]}
            </span>
          </h1>

          <div className="mt-10 w-full anim-fade-up anim-delay-3">
            <div className="gold-rule-pair">
              <span className="eyebrow text-ivory-50/85 tracking-[0.4em]">
                {formatDate(locale, couple.date)}
              </span>
            </div>
            <div className="gold-rule-pair mt-3">
              <span className="font-display italic text-xl gold-foil">
                {couple.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
