"use client";

import type { CSSProperties } from "react";
import { Divider, Use } from "@/components/Ornaments";
import Petals from "@/components/fx/Petals";

/** Harfma-harf chiqish (blurdan oltin shimmer'ga) */
export function SplitText({
  text,
  base = 0,
}: {
  text: string;
  base?: number;
}) {
  return (
    <span className="split script" style={{ "--base": `${base}ms` } as CSSProperties}>
      {[...text].map((ch, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

type Props = {
  hello: string;
  invited: string;
  groom: string;
  bride: string;
  date: string;
  time: string;
  heroImage?: string;
  scrollLabel: string;
  petals?: boolean;
};

export default function Hero({
  hello,
  invited,
  groom,
  bride,
  date,
  time,
  heroImage,
  scrollLabel,
  petals = true,
}: Props) {
  return (
    <section className="hero" id="hero">
      {/* Barglar hero ichida — matn ostida qoladi */}
      {petals ? <Petals /> : null}
      <div
        className="hero__media plx"
        style={{ "--p": -18 } as CSSProperties}
      >
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="hero__veil" />
      <div className="hero__grain" />

      <div
        className="hero__frame plx"
        style={{ "--p": 8 } as CSSProperties}
        aria-hidden
      >
        <Use id="orn-corner" className="hero__corner hero__corner--tl" />
        <Use id="orn-corner" className="hero__corner hero__corner--tr" />
        <Use id="orn-corner" className="hero__corner hero__corner--bl" />
        <Use id="orn-corner" className="hero__corner hero__corner--br" />
      </div>

      <div
        className="hero__content plx"
        style={{ "--p": 14 } as CSSProperties}
      >
        <p className="hero__hello reveal" data-anim="fade-down">
          {hello}
        </p>
        <Divider draw className="reveal" />
        <p className="hero__eyebrow reveal" data-anim="fade-up">
          {invited}
        </p>

        <h1 className="hero__names">
          <SplitText text={groom} base={300} />
          {groom && bride ? (
            <span className="amp reveal" data-anim="zoom" aria-hidden>
              &amp;
            </span>
          ) : null}
          {bride ? (
            <SplitText
              text={bride}
              base={300 + groom.length * 70 + 200}
            />
          ) : null}
        </h1>

        <div className="hero__meta reveal" data-anim="fade-up">
          <span>{date}</span>
          <i aria-hidden />
          <span>{time}</span>
        </div>

        <a className="scroll-cue reveal" data-anim="fade" href="#letter">
          <span>{scrollLabel}</span>
          <span className="scroll-cue__mouse">
            <i />
          </span>
        </a>
      </div>
    </section>
  );
}