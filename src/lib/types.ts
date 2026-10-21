export type Locale = "uz" | "ru" | "en";

export type Localized = Record<Locale, string>;

export interface CoupleNames {
  groomFull: Localized;
  brideFull: Localized;
  groomFamily: Localized;
  brideFamily: Localized;
}

export interface Couple {
  slug: string;
  names: CoupleNames;
  verse: Localized;
  greeting: Localized;
  date: string;
  time: string;
  gatheringTime: string;
  dressCode: Localized;
  venue: Localized;
  address: Localized;
  venueLat: number;
  venueLng: number;
  phones: { label: string; sublabel?: string; phone: string }[];
  telegram: string;
  heroImage: string;
  music: string;
}
