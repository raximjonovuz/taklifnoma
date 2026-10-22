/**
 * MA'LUMOT QATLAMI.
 * Hozir lokal (statik eksport). Keyinchalik serverga o'tkazish uchun
 * faqat shu faylni almashtirish yetarli: `getCouple` / `coupleIndex`
 * serverdan keladigan ma'lumotni qaytaradi, komponentlar o'zgarmaydi.
 *
 * `couples.json` — sluglar ro'yxati (shundan `public/boot.js` generatsiya
 * qilinadi). Bu yerda ro'yxat bilan moduli mos kelmasa, build xato beradi.
 */
import demo from "./demo";
import slugs from "../../couples.json";
import type { Couple, CoupleData, CoupleIndexItem } from "@/lib/types";

const sources: Record<string, CoupleData> = {
  "Ozodbek": demo,
};

const fromJson = slugs as string[];

const missing = fromJson.filter((s) => !sources[s]);
const extra = Object.keys(sources).filter((s) => !fromJson.includes(s));
if (missing.length || extra.length) {
  throw new Error(
    `couples.json va src/couples mos kelmadi. ` +
      (missing.length ? `Yo'q modul: ${missing.join(", ")}. ` : "") +
      (extra.length ? `Ro'yxatda yo'q: ${extra.join(", ")}.` : ""),
  );
}

/** slug -> ma'lumot */
export const couples: Record<string, Couple> = Object.fromEntries(
  Object.entries(sources).map(([slug, data]) => [slug, { ...data, slug }]),
);

export const coupleSlugs: string[] = Object.keys(couples);

export function getCouple(slug: string): Couple | undefined {
  return couples[slug];
}

/** Qidiruv uchun yengil indeks (barcha juftliklar nomlari) */
export const coupleIndex: CoupleIndexItem[] = coupleSlugs.map((slug) => {
  const c = couples[slug];
  return {
    slug,
    groom: c.couple.groom,
    bride: c.couple.bride,
    date: c.event.date,
    monogram: c.couple.monogram,
  };
});

export function isKnownSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(couples, slug);
}