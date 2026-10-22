"use client";

/**
 * DOM-darajasidagi effektlar. Manba (js/app.js) mantig'ining to'g'ri
 * ko'chishi — React holati emas, data-atributlar orqali boshqariladi,
 * shuning uchun bundle kichik va qayta-render animatsiyalarni buzmaydi.
 *
 * ishga tushirish:  initFx()  — bir marta (barcha effektlar)
 *                 refreshFx() — til almashgandan keyin (DOM yangilangan)
 */

export const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const FINE =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

/** Sichqoncha / teginish holati (boshqa modullar ham foydalanadi) */
export const pointer = { x: 0, y: 0, nx: 0, ny: 0, active: false };

/**
 * Maxsus kursor faqat haqiqiy sichqoncha qurilmasida yoqiladi.
 * `pointer: fine` yetarli emas (touchscreen laptop), shuning uchun
 * birinchi sichqoncha harakati ham qabul qilinadi.
 */
let mouseSeen = false;
const cursorListeners = new Set<() => void>();

export function subscribeCursor(cb: () => void): () => void {
  cursorListeners.add(cb);
  return () => {
    cursorListeners.delete(cb);
  };
}

export function getCursorSnapshot(): boolean {
  return mouseSeen || FINE;
}

function enableMouse() {
  if (mouseSeen) return;
  mouseSeen = true;
  document.body.classList.add("has-mouse");
  cursorListeners.forEach((cb) => cb());
}

const root = () => document.documentElement;
const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let booted = false;
let io: IntersectionObserver | null = null;
let parallaxImgs: HTMLElement[] = [];
let cursorLoop = 0;
let sparkleLoop = 0;

/* ─────────────── Sichqoncha: parallax + nur ─────────────── */
function initPointer() {
  const set = (x: number, y: number) => {
    pointer.x = x;
    pointer.y = y;
    pointer.nx = (x / window.innerWidth - 0.5) * 2;
    pointer.ny = (y / window.innerHeight - 0.5) * 2;
    const r = root();
    r.style.setProperty("--mx", pointer.nx.toFixed(3));
    r.style.setProperty("--my", pointer.ny.toFixed(3));
    const glow = document.getElementById("glow");
    if (glow) {
      glow.style.setProperty("--gx", `${x}px`);
      glow.style.setProperty("--gy", `${y}px`);
    }
    if (!pointer.active && window.matchMedia("(pointer: fine)").matches) {
      pointer.active = true;
    }
    enableMouse();
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "mouse") set(e.clientX, e.clientY);
    },
    { passive: true },
  );

  // Sichqoncha birinchi marta bosinganda ham aniqlansin
  window.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse") enableMouse();
    },
    { passive: true },
  );

  // Mobil: teginish bilan yengil parallax
  window.addEventListener(
    "touchmove",
    (e) => {
      const p = e.touches[0];
      if (!p) return;
      const k = (p.clientX / window.innerWidth - 0.5) * 2;
      root().style.setProperty("--mx", (k * 0.5).toFixed(3));
    },
    { passive: true },
  );

  // Telefon qiyalganda (gyroskop)
  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma == null || pointer.active || reduced()) return;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v / 30));
      root().style.setProperty("--mx", clamp(e.gamma).toFixed(3));
      root().style.setProperty("--my", clamp((e.beta ?? 45) - 45).toFixed(3));
    },
    { passive: true },
  );

  window.addEventListener("pointerdown", () =>
    document.body.classList.add("is-down"),
  );
  window.addEventListener("pointerup", () =>
    document.body.classList.remove("is-down"),
  );
  document.addEventListener("pointerover", (e) => {
    const el = e.target as HTMLElement | null;
    document.body.classList.toggle(
      "is-hover",
      !!el?.closest("a,button,input,textarea,label,select,.tilt"),
    );
  });
}

/* ─────────────── Maxsus kursor (nuqta + kechikadigan halqa) ─────────────── */
function initCursor() {
  // StrictMode'da effekt 2 marta ishga tushadi — loop allaqachon yurayotgan
  // bo'lsa, qayta boshlash kerak emas (lekin to'xtatilgan bo'lsa — ha).
  if (cursorLoop) return;
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  // Kursor joriy nuqtadan boshlanadi (markazdan "uchib" kelmasin)
  let cx = pointer.active ? pointer.x : window.innerWidth / 2;
  let cy = pointer.active ? pointer.y : window.innerHeight / 2;
  let rx = cx;
  let ry = cy;
  dot.style.setProperty("--cx", `${cx}px`);
  dot.style.setProperty("--cy", `${cy}px`);
  ring.style.setProperty("--rx", `${rx}px`);
  ring.style.setProperty("--ry", `${ry}px`);

  const loop = () => {
    cx = lerp(cx, pointer.x, 0.55);
    cy = lerp(cy, pointer.y, 0.55);
    rx = lerp(rx, pointer.x, 0.16);
    ry = lerp(ry, pointer.y, 0.16);
    dot.style.setProperty("--cx", `${cx}px`);
    dot.style.setProperty("--cy", `${cy}px`);
    ring.style.setProperty("--rx", `${rx}px`);
    ring.style.setProperty("--ry", `${ry}px`);
    cursorLoop = requestAnimationFrame(loop);
  };
  cursorLoop = requestAnimationFrame(loop);

  document.addEventListener("mouseleave", () => (ring.style.opacity = "0"));
  document.addEventListener("mouseenter", () => (ring.style.opacity = "1"));
}

/* ─────────────── Oltin uchqunlar (kursor izi) ─────────────── */
function initSparkles() {
  if (sparkleLoop) return;
  const cv = document.getElementById("fx") as HTMLCanvasElement | null;
  if (!cv) return;
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let parts: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    s: number;
    hue: number;
    spin: number;
  }[] = [];
  let last = 0;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.width = window.innerWidth * dpr;
    h = cv.height = window.innerHeight * dpr;
    cv.style.width = `${window.innerWidth}px`;
    cv.style.height = `${window.innerHeight}px`;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      for (let i = 0; i < 2; i++) {
        parts.push({
          x: e.clientX * dpr,
          y: e.clientY * dpr,
          vx: (Math.random() - 0.5) * 1.4 * dpr,
          vy: (Math.random() * -0.8 - 0.2) * dpr,
          life: 1,
          s: (1 + Math.random() * 2.2) * dpr,
          hue: 40 + Math.random() * 10,
          spin: Math.random() * Math.PI,
        });
      }
      if (parts.length > 160) parts.splice(0, parts.length - 160);
    },
    { passive: true },
  );

  const star = (x: number, y: number, r: number, a: number) => {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rr = i % 2 ? r * 0.38 : r;
      const an = a + (i * Math.PI) / 4;
      ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr);
    }
    ctx.closePath();
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    parts = parts.filter((p) => p.life > 0);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02 * dpr;
      p.life -= 0.022;
      p.spin += 0.05;
      ctx.fillStyle = `hsla(${p.hue},70%,${60 + p.life * 30}%,${p.life})`;
      ctx.shadowColor = "rgba(243,227,182,.9)";
      ctx.shadowBlur = 6 * dpr;
      star(p.x, p.y, p.s * (1.6 - p.life), p.spin);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    sparkleLoop = requestAnimationFrame(draw);
  };
  sparkleLoop = requestAnimationFrame(draw);
}

/* ─────────────── 3D tilt + magnet tugmalar ─────────────── */
function initTilt() {
  if (reduced() || !window.matchMedia("(pointer: fine)").matches) return;

  document.addEventListener("pointermove", (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
      "[data-tilt]",
    );
    if (el) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const max = Number(el.dataset.tilt || 6);
      el.classList.add("is-tilting");
      el.style.setProperty("--ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      return;
    }
    const m = (e.target as HTMLElement | null)?.closest<HTMLElement>(
      "[data-magnet]",
    );
    if (m) {
      const r = m.getBoundingClientRect();
      m.style.setProperty(
        "--tx",
        `${((e.clientX - r.left - r.width / 2) * 0.28).toFixed(1)}px`,
      );
      m.style.setProperty(
        "--ty",
        `${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`,
      );
    }
  });

  document.addEventListener("pointerout", (e) => {
    const el = e.target as HTMLElement | null;
    const t = el?.closest<HTMLElement>("[data-tilt]");
    if (t && !t.contains(e.relatedTarget as Node | null)) {
      t.classList.remove("is-tilting");
      t.style.setProperty("--rx", "0deg");
      t.style.setProperty("--ry", "0deg");
    }
    const m = el?.closest<HTMLElement>("[data-magnet]");
    if (m && !m.contains(e.relatedTarget as Node | null)) {
      m.style.setProperty("--tx", "0px");
      m.style.setProperty("--ty", "0px");
    }
  });
}

/* ─────────────── Scroll: reveal + progress + rasm parallax ─────────────── */
/** Sahifa konvert ochilguncha qorong'i qilinganmi? */
export function isLocked(): boolean {
  return (
    document.documentElement.classList.contains("is-locked") ||
    document.body.classList.contains("is-locked")
  );
}

function observeReveals() {
  io?.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        e.target.querySelectorAll(".orn--draw").forEach((o) =>
          o.classList.add("in"),
        );
        io?.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  document.querySelectorAll(".reveal, .split").forEach((el) => {
    // Hero konvert ochilguncha kutadi
    if (isLocked() && el.closest("#hero")) {
      return;
    }
    io?.observe(el);
  });
}

/** Hero bo'limini bosqichma-bosqich jonlantirish (konvert ochilgandan keyin) */
export function revealHero() {
  document.querySelectorAll("#hero .reveal, #hero .split").forEach((el, i) => {
    window.setTimeout(() => el.classList.add("in"), 120 + i * 90);
  });
}

function onScroll() {
  const r = document.documentElement;
  const top = r.scrollTop;
  const bar = document.querySelector<HTMLElement>(".progress span");
  if (bar) {
    bar.style.width = `${
      (top / Math.max(1, r.scrollHeight - r.clientHeight)) * 100
    }%`;
  }
  if (reduced()) return;
  const vh = window.innerHeight;
  for (const img of parallaxImgs) {
    const box = img.parentElement;
    if (!box) continue;
    const rect = box.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) continue;
    const k =
      (rect.top + rect.height / 2 - vh / 2) * Number(img.dataset.parallax || 0.1);
    img.style.transform = `translate3d(0,${k.toFixed(1)}px,0)`;
  }
}

/** Til almashgachon yangilangan DOM ni qayta kuzatish */
export function refreshFx() {
  parallaxImgs = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]"),
  );
  observeReveals();
  onScroll();
}

/* ─────────────── Boshlang'ich ─────────────── */
export function initFx() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  initPointer();
  initTilt();
  refreshFx();
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), {
    passive: true,
  });
}

/** Kursor + uchqunlar — komponent store orqali chaqiradi (StrictMode'ga xavfsiz) */
export function mountCursorFx(): void {
  initCursor();
  initSparkles();
}

export function stopCursorFx() {
  if (cursorLoop) cancelAnimationFrame(cursorLoop);
  cursorLoop = 0;
  if (sparkleLoop) cancelAnimationFrame(sparkleLoop);
  sparkleLoop = 0;
}