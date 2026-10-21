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

  // ─── Design-aligned strings ──────────────────────────────
  envelopeHeader: {
    uz: "TAKLIFNOMA · 2026",
    ru: "ПРИГЛАШЕНИЕ · 2026",
    en: "INVITATION · 2026",
  },
  swipeToContinue: {
    uz: "Davom etish uchun suring",
    ru: "Свайпните, чтобы продолжить",
    en: "Swipe to continue",
  },
  bismillah: {
    uz: "Bismillahir Rohmaanir Rohiym",
    ru: "Бисмилляхир Рахмаанир Рахиим",
    en: "Bismillahir Rahmanir Rahim",
  },
  welcomeGuest: {
    uz: "Hurmatli mehmon!",
    ru: "Дорогой гость!",
    en: "Dear guest!",
  },
  continueCta: {
    uz: "Davom etish",
    ru: "Продолжить",
    en: "Continue",
  },
  continueReady: {
    uz: "Davom etishga tayyor",
    ru: "Готовы продолжить",
    en: "Ready to continue",
  },
  waitingSeconds: {
    uz: "Tugma 5 soniyadan keyin paydo bo'ladi...",
    ru: "Кнопка появится через 5 секунд...",
    en: "The button appears in 5 seconds...",
  },
  detailsTitle: {
    uz: "TAFSILOTLAR",
    ru: "ДЕТАЛИ",
    en: "DETAILS",
  },
  whenAndWhereTitle: {
    uz: "Qachon va Qayerda",
    ru: "Когда и Где",
    en: "When and Where",
  },
  gatheringLabel: {
    uz: "Mehmonlar yig'ilishi",
    ru: "Сбор гостей",
    en: "Guest gathering",
  },
  dressCodeTitle: {
    uz: "Kiyinish kodi",
    ru: "Дресс-код",
    en: "Dress code",
  },
  contactInviteTitle: {
    uz: "Biz bilan bog'laning",
    ru: "Свяжитесь с нами",
    en: "Reach out to us",
  },
  contactTeleLabel: {
    uz: "Telegram orqali",
    ru: "Через Telegram",
    en: "Via Telegram",
  },
  closingTitle: {
    uz: "Ko'rishguncha",
    ru: "До встречи",
    en: "See you there",
  },
  closingLine: {
    uz: "Sizni baxtli kunimizda ko'rganimizdan xursand bo'lamiz",
    ru: "Будем рады видеть вас в наш счастливый день",
    en: "We would be happy to see you on our special day",
  },
  yearPromise: {
    uz: "{year}-yilda quchoqlaymiz",
    ru: "Ждём в {year}",
    en: "See you in {year}",
  },
  reviewCta: {
    uz: "Ko'rib chiqishni tugatish",
    ru: "Завершить просмотр",
    en: "Finish the review",
  },
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
