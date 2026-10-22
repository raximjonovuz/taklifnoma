"use client";

import { useEffect, useRef } from "react";
import { REDUCED, pointer } from "@/lib/fx";

type Petal = {
  x: number;
  y: number;
  s: number;
  a: number;
  va: number;
  vy: number;
  vx: number;
  sway: number;
  phase: number;
  o: number;
  c: string;
};

const COLORS = [
  "rgba(235,217,174,",
  "rgba(243,227,182,",
  "rgba(228,207,198,",
  "rgba(214,183,150,",
  "rgba(255,250,240,",
];

/** Kursordan qochadigan gul barglari */
export default function Petals({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled || REDUCED) return;
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let items: Petal[] = [];
    let raf = 0;

    const seed = (): Petal => {
      const size = (5 + Math.random() * 10) * dpr;
      return {
        x: Math.random() * w,
        y: Math.random() * h - h,
        s: size,
        a: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.02,
        vy: (0.25 + Math.random() * 0.55) * dpr,
        vx: 0,
        sway: 0.5 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        o: 0.32 + Math.random() * 0.55,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = window.innerWidth * dpr;
      h = cv.height = window.innerHeight * dpr;
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
      items = Array.from(
        { length: window.innerWidth < 640 ? 16 : 30 },
        seed,
      );
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, w, h);
      const mx = pointer.x * dpr;
      const my = pointer.y * dpr;
      const R = 140 * dpr;
      for (const p of items) {
        if (pointer.active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0) {
            const f = (1 - d / R) * 1.6 * dpr;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f * 0.4;
          }
        }
        p.vx *= 0.92;
        p.x += p.vx + Math.sin(ts / 1400 + p.phase) * p.sway * dpr * 0.35;
        p.y += p.vy;
        p.vy += ((0.25 + p.sway * 0.3) * dpr - p.vy) * 0.03;
        p.a += p.va + p.vx * 0.01;
        if (p.y > h + 40 || p.x < -60 || p.x > w + 60) {
          Object.assign(p, seed(), { y: -30, x: Math.random() * w });
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.beginPath();
        ctx.moveTo(0, -p.s / 2);
        ctx.bezierCurveTo(
          p.s * 0.6,
          -p.s * 0.3,
          p.s * 0.5,
          p.s * 0.45,
          0,
          p.s / 2,
        );
        ctx.bezierCurveTo(
          -p.s * 0.5,
          p.s * 0.45,
          -p.s * 0.6,
          -p.s * 0.3,
          0,
          -p.s / 2,
        );
        ctx.fillStyle = p.c + p.o + ")";
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled || REDUCED) return null;

  return <canvas className="petals" id="petals" ref={ref} aria-hidden />;
}