/**
 * `out/` papkasini tozalaydi.
 *
 * Next.js statik eksportda `out/` ichini to'liq bo'shatmaydi — slug
 * o'zgartirilganda eski sahifa (masalan `/eski-taklifnoma/`) qolib ketadi
 * va hosting'da 404 o'rniga 200 qaytaradi. Shuning uchun har bir
 * build'dan oldin tozalanadi.
 */
import { rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");

if (existsSync(out)) {
  rmSync(out, { recursive: true, force: true });
  console.log("[clean] out/ tozalandi");
}