import type { Lang } from "./types";

export const LANGS_ORDER: Lang[] = ["uz", "ru", "en"];

/** O'zbekcha kalitlar; ru/en da shu tartibda. */
const uz = {
  "brand": "Taklifnoma",
  "tagline": "To'y taklifnomasi — bitta havola bilan",

  "cover.eyebrow": "Sizga taklifnoma mavjud",
  "cover.hint": "Ochish uchun muhrni bosing",
  "cover.open": "Taklifnomani ochish",

  "hero.scroll": "Pastga suring",
  "couple.groom": "Kuyov",
  "couple.bride": "Kelin",

  "count.title": "To'yimizga qoldi",
  "count.days": "kun",
  "count.hours": "soat",
  "count.mins": "daqiqa",
  "count.secs": "soniya",
  "count.done": "Bugun bizning kunimiz!",

  "venue.title": "Manzil",
  "venue.google": "Google Maps",
  "venue.yandex": "Yandex Navi",

  "contacts.title": "Bog'lanish",
  "contacts.sub": "Savollaringiz bo'lsa, biz bilan bog'laning",
  "contacts.call": "Qo'ng'iroq qilish",

  "rsvp.title": "Ishtirokingizni tasdiqlang",
  "rsvp.sub": "Javobingiz biz uchun juda muhim",
  "rsvp.name": "Ismingiz",
  "rsvp.namePh": "Ism va familiyangiz",
  "rsvp.attending": "Kela olasizmi?",
  "rsvp.yes": "Albatta kelaman",
  "rsvp.no": "Afsus, kela olmayman",
  "rsvp.guests": "Necha kishi bilan?",
  "rsvp.message": "Tilaklaringiz (ixtiyoriy)",
  "rsvp.messagePh": "Yosh oilaga tilaklaringiz...",
  "rsvp.send": "Yuborish",
  "rsvp.thanksTitle": "Rahmat!",
  "rsvp.thanksText": "Javobingiz qabul qilindi. Sizni kutamiz!",
  "rsvp.errName": "Iltimos, ismingizni yozing.",
  "rsvp.errTelegram": "Telegram yuklanmadi. Iltimos, qo'ng'iroq qiling.",

  "share.text": "Nikoh to'yimizga taklif etamiz!",
  "share.copied": "Havola nusxalandi",
  "share.open": "Ulashish",

  "lang.label": "Til",

  "nav.home": "Bosh sahifa",
  "nav.search": "Taklifnoma qidirish",
  "nav.contact": "Aloqa",

  "lp.hero.title": "To'y taklifnomangiz — bitta havola bilan",
  "lp.hero.sub": "Ism-familiyani kiriting, taklifnoma tayyor. Do'stlaringizga yuboring — ular shu havolani ochsa, taklifnoma darhol ko'rinadi.",
  "lp.hero.cta": "Taklifnoma qidirish",
  "lp.hero.cta2": "Taklifnoma yaratish",

  "lp.how.title": "Qanday ishlaydi",
  "lp.how.1.t": "Ism-familiya",
  "lp.how.1.d": "Kuyov va kelin ismini kiritasiz — shu asosda shaxsiy havola yaratiladi.",
  "lp.how.2.t": "Ulashish",
  "lp.how.2.d": "Havolani Telegram orqali yuborasiz. Do'stingiz ochsa, to'g'ridan-to'g'ri taklifnomaga kiradi.",
  "lp.how.3.t": "Javob",
  "lp.how.3.d": "Mehmon ishtirokini tasdiqlaydi, siz esa javobni Telegram'dan olasiz.",

  "lp.features.title": "Nima uchun aynan bu?",
  "lp.features.1.t": "Tez ochiladi",
  "lp.features.1.d": "Rasm va musiqa faqat kerak bo'lganda yuklanadi.",
  "lp.features.2.t": "Mobil uchun",
  "lp.features.2.d": "Barcha ekran o'lchamlarida chiroyli ko'rinadi.",
  "lp.features.3.t": "Javoblar bir joyda",
  "lp.features.3.d": "Ishtirok, mehmonlar soni va tilaklar sizga Telegram orqali boradi.",

  "lp.search.title": "Taklifnoma qidiring",
  "lp.search.sub": "Kuyov yoki kelin ismini yozing — manzilingizni o'zingiz kiriting",
  "lp.search.ph": "Masalan: Jasur",
  "lp.search.btn": "Qidirish",
  "lp.search.empty": "Hech narsa topilmadi",
  "lp.search.emptySub": "Ismni boshqa tarzda yozib ko'ring yoki bizga murojaat qiling.",
  "lp.search.open": "Taklifnomani ochish",
  "lp.search.date": "To'y sanasi",

  "lp.contact.title": "Taklifnoma kerakmi?",
  "lp.contact.sub": "Ism-familiya, sana va manzilni yozing — biz sizga tayyor taklifnoma yubaramiz.",
  "lp.contact.name": "Ismingiz",
  "lp.contact.namePh": "Ism va familiyangiz",
  "lp.contact.event": "To'y ma'lumotlari",
  "lp.contact.eventPh": "Masalan: 15-noyabr, 2026, 17:00, Toshkent",
  "lp.contact.message": "Xabaringiz",
  "lp.contact.messagePh": "Qo'shimcha so'ralar...",
  "lp.contact.send": "Yuborish",
  "lp.contact.or": "yoki to'g'ridan-to'g'ri",
  "lp.contact.call": "Qo'ng'iroq qilish",
  "lp.contact.telegram": "Telegram orqali yozish",

  "lp.footer.text": "To'y taklifnomasi — chiroyli, tez va oddiy.",
  "lp.footer.privacy": "Ma'lumotlaringiz faqat sizga yuborish uchun ishlatiladi.",

  "months": "yanvar,fevral,mart,aprel,may,iyun,iyul,avgust,sentabr,oktabr,noyabr,dekabr",
  "notfound.title": "Bunday taklifnoma topilmadi",
  "notfound.sub": "Manzilni tekshirib ko'ring yoki bosh sahifadan qidiring.",
  "notfound.cta": "Bosh sahifaga",
} as const;

export type TKey = keyof typeof uz;

const ru: Record<TKey, string> = {
  "brand": "Taklifnoma",
  "tagline": "Свадебное приглашение — по одной ссылке",

  "cover.eyebrow": "Вам адресовано приглашение",
  "cover.hint": "Нажмите на печать, чтобы открыть",
  "cover.open": "Открыть приглашение",

  "hero.scroll": "Листайте вниз",
  "couple.groom": "Жених",
  "couple.bride": "Невеста",

  "count.title": "До свадьбы осталось",
  "count.days": "дней",
  "count.hours": "часов",
  "count.mins": "минут",
  "count.secs": "секунд",
  "count.done": "Сегодня наш день!",

  "venue.title": "Место проведения",
  "venue.google": "Google Карты",
  "venue.yandex": "Яндекс Навигатор",

  "contacts.title": "Контакты",
  "contacts.sub": "Если есть вопросы — свяжитесь с нами",
  "contacts.call": "Позвонить",

  "rsvp.title": "Подтвердите присутствие",
  "rsvp.sub": "Ваш ответ очень важен для нас",
  "rsvp.name": "Ваше имя",
  "rsvp.namePh": "Имя и фамилия",
  "rsvp.attending": "Сможете прийти?",
  "rsvp.yes": "Обязательно приду",
  "rsvp.no": "К сожалению, не смогу",
  "rsvp.guests": "Сколько человек?",
  "rsvp.message": "Пожелания (необязательно)",
  "rsvp.messagePh": "Ваши пожелания молодожёнам...",
  "rsvp.send": "Отправить",
  "rsvp.thanksTitle": "Спасибо!",
  "rsvp.thanksText": "Ваш ответ принят. Будем рады видеть Вас!",
  "rsvp.errName": "Пожалуйста, укажите Ваше имя.",
  "rsvp.errTelegram": "Telegram не открылся. Позвоните нам, пожалуйста.",

  "share.text": "Приглашаем на нашу свадьбу!",
  "share.copied": "Ссылка скопирована",
  "share.open": "Поделиться",

  "lang.label": "Язык",

  "nav.home": "Главная",
  "nav.search": "Найти приглашение",
  "nav.contact": "Контакты",

  "lp.hero.title": "Свадебное приглашение — по одной ссылке",
  "lp.hero.sub": "Введите имена жениха и невесты — приглашение готово. Отправьте ссылку друзьям: они сразу увидят ваше приглашение.",
  "lp.hero.cta": "Найти приглашение",
  "lp.hero.cta2": "Создать приглашение",

  "lp.how.title": "Как это работает",
  "lp.how.1.t": "Имена",
  "lp.how.1.d": "Введите имена жениха и невесты — на основе этого создаётся персональная ссылка.",
  "lp.how.2.t": "Поделиться",
  "lp.how.2.d": "Отправьте ссылку в Telegram. Друг откроет её и сразу попадёт на приглашение.",
  "lp.how.3.t": "Ответы",
  "lp.how.3.d": "Гость подтверждает участие, а вы получаете ответы в Telegram.",

  "lp.features.title": "Почему именно так",
  "lp.features.1.t": "Быстро открывается",
  "lp.features.1.d": "Фото и музыка загружаются только когда нужны.",
  "lp.features.2.t": "Для телефона",
  "lp.features.2.d": "Красиво выглядит на любом размере экрана.",
  "lp.features.3.t": "Ответы в одном месте",
  "lp.features.3.d": "Участие, количество гостей и пожелания приходят вам в Telegram.",

  "lp.search.title": "Найдите приглашение",
  "lp.search.sub": "Введите имя жениха или невесты — адрес указываете вы сами",
  "lp.search.ph": "Например: Жасур",
  "lp.search.btn": "Найти",
  "lp.search.empty": "Ничего не найдено",
  "lp.search.emptySub": "Попробуйте написать имя иначе или свяжитесь с нами.",
  "lp.search.open": "Открыть приглашение",
  "lp.search.date": "Дата свадьбы",

  "lp.contact.title": "Нужно приглашение?",
  "lp.contact.sub": "Напишите имена, дату и место — мы пришлём готовое приглашение.",
  "lp.contact.name": "Ваше имя",
  "lp.contact.namePh": "Имя и фамилия",
  "lp.contact.event": "Данные свадьбы",
  "lp.contact.eventPh": "Например: 15 ноября 2026, 17:00, Ташкент",
  "lp.contact.message": "Сообщение",
  "lp.contact.messagePh": "Дополнительные вопросы...",
  "lp.contact.send": "Отправить",
  "lp.contact.or": "или напрямую",
  "lp.contact.call": "Позвонить",
  "lp.contact.telegram": "Написать в Telegram",

  "lp.footer.text": "Свадебное приглашение — красиво, быстро и просто.",
  "lp.footer.privacy": "Ваши данные используются только чтобы отправить вам приглашение.",

  "months": "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря",
  "notfound.title": "Такое приглашение не найдено",
  "notfound.sub": "Проверьте адрес или поищите на главной.",
  "notfound.cta": "На главную",
};

const en: Record<TKey, string> = {
  "brand": "Taklifnoma",
  "tagline": "Wedding invitations — one link",

  "cover.eyebrow": "You are cordially invited",
  "cover.hint": "Tap the seal to open",
  "cover.open": "Open the invitation",

  "hero.scroll": "Scroll down",
  "couple.groom": "Groom",
  "couple.bride": "Bride",

  "count.title": "Counting down to our day",
  "count.days": "days",
  "count.hours": "hours",
  "count.mins": "minutes",
  "count.secs": "seconds",
  "count.done": "Today is our day!",

  "venue.title": "Venue",
  "venue.google": "Google Maps",
  "venue.yandex": "Yandex Navi",

  "contacts.title": "Get in touch",
  "contacts.sub": "If you have any questions, contact us",
  "contacts.call": "Call us",

  "rsvp.title": "Kindly confirm your presence",
  "rsvp.sub": "Your answer means a lot to us",
  "rsvp.name": "Your name",
  "rsvp.namePh": "First and last name",
  "rsvp.attending": "Will you join us?",
  "rsvp.yes": "Yes, I will be there",
  "rsvp.no": "Sadly, I can't make it",
  "rsvp.guests": "How many guests?",
  "rsvp.message": "Your wishes (optional)",
  "rsvp.messagePh": "A few warm words for the couple...",
  "rsvp.send": "Send",
  "rsvp.thanksTitle": "Thank you!",
  "rsvp.thanksText": "Your answer has been received. See you soon!",
  "rsvp.errName": "Please enter your name.",
  "rsvp.errTelegram": "Telegram could not open. Please call us.",

  "share.text": "We invite you to our wedding!",
  "share.copied": "Link copied",
  "share.open": "Share",

  "lang.label": "Language",

  "nav.home": "Home",
  "nav.search": "Find invitation",
  "nav.contact": "Contact",

  "lp.hero.title": "Your wedding invitation — one link",
  "lp.hero.sub": "Enter the bride and groom names — the invitation is ready. Share the link with friends: they land on the invitation right away.",
  "lp.hero.cta": "Find an invitation",
  "lp.hero.cta2": "Create an invitation",

  "lp.how.title": "How it works",
  "lp.how.1.t": "Names",
  "lp.how.1.d": "Enter the bride and groom names — a personal link is created from it.",
  "lp.how.2.t": "Share",
  "lp.how.2.d": "Send the link on Telegram. Your friend opens it and goes straight to the invitation.",
  "lp.how.3.t": "Replies",
  "lp.how.3.d": "Guests confirm their attendance and you receive the replies in Telegram.",

  "lp.features.title": "Why this way",
  "lp.features.1.t": "Fast to open",
  "lp.features.1.d": "Photos and music load only when needed.",
  "lp.features.2.t": "Made for phones",
  "lp.features.2.d": "Looks great on any screen size.",
  "lp.features.3.t": "Replies in one place",
  "lp.features.3.d": "Attendance, guest count and wishes come to your Telegram.",

  "lp.search.title": "Find an invitation",
  "lp.search.sub": "Type the groom or bride name — you provide the address",
  "lp.search.ph": "For example: Jasur",
  "lp.search.btn": "Search",
  "lp.search.empty": "Nothing found",
  "lp.search.emptySub": "Try another spelling or contact us.",
  "lp.search.open": "Open invitation",
  "lp.search.date": "Wedding date",

  "lp.contact.title": "Need an invitation?",
  "lp.contact.sub": "Send names, date and venue — we will prepare the invitation for you.",
  "lp.contact.name": "Your name",
  "lp.contact.namePh": "First and last name",
  "lp.contact.event": "Wedding details",
  "lp.contact.eventPh": "For example: 15 November 2026, 17:00, Tashkent",
  "lp.contact.message": "Message",
  "lp.contact.messagePh": "Anything else...",
  "lp.contact.send": "Send",
  "lp.contact.or": "or reach us directly",
  "lp.contact.call": "Call us",
  "lp.contact.telegram": "Write on Telegram",

  "lp.footer.text": "Wedding invitations — beautiful, fast and simple.",
  "lp.footer.privacy": "Your data is used only to send you the invitation.",

  "months": "January,February,March,April,May,June,July,August,September,October,November,December",
  "notfound.title": "Invitation not found",
  "notfound.sub": "Check the address or search from the home page.",
  "notfound.cta": "Home",
};

export const DICT: Record<Lang, Record<TKey, string>> = { uz, ru, en };

export function pick(value: Record<string, string>, lang: Lang): string {
  return value[lang] || value.uz || "";
}

/** months kaliti tilga bog'liq ro'yxatga aylanadi */
export function months(lang: Lang): string[] {
  return DICT[lang].months.split(",");
}