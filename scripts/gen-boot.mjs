/**
 * `public/boot.js` faylini yaratadi — sahifa chizilishidan oldin bajariladigan
 * kichik skript (subdomen → taklifnoma, konvert paytida scroll bloklash).
 *
 * Nima uchun alohida fayl: React komponent ichidagi `<script>` mijozda
 * bajarilmaydi ("Encountered a script tag..." xatosi). `next/script` esa
 * faylni `<head>` ga preload qilib, Next bootstrap paytida ijro qiladi.
 *
 * Manba: `couples.json` (sluglar) va `CNAME` (domen).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const cname = join(root, "CNAME");
if (!existsSync(cname)) {
  console.error("[boot] CNAME fayli topilmadi — domen aniqlanmadi.");
  process.exit(1);
}
const domain = readFileSync(cname, "utf8").trim();
const slugs = JSON.parse(readFileSync(join(root, "couples.json"), "utf8"));

const script = `/* avtomatik yaratilgan — couples.json va CNAME dan */
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
console.log(`[boot] public/boot.js yaratildi (${slugs.length} ta taklifnoma)`);