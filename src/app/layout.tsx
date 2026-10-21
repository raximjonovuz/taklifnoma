import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/LocaleContext";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
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
      className={`${serif.variable} ${display.variable} ${sans.variable} h-full`}
    >
      <body className="min-h-screen text-[15px] leading-relaxed">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
