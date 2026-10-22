/**
 * `public/boot.js` faylini yaratadi — sahifa chizilishidan oldin
 * bajariladigan kichik skript (taklifnoma sahifasida scroll bloklash).
 *
 * Nima uchun alohida fayl: React komponent ichidagi `<script>` mijozda
 * bajarilmaydi ("Encountered a script tag..." xatosi). `next/script` esa
 * faylni `<head>` ga preload qilib, Next bootstrap paytida ijro qiladi.
 *
 * Manba: `couples.json` (taklifnoma sluglari).
 * Taklifnoma havolasi: /qiz-bola-isim/ (kichik harf, lotin, `-` bilan).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const slugs = JSON.parse(readFileSync(join(root, "couples.json"), "utf8"));

const script = `/* avtomatik yaratilgan — couples.json dan */
(function(){try{
var S=${JSON.stringify(slugs)},p=location.pathname.replace(/\\/+$/,"");
if(p&&S.indexOf(p.replace(/^\\//,""))>-1){document.documentElement.classList.add("is-locked");}
}catch(e){}})();
`;

// sintaksisni darhol tekshiramiz — buzilgan skript butun saytni buzadi
new Function(script);

writeFileSync(join(root, "public", "boot.js"), script);
console.log(`[boot] public/boot.js yaratildi (${slugs.length} ta taklifnoma)`);