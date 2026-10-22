import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Rasmlar next/image'siz: dizayn CSS'i to'g'ridan-to'g'ri <img> bilan yozilgan
  // (statik eksport, rasm moslashuvi o'zimizning).
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // Default ignores of eslint-config-next:
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.dts",
    // scripts/gen-boot.mjs dan generatsiya qilinadi
    "public/boot.js",
  ]),
]);

export default eslintConfig;