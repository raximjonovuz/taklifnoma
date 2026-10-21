import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Mono,
  Inter,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/LocaleContext";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const mono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taklifnoma",
  description: "To'y taklifnomasi",
  openGraph: {
    title: "Taklifnoma",
    description: "To'y taklifnomasi",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-screen text-[15px] leading-relaxed">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
