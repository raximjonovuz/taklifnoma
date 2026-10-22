"use client";

import { useEffect, useRef, useState } from "react";
import { Use } from "@/components/Ornaments";
import { pad2 } from "@/lib/format";

type Props = {
  title: string;
  labels: { days: string; hours: string; mins: string; secs: string };
  doneText: string;
  target: number;
};

type Left = { d: number; h: number; m: number; s: number } | null;

/** To'ygacha qolgan vaqt (SSR da joy band, klientda to'ldiriladi) */
export default function Countdown({ title, labels, doneText, target }: Props) {
  const [left, setLeft] = useState<Left>(null);
  const [ready, setReady] = useState(false);
  const prev = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = target - Date.now();
      setReady(true);
      if (diff <= 0) {
        setLeft(null);
        return;
      }
      const s = Math.floor(diff / 1000);
      setLeft({
        d: Math.floor(s / 86400),
        h: Math.floor(s / 3600) % 24,
        m: Math.floor(s / 60) % 60,
        s: s % 60,
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  // Raqam o'zgarganda kichik "tick" animatsiyasi
  useEffect(() => {
    if (!left) return;
    const cells = document.querySelectorAll<HTMLElement>(".count__cell");
    const vals = [String(left.d), pad2(left.h), pad2(left.m), pad2(left.s)];
    cells.forEach((cell, i) => {
      if (prev.current[i] === vals[i]) return;
      prev.current[i] = vals[i];
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      cell.classList.remove("tick");
      void cell.offsetWidth;
      cell.classList.add("tick");
    });
  }, [left]);

  if (!target) return null;

  const showDone = ready && left === null;

  return (
    <section className="section section--paper" id="countdown">
      <div className="wrap">
        <header className="head reveal" data-anim="fade-up">
          <Use id="ic-clock" className="orn orn--icon" />
          <h2 className="head__title">{title}</h2>
        </header>

        {showDone ? (
          <p className="count__done">{doneText}</p>
        ) : (
          <div className="count" id="countBox">
            {(
              [
                [left ? left.d : 0, labels.days, "0ms"],
                [left ? left.h : 0, labels.hours, "90ms"],
                [left ? left.m : 0, labels.mins, "180ms"],
                [left ? left.s : 0, labels.secs, "270ms"],
              ] as const
            ).map(([value, label, delay], i) => (
              <div
                key={label}
                className="count__cell tilt reveal"
                data-tilt={8}
                data-anim="fade-up"
                style={{ "--d": delay } as React.CSSProperties}
              >
                <b>{i === 0 ? String(value) : pad2(value)}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}