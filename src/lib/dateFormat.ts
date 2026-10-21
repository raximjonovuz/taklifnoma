import type { Locale } from "./types";

const UZ_MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

const UZ_WEEKDAYS = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

export interface WeddingDateParts {
  day: string;
  month: string;
  year: string;
  weekday: string;
}

export function formatWeddingDate(
  dateISO: string,
  locale: Locale,
): WeddingDateParts {
  const d = new Date(`${dateISO}T00:00:00`);
  if (locale === "uz") {
    return {
      day: String(d.getDate()),
      month: UZ_MONTHS[d.getMonth()],
      year: String(d.getFullYear()),
      weekday: UZ_WEEKDAYS[d.getDay()],
    };
  }
  const tag = locale === "ru" ? "ru-RU" : "en-GB";
  return {
    day: new Intl.DateTimeFormat(tag, { day: "numeric" }).format(d),
    month: new Intl.DateTimeFormat(tag, { month: "long" }).format(d),
    year: new Intl.DateTimeFormat(tag, { year: "numeric" }).format(d),
    weekday: new Intl.DateTimeFormat(tag, { weekday: "long" }).format(d),
  };
}
