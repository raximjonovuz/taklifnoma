import type { CoupleData } from "@/lib/types";

/**
 * Namuna juftlik. Haqiqiy ma'lumot keyinchalik server/API orqali
 * keladi — shu sababli tuzilma manba (__DATA__) bilan bir xil.
 */
const data: CoupleData = {
  version: 1,
  updatedAt: "2027-01-01T00:00:00.000Z",

  couple: {
    groom: { uz: "Ozodbek", ru: "Озодбек", en: "Ozodbek" },
    bride: { uz: "♥", ru: "♥", en: "♥" },
    groomParents: {
      uz: "*** xonadoni",
      ru: "Дом семьи ***",
      en: "The *** household",
    },
    brideParents: {
      uz: "*** xonadoni",
      ru: "Дом семьи ***",
      en: "The *** household",
    },
    monogram: "O&M",
  },

  verse: {
    arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
    text: {
      uz: "Va sizlarni juft-juft qilib yaratdik.",
      ru: "И Мы создали вас парами.",
      en: "And We created you in pairs.",
    },
    ref: {
      uz: "Naba surasi, 8-oyat",
      ru: "Сура «ан-Наба», аят 8",
      en: "Surah An-Naba, 78:8",
    },
  },

  event: {
    date: "2027-06-16",
    time: "17:00",
    tzOffset: "+05:00",
    title: {
      uz: "Nikoh to'yi",
      ru: "Свадебное торжество",
      en: "Wedding Celebration",
    },
  },

  venue: {
    name: {
      uz: "«***» to'yxonasi",
      ru: "Ресторан «***»",
      en: "«***» Banquet Hall",
    },
    address: {
      uz: "Buxoro shahri, *** ko'chasi, ***",
      ru: "г. Бухара, ул.*** , ***",
      en: "*** *** street, Bukhara",
    },
    note: {
      uz: "Sizni samimiy kutib qolamiz.",
      ru: "Будем искренне рады видеть Вас.",
      en: "We will be delighted to welcome you.",
    },
    lat: 41.311081,
    lng: 69.240562,
  },

  contacts: {
    phone: "+998901234567",
    telegram: "****",
  },

  texts: {
    hello: {
      uz: "Assalomu alaykum!",
      ru: "Ассалому алайкум!",
      en: "Assalamu alaykum!",
    },
    invitedTitle: {
      uz: "Sizga taklifnoma mavjud",
      ru: "Вам адресовано приглашение",
      en: "You are cordially invited",
    },
    letterTitle: {
      uz: "Hurmatli qadrdonlar!",
      ru: "Дорогие друзья!",
      en: "Dear friends!",
    },
    letter: {
      uz: "Sizlarni hayotimizdagi eng quvonchli va unutilmas lahzalardan biri — nikoh to'yimizga samimiy mehrimiz va hurmatimizni bildirib taklif etamiz.\n\nQuvonchimizga sherik bo'lib, ushbu unutilmas oqshomda bizning mehmonimiz bo'lishingiz biz uchun katta baxtiylik bo'ladi.\n\nSizning kelishingiz, ilhomlantiruvchi so'zlaringiz va yaxshi tilaklaringiz bilan bizni juda xursand qilasaniz.",
      ru: "Мы приглашаем вас разделить с нами один из самых радостных и незабываемых дней нашей жизни — день нашей свадьбы.\n\nВаше присутствие, вдохновляющие слова и добрые пожелания сделают этот вечер по-настоящему тёплым.\n\nБудем рады видеть вас в числе наших гостей.",
      en: "We invite you to share one of the most joyful and unforgettable days of our lives — our wedding day.\n\nYour presence, your kind words and warm wishes will make this evening truly special.\n\nIt would be our greatest pleasure to welcome you as our guest.",
    },
    signature: {
      uz: "Hurmat bilan,",
      ru: "С уважением,",
      en: "With love,",
    },
    closingSub: {
      uz: "Bizni kamida bir marta ko'rmoqchi bo'lsangiz",
      ru: "Будем рады увидеть вас хотя бы однажды",
      en: "We would love to see you once",
    },
    closing: {
      uz: "Sizni kutamiz!",
      ru: "Ждём вас!",
      en: "See you there!",
    },
  },

  images: {
    hero: "/media/photo-hero.jpg",
  },

  music: "/media/music.mp3",

  settings: {
    languages: ["uz", "ru", "en"],
    defaultLang: "uz",
    showCountdown: true,
    showContacts: true,
    petals: true,
  },

  rsvp: {
    enabled: true,
  },
};

export default data;