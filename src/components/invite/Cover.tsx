"use client";

import { useEffect, useRef } from "react";
import { Divider } from "@/components/Ornaments";

const STARS = [
  { x: "12%", y: "18%", s: "14px", t: "0s" },
  { x: "86%", y: "22%", s: "10px", t: ".7s" },
  { x: "76%", y: "78%", s: "16px", t: "1.4s" },
  { x: "18%", y: "76%", s: "9px", t: "2.1s" },
  { x: "50%", y: "8%", s: "11px", t: "1s" },
] as const;

export type CoverStage = "idle" | "opening" | "morph" | "fade";

type Props = {
  names: string;
  date: string;
  monogram: string;
  eyebrow: string;
  hint: string;
  openLabel: string;
  stage: CoverStage;
  onOpen: () => void;
};

/** 3D konvert + oltin muhr — ochilish ekrani */
export default function Cover({
  names,
  date,
  monogram,
  eyebrow,
  hint,
  openLabel,
  stage,
  onOpen,
}: Props) {
  const card = useRef<HTMLDivElement>(null);

  /**
   * Xat ekranni to'liq qoplashi uchun kerakli masshtab.
   * getBoundingClientRect allaqachon `scale(1.08)` ni hisobga oladi,
   * shuning uchun qo'shimcha kattaytirish shu o'lchamga nisbatan.
   */
  useEffect(() => {
    if (stage !== "morph") return;
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const scale =
      Math.max(window.innerWidth / r.width, window.innerHeight / r.height) *
      1.06;
    el.style.setProperty("--morph", scale.toFixed(3));
  }, [stage]);

  return (
    <div
      /* `is-opening` barcha keyingi bosqichlarda ham saqlanadi —
         shunda muhr, qopqoq va xat holati bir yo'nalishda o'zgaradi */
      className={`cover is-${stage}${stage === "idle" ? "" : " is-opening"}`}
      aria-hidden={stage !== "idle"}
    >
      <div className="cover__bg">
        <span className="cover__blob cover__blob--a" />
        <span className="cover__blob cover__blob--b" />
        <span className="cover__blob cover__blob--c" />
      </div>

      <div className="cover__stars" aria-hidden>
        {STARS.map((s) => (
          <svg
            key={`${s.x}-${s.y}`}
            className="star"
            style={
              {
                "--x": s.x,
                "--y": s.y,
                "--s": s.s,
                "--t": s.t,
              } as React.CSSProperties
            }
          >
            <use href="#orn-star" />
          </svg>
        ))}
      </div>

      <div className="cover__inner">
        <div className="envelope" data-tilt={10}>
          <div className="envelope__back" />
          <div
            className="envelope__card"
            ref={card}
            style={{ "--morph": 3 } as React.CSSProperties}
          >
            <Divider sm />
            <p className="cover__eyebrow">{eyebrow}</p>
            <h1 className="cover__names script">{names}</h1>
            <p className="cover__date">{date}</p>
            <Divider sm />
          </div>
          <div className="envelope__front">
            <span className="envelope__sheen" />
            {/* Yopiq holatda konvertning o'zida matn ko'rinadi */}
            <div className="envelope__label" aria-hidden>
              <h2 className="cover__names script">{names}</h2>
              <p className="cover__date">{date}</p>
            </div>
          </div>
          <div className="envelope__flap" />
          <button
            className="seal"
            type="button"
            onClick={onOpen}
            aria-label={openLabel}
          >
            <span className="seal__ring" />
            <span className="seal__mono">{monogram}</span>
          </button>
        </div>

        <p className="cover__hint">{hint}</p>
        <button
          className="btn btn--ghost btn--light cover__open magnet"
          type="button"
          onClick={onOpen}
        >
          <span>{openLabel}</span>
        </button>
      </div>
    </div>
  );
}