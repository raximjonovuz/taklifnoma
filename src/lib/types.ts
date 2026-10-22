export type Lang = "uz" | "ru" | "en";

export const LANGS: Lang[] = ["uz", "ru", "en"];

export type Localized = Record<Lang, string>;

export interface EventData {
  /** ISO date, masalan "2026-11-15" */
  date: string;
  /** "17:00" */
  time: string;
  /** ISO offset, masalan "+05:00" */
  tzOffset: string;
  title: Localized;
}

export interface VenueData {
  name: Localized;
  address: Localized;
  note: Localized;
  lat: number;
  lng: number;
  mapsUrl?: string;
  yandexUrl?: string;
}

export interface ContactsData {
  phone?: string;
  telegram?: string;
}

export interface TextsData {
  hello: Localized;
  invitedTitle: Localized;
  letterTitle: Localized;
  /** \n\n bilan ajratilgan xat matni */
  letter: Localized;
  signature: Localized;
  closingSub: Localized;
  closing: Localized;
}

export interface SettingsData {
  languages: Lang[];
  defaultLang: Lang;
  showCountdown: boolean;
  showContacts: boolean;
  petals: boolean;
}

/**
 * Telegram orqali qabul qilinadigan javob.
 * Hozircha foydalanuvchi bilan to'g'ridan-to'g'ri chat ochiladi (deep link).
 * Keyinchalik bot ulanadi: `bot` — bot username, `chatId` — kanal/guruh id.
 */
export interface RsvpData {
  enabled: boolean;
  /** Telegram bot yoki foydalanuvchi username */
  bot?: string;
}

export interface CoupleData {
  version: number;
  updatedAt: string;
  couple: {
    groom: Localized;
    bride: Localized;
    groomParents: Localized;
    brideParents: Localized;
    monogram: string;
  };
  verse: {
    arabic: string;
    text: Localized;
    ref: Localized;
  };
  event: EventData;
  venue: VenueData;
  contacts: ContactsData;
  texts: TextsData;
  images: {
    hero?: string;
    arch?: string;
    venue?: string;
  };
  music?: string;
  settings: SettingsData;
  rsvp: RsvpData;
}

/** Taklifnoma sahifasi uchun to'liq ma'lumot + slug */
export interface Couple extends CoupleData {
  slug: string;
}

export interface CoupleIndexItem {
  slug: string;
  groom: Localized;
  bride: Localized;
  date: string;
  monogram: string;
}