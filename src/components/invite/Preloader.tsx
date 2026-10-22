"use client";

import { useEffect, useState } from "react";

/** Aylanuvchi halqa + progress (konvertdan oldin) */
export default function Preloader({
  monogram,
  onDone,
}: {
  monogram: string;
  onDone: () => void;
}) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = window.setInterval(() => {
      p = Math.min(88, p + 6 + Math.random() * 10);
      setPct(p);
    }, 120);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(tick);
      setPct(100);
      window.setTimeout(() => setHidden(true), 420);
      window.setTimeout(onDone, 1100);
    };

    // Rasmlar yuklanishini kutamiz (maksimal ~2.2 s)
    const pending = Array.from(document.images).filter((i) => !i.complete);
    if (!pending.length) finish();
    else {
      let left = pending.length;
      const one = () => {
        if (--left <= 0) finish();
      };
      pending.forEach((i) => {
        i.addEventListener("load", one, { once: true });
        i.addEventListener("error", one, { once: true });
      });
    }
    const guard = window.setTimeout(finish, 2200);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(guard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`preloader${hidden ? " is-done" : ""}`}
      aria-hidden={hidden}
      role="status"
      aria-live="polite"
    >
      <div className="preloader__ring">
        <i />
        <i />
      </div>
      <div className="preloader__mono">{monogram}</div>
      <div className="preloader__bar">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}