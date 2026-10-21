import type { Locale } from "./types";

export const UI = {
  invitationWord: {
    uz: "Taklifnoma",
    ru: "Приглашение",
    en: "Invitation",
  } satisfies Record<Locale, string>,
  dearGuest: {
    uz: "Hurmatli",
    ru: "Дорогой",
    en: "Dear",
  },
  defaultGuest: {
    uz: "Aziz mehmon",
    ru: "Уважаемый гость",
    en: "Dear guest",
  },
  youAreInvited: {
    uz: "Sizni quvontirib, to'yimizga taklif qilamiz",
    ru: "С радостью приглашаем вас на нашу свадьбу",
    en: "With joy, we invite you to our wedding",
  },
  countdownTitle: {
    uz: "To'ygacha qolgan vaqt",
    ru: "До свадьбы осталось",
    en: "Countdown to the wedding",
  },
  days: { uz: "kun", ru: "дней", en: "days" },
  hours: { uz: "soat", ru: "часов", en: "hours" },
  minutes: { uz: "daqiqa", ru: "минут", en: "minutes" },
  seconds: { uz: "soniya", ru: "секунд", en: "seconds" },
  locationTitle: {
    uz: "Manzil",
    ru: "Адрес",
    en: "Location",
  },
  googleMaps: {
    uz: "Google Maps",
    ru: "Google Maps",
    en: "Google Maps",
  },
  yandexMaps: {
    uz: "Yandex Maps",
    ru: "Яндекс Карты",
    en: "Yandex Maps",
  },
  contactsTitle: {
    uz: "Aloqa",
    ru: "Контакты",
    en: "Contacts",
  },
  openEnvelope: {
    uz: "Konvertni oching",
    ru: "Открыть приглашение",
    en: "Open the invitation",
  },
  envelopeHint: {
    uz: "Bosing",
    ru: "Нажмите",
    en: "Tap",
  },
  tapToOpen: {
    uz: "Xat o'qish uchun bosing",
    ru: "Нажмите, чтобы открыть письмо",
    en: "Tap to open the letter",
  },
  openSeal: {
    uz: "Muhrdan ochish",
    ru: "Открыть печать",
    en: "Break the seal",
  },
  sealCaption: {
    uz: "Ochish uchun bosing",
    ru: "Нажмите, чтобы открыть",
    en: "Tap to open",
  },
  verseCaption: {
    uz: "Iqtibos",
    ru: "Цитата",
    en: "Verse",
  },
  copyNumber: {
    uz: "Nusxa olish",
    ru: "Скопировать",
    en: "Copy",
  },
  copied: {
    uz: "Nusxalandi",
    ru: "Скопировано",
    en: "Copied",
  },
  preload: {
    uz: "Yuklanmoqda...",
    ru: "Загрузка...",
    en: "Loading...",
  },
  poweredBy: {
    uz: "tomonidan tayyorlandi",
    ru: "создано с любовью",
    en: "crafted with love",
  },
  familiesLabel: {
    uz: "Oilaning baxtli kunida sizni ko'rib quvonamiz",
    ru: "Будем рады видеть вас в наш счастливый день",
    en: "We would be happy to see you on our joyful day",
  },
  musicOn: { uz: "Musiqa", ru: "Музыка", en: "Music" },
  musicOff: { uz: "Musiqa yoqish", ru: "Вкл. музыку", en: "Play music" },
} satisfies Record<string, Record<Locale, string>>;

export type UiKey = keyof typeof UI;

export const LOCALE_LABEL: Record<Locale, string> = {
  uz: "O'zbek",
  ru: "Русский",
  en: "English",
};

export const LOCALE_FLAG: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};
