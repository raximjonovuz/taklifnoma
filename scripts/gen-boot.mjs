/**
 * `public/boot.js` faylini yaratadi — sahifa chizilishidan oldin bajariladigan
 * kichik skript (subdomen → taklifnoma, konvert paytida scroll bloklash).
 *
 * Nima uchun alohida fayl: React komponent ichidagi `<script>` mijozda
 * bajarilmaydi ("Encountered a script tag..." xatosi). `next/script` esa
 * faylni `<head>` ga preload qilib, Next bootstrap paytida ijro qiladi.
 *
 * Manba: `site.json` (domen) va `couples.json` (sluglar).
 * CNAME (GitHub Pages) mavjud bo'lsa tekshiriladi — ammo manba hisoblanmaydi.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const sitePath = join(root, "site.json");
if (!existsSync(sitePath)) {
  console.error("[boot] site.json topilmadi — domen aniqlanmadi.");
  process.exit(1);
}

const domain = JSON.parse(readFileSync(sitePath, "utf8")).domain;
if (!domain) {
  console.error("[boot] site.json ichida `domain` yo'q.");
  process.exit(1);
}

const cname = join(root, "CNAME");
if (existsSync(cname)) {
  const c = readFileSync(cname, "utf8").trim();
  if (c && c !== domain) {
    console.warn(`[boot] CNAME ("${c}") va site.json ("${domain}") farq qiladi.`);
  }
}

const slugs = JSON.parse(readFileSync(join(root, "couples.json"), "utf8"));

const script = `/* avtomatik yaratilgan — site.json va couples.json dan */
(function(){try{
var B=${JSON.stringify(domain)},S=${JSON.stringify(slugs)},p=location.pathname.replace(/\\/+$/,"");
if(!p){
  var h=location.hostname.toLowerCase();
  if(h&&h!==B&&h!=="www."+B&&h.slice(-(B.length+1))==="."+B){
    var s=h.slice(0,-(B.length+1)).split(".").pop();
    if(s&&s!=="www"&&S.indexOf(s)>-1){location.replace("/"+s+"/");return;}
  }
}else if(S.indexOf(p.replace(/^\\//,""))>-1){
  document.documentElement.classList.add("is-locked");
}
}catch(e){}})();
`;

// sintaksisni darhol tekshiramiz — buzilgan skript butun saytni buzadi
new Function(script);

writeFileSync(join(root, "public", "boot.js"), script);
console.log(`[boot] public/boot.js yaratildi (${domain}, ${slugs.length} ta taklifnoma)`);