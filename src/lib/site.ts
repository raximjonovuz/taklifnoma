/**
 * Sayt sozlamalari.
 *
 * ── Telegram ───────────────────────────────────────────────────────────────
 * Hozircha javoblar to'g'ridan-to'g'ri Telegram chat ochish (deep link)
 * orqali yuboriladi: t.me/<username>?text=...
 *
 * Keyinchalik bot ulanadi. Ulanish uchun `TELEGRAM_BOT` ni to'ldiring va
 * `sendRsvp()` ichidagi `fetch` blokini yoqish yetarli (server/API kerak,
 * chunki bot tokeni mijozga chiqmasligi kerak).
 */
export const TELEGRAM_BOT = {
  /** Bot yoki oddiy username — deep link uchun */
  username: "taklifnoma_uz_bot",
  /** Bot tokeni — FAQAT serverda ishlatiladi, mijozga chiqmaydi */
  token: "",
  /** Xabarlar yuboriladigan kanal/guruh id */
  chatId: "",
  /** Bot API (serverda ishlatiladi) */
  api: (token: string) => `https://api.telegram.org/bot${token}/sendMessage`,
};

/** Sayt domeni — subdomen tekshiruvi uchun */
export const BASE_DOMAIN = "taklifnoma.raximjonov.uz";

export const SITE_NAME = "Taklifnoma";

/** Landing sahifasi kontaktlari */
export const CONTACT = {
  phone: "+998901234567",
  telegram: TELEGRAM_BOT.username,
};

/** Bo'limlar: home | search | contact */
export const VIEWS = ["home", "search", "contact"] as const;
export type View = (typeof VIEWS)[number];

export function telegramLink(username: string, text?: string): string {
  const user = username.replace(/^@/, "").trim();
  const base = `https://t.me/${encodeURIComponent(user)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telegramShareLink(url: string, text: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

/** "aliy.validu.taklifnoma.raximjonov.uz" -> "aliy.validu" */
export function subdomainOf(host: string): string | null {
  const h = host.toLowerCase().split(":")[0];
  if (!h.endsWith(`.${BASE_DOMAIN}`)) return null;
  const sub = h.slice(0, -(BASE_DOMAIN.length + 1)).split(".").pop();
  if (!sub || sub === "www") return null;
  return sub;
}

export function isApexHost(host: string): boolean {
  const h = host.toLowerCase().split(":")[0];
  return h === BASE_DOMAIN || h === `www.${BASE_DOMAIN}`;
}

/** Taklifnoma havolasi (statik eksport: yo'l asosida) */
export function inviteUrl(slug: string): string {
  return `https://${BASE_DOMAIN}/${slug}/`;
}