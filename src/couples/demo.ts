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
    uz: "Uning alomatlaridan biri shuki, sizlar uchun o'zlaringizdan juftlar yaratib qo'ydi, siz ular bilan taskin topasiz.",
    ru: "И из Его знамений — что Он создал для вас из вас самих жён, чтобы вы находили в них покой.",
    en: "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them.",
  },
  greeting: {
    uz: "Hurmatli mehmon, sizni oilamiz quvonchli kunida ko'rib baxtiyor bo'lamiz.",
    ru: "Дорогой гость, мы будем счастливы видеть вас в этот радостный день.",
    en: "Dear guest, we would be honoured to share this joyful day with you.",
  },
  date: "2026-11-15",
  time: "17:00",
  gatheringTime: "16:30",
  dressCode: {
    uz: "Nafis kechki libos, oltin aksentlar",
    ru: "Изысканный вечерний наряд, золотые акценты",
    en: "Refined evening attire, gold accents",
  },
  venue: {
    uz: "«Sitora» restorani",
    ru: "Ресторан «Ситора»",
    en: "Sitora Hall",
  },
  address: {
    uz: "Toshkent shahri, Amir Temur ko'chasi 12-uy",
    ru: "г. Ташкент, ул. Амира Темура 12",
    en: "12 Amir Temur street, Tashkent",
  },
  venueLat: 41.311081,
  venueLng: 69.240562,
  phones: [
    { label: "Madina", sublabel: "kelin", phone: "+998 90 123 45 67" },
    {
      label: "Jasurbek",
      sublabel: "kuyov",
      phone: "+998 90 123 45 68",
    },
  ],
  telegram: "@taklifnoma_demo",
  heroImage: "/media/photo-hero.jpg",
  music: "/media/music.mp3",
};

export default couple;
