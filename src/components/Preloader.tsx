"use client";

import { useEffect, useState } from "react";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const { locale } = useLocale();
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 900);
    const t2 = setTimeout(() => onDone(), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ivory-50 transition-opacity duration-700 ${
        hiding ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={hiding}
    >
      <div className="text-center">
        <div className="relative mx-auto h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-gold-200 border-t-transparent" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-gold-300 border-b-transparent [animation-direction:reverse]" />
        </div>
        <p className="font-display mt-6 text-2xl gold-text anim-fade-up anim-delay-1">
          Taklifnoma
        </p>
        <p className="mt-2 text-sm tracking-widest text-charcoal-soft anim-fade-up anim-delay-2">
          {UI.preload[locale]}
        </p>
      </div>
    </div>
  );
}
