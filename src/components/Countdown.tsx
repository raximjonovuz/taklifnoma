"use client";

import { useEffect, useState } from "react";
import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const EMPTY: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: true,
};

function calcTimeLeft(dateISO: string, now: number): TimeLeft {
  const target = new Date(`${dateISO}T00:00:00`).getTime();
  const diff = target - now;
  if (diff <= 0) return EMPTY;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    done: false,
  };
}

export default function Countdown({ dateISO }: { dateISO: string }) {
  const { locale } = useLocale();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now === null ? EMPTY : calcTimeLeft(dateISO, now);

  return (
    <Reveal className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center">
      <Ornament />
      <h2 className="font-display mt-6 text-2xl text-charcoal">
        {UI.countdownTitle[locale]}
      </h2>
      <div className="mt-10 grid w-full grid-cols-4 gap-3">
        <Cell label={UI.days[locale]} value={time.days} />
        <Cell label={UI.hours[locale]} value={time.hours} />
        <Cell label={UI.minutes[locale]} value={time.minutes} />
        <Cell label={UI.seconds[locale]} value={time.seconds} />
      </div>
    </Reveal>
  );
}

function Cell({ label, value }: { label: string; value: number }) {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-[40px_40px_8px_8px] border border-gold-300/40 bg-ivory-50/55 backdrop-blur-[2px] py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]">
      <span className="font-display text-3xl leading-none text-charcoal tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="eyebrow mt-2 text-[9px] tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
}
