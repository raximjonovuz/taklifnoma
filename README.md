# Taklifnoma — to'y taklifnomasi (Next.js, statik eksport)

Manba (HTML/CSS/JS) loyihaning to'liq kloni: dizayn, animatsiyalar va tugmalar
ishlashi Next.js + TypeScript ga ko'chirilgan. Rasmlar va ma'lumotlar — o'z
manbalimizdan.

## Manzillar

| URL | Natija |
| --- | --- |
| `taklifnoma.raximjonov.uz/` | Landing (3 ko'rinish: bosh / qidiruv / aloqa) |
| `taklifnoma.raximjonov.uz/jasur-madina/` | Taklifnoma |
| `jasur-madina.taklifnoma.raximjonov.uz/` | Avtomatik ravishda `/jasur-madina/` ga o'tadi |

Subdomen tekshiruvi `public/boot.js` orqali bajariladi (statik eksportda server
yo'q). Bu fayl `scripts/gen-boot.mjs` da `couples.json` + `CNAME` dan yaratiladi
(`npm run dev`/`npm run build` oldidan avtomatik). Boshqa subdomen yoki domen →
landing. Fayl Git'ga qo'shilmaydi.

## Tuzilma

```
src/
  app/
    layout.tsx        fontlar (Cormorant Garamond + Great Vibes), metadata, ikonkalar
    globals.css       barcha dizayn, animatsiyalar, landing uslublari
    page.tsx          landing + subdomen → taklifnoma scripti
    [slug]/page.tsx   taklifnoma (generateStaticParams orqali statik)
    not-found.tsx
  components/
    Ornaments.tsx     SVG bezak/ikonalar kutubxonasi
    invite/           Preloader, Cover (3D konvert), Hero, Letter, CoupleSection,
                      Countdown, Venue, Rsvp, Contacts, Outro
    landing/Landing   uch ko'rinish (hash orqali: #home #search #contact)
    fx/               Petals (canvas), CursorFx (kursor + uchqunlar)
    ui/               LangSwitch, MusicButton
  lib/
    types.ts          ma'lumot tiplari
    dict.ts           3 tilning lug'ati (uz/ru/en)
    useLang.ts        til holati (?lang= → localStorage → brauzer)
    fx.ts             parallax, kursor, tilt/magnet, reveal, scroll progress
    site.ts           domen, Telegram, havola yordamchilari
    telegram.ts       RSVP/kontakt xabarlari (deep link)
    format.ts         sana, telefon, slug normalizatsiyasi
  couples/            ma'lumotlar (hozir lokal, keyin server)

couples.json          taklifnoma sluglari ro'yxati (boot.js shundan yaratiladi)
scripts/gen-boot.mjs  public/boot.js generatsiyasi
```

## Ma'lumot

`src/couples/demo.ts` — bitta juftlik. `couples.json` — sluglar ro'yxati
(ro'yxat bilan moduli mos kelmasa, build xato beradi). Serverga o'tkazish uchun
faqat `src/couples/index.ts` dagi `getCouple` / `coupleIndex` ni API dan
o'qishga o'zgartiring: komponentlar o'zgarmaydi.

Rasm yo'q bo'lsa (hero/arch/venue) dizayn o'z-o'zidan bezakli to'ldiruvchiga
tushadi. Xarita esa ko'rinmaganda yuklanmaydi.

## Telegram

Hozir javoblar to'g'ridan-to'g'ri Telegram chat ochish orqali yuboriladi
(`t.me/<username>?text=...`). Bot ulash uchun `src/lib/site.ts` dagi
`TELEGRAM_BOT` ni to'ldiring va `src/lib/telegram.ts` dagi `openTelegram`
o'rniga server orqali `sendMessage` chaqiring.

## Buyruqlar

```
npm run dev        # ishlab chiqish
npm run build      # statik eksport → out/
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```