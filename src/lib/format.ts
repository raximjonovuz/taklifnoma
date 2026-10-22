import type { Lang, Localized } from "./types";
import { months } from "./dict";

/** "2026-11-15" -> Date (mahalliy vaqtda) */
export function parseDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** "5-noyabr, 2026" / "5 ноября 2026 г." / "November 5, 2026" */
export function formatDate(iso: string, lang: Lang): string {
  const d = parseDate(iso);
  if (!d) return iso;
  const day = d.getDate();
  const mon = months(lang)[d.getMonth()];
  const year = d.getFullYear();
  if (lang === "uz") return `${day}-${mon}, ${year}-yil`;
  if (lang === "ru") return `${day} ${mon} ${year} г.`;
  return `${mon} ${day}, ${year}`;
}

/** "05.11.2026" — konvert ustidagi qisqa ko'rinish */
export function formatDateShort(iso: string): string {
  const d = parseDate(iso);
  if (!d) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** To'y boshlanish vaqti (ms) */
export function targetTime(date: string, time: string, tzOffset = "+05:00"): number | null {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!iso) return null;
  const t = /^(\d{2}):(\d{2})/.exec(time || "");
  const [hh, mm] = t ? [t[1], t[2]] : ["19", "00"];
  const sign = tzOffset.startsWith("-") ? -1 : 1;
  const [oh, om] = tzOffset.slice(1).split(":").map(Number);
  const utc = Date.UTC(
    Number(iso[1]),
    Number(iso[2]) - 1,
    Number(iso[3]),
    Number(hh) - sign * (oh || 0),
    Number(mm) - sign * (om || 0),
  );
  return Number.isNaN(utc) ? null : utc;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

export function digits(raw?: string): string {
  return String(raw || "").replace(/\D/g, "");
}

/** "+998701744802" -> "+998 70 174 48 02" */
export function formatPhone(raw?: string): string {
  const d = digits(raw);
  if (d.length === 12 && d.startsWith("998")) {
    return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
  }
  return raw || "";
}

export function telHref(raw?: string): string {
  const d = digits(raw);
  return d ? `tel:+${d}` : "#";
}

/** Ismni qidirish uchun normalizatsiya: kichik harf, apostrof/bo'shliqsiz */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[''`ʼʻ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** "Ozodbek Madina" -> "ozodbek-madina" */
export function slugify(s: string): string {
  return normalize(s)
    .replace(/[^a-zа-я0-9ёўқҳғ\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function firstName(full: Localized, lang: Lang): string {
  const name = full[lang] || full.uz;
  return name.trim().split(/\s+/)[0] || name;
}