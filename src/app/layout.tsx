import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { Symbols } from "@/components/Ornaments";
import { BASE_DOMAIN, SITE_NAME } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BASE_DOMAIN}`),
  title: {
    default: `${SITE_NAME} — to'y taklifnomasi`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Ism-familiyani kiriting, taklifnoma tayyor. Do'stlaringizga yuboring — ular shu havolani ochsa, taklifnoma darhol ko'rinadi.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "uz_UZ",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#120E0A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `suppressHydrationWarning`: `/boot.js` gidratsiyadan oldin `<html>` ga
    // `is-locked` klassini qo'shadi (konvert paytida scroll bloklash).
    <html
      lang="uz"
      className={`${serif.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* `public/boot.js` — subdomen → taklifnoma, konvert paytida scroll bloklash.
            Fayl `scripts/gen-boot.mjs` da `couples.json` + `CNAME` dan yaratiladi. */}
        <Script id="boot" src="/boot.js" strategy="beforeInteractive" />
        <Symbols />
        {children}
      </body>
    </html>
  );
}