import type { Couple } from "@/lib/types";

const couple: Couple = {
  slug: "demo",
  names: {
    groomFull: {
      uz: "Jasurbek Karimov",
      ru: "Джасурбек Каримов",
      en: "Jasurbek Karimov",
    },
    brideFull: {
      uz: "Madina Yusupova",
      ru: "Мадина Юсупова",
      en: "Madina Yusupova",
    },
    groomFamily: {
      uz: "Karimovlar oilasi",
      ru: "Семья Каримовых",
      en: "The Karimov family",
    },
    brideFamily: {
      uz: "Yusupovlar oilasi",
      ru: "Семья Юсуповых",
      en: "The Yusupov family",
    },
  },
  verse: {
    uz: "Va alanga solmoqchi bo'lsangiz osmondan olov tushirmoqchi bo'lsanglar hamda xohishlaringiz bo'lsa — Alloh taolo albatta g'olibdir.",
    ru: "Если вы желаете мира им, то Аллах уже одарил их великим вознаграждением.",
    en: "And when you intend to give charity, and if you expose what you give — Allah knows what is in your hearts.",
  },
  greeting: {
    uz: "Hurmatli mehmon, sizni oilamiz quvonchli kunida ko'rib baxtiyor bo'lamiz.",
    ru: "Дорогой гость, мы будем счастливы видеть вас в этот радостный день.",
    en: "Dear guest, we would be honoured to share this joyful day with you.",
  },
  date: "2026-11-15",
  time: "17:00",
  venue: {
    uz: "Restoran “Sitora”",
    ru: "Ресторан «Ситора»",
    en: "Sitora Hall",
  },
  address: {
    uz: "Toshkent sh., Amir Temur ko'chasi 12",
    ru: "г. Ташкент, ул. Амира Темура 12",
    en: "12 Amir Temur street, Tashkent",
  },
  venueLat: 41.311081,
  venueLng: 69.240562,
  phones: [
    { label: "Kelin", phone: "+998901234567" },
    { label: "Kuyov", phone: "+998901234568" },
  ],
  telegram: "@example",
  heroImage: "/media/photo-hero.jpg",
  music: "/media/music.mp3",
};

export default couple;
