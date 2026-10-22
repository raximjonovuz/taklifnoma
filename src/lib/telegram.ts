"use client";

import type { Lang } from "./types";
import { TELEGRAM_BOT, telegramLink } from "./site";
import { DICT } from "./dict";

export type RsvpPayload = {
  name: string;
  attending: boolean;
  guests: number;
  message: string;
};

export type ContactPayload = {
  name: string;
  event: string;
  message: string;
};

/**
 * RSVP javobini Telegram xabariga aylantiradi.
 * Bot ulangan bo'lsa, `sendMessage` server orqali chaqiriladi;
 * hozircha to'g'ridan-to'g'ri chat ochish (deep link) ishlatiladi.
 */
export function buildRsvpText(
  p: RsvpPayload,
  lang: Lang,
  coupleLine: string,
): string {
  const t = DICT[lang];
  return [
    `Assalomu alaykum! ${coupleLine}`,
    `${t["rsvp.name"]}: ${p.name}`,
    `${t["rsvp.attending"]} ${p.attending ? "✅ " + t["rsvp.yes"] : "❌ " + t["rsvp.no"]}`,
    p.attending ? `${t["rsvp.guests"]}: ${p.guests}` : "",
    p.message ? `💬 ${p.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildContactText(p: ContactPayload, lang: Lang): string {
  const t = DICT[lang];
  return [
    `Salom! ${t["lp.contact.title"]}`,
    `${t["lp.contact.name"]}: ${p.name}`,
    p.event ? `${t["lp.contact.event"]}: ${p.event}` : "",
    p.message ? `💬 ${p.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Foydalanuvchining Telegramida xabar tayyorlab ochadi */
export function openTelegram(username: string, text: string): void {
  window.open(telegramLink(username, text), "_blank", "noopener");
}

export const BOT_USERNAME = TELEGRAM_BOT.username;