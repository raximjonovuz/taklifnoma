"use client";

import { useState } from "react";
import { Divider, Use } from "@/components/Ornaments";
import { telegramShareLink } from "@/lib/site";

type Props = {
  sub: string;
  title: string;
  names: string;
  date: string;
  shareText: string;
  copiedLabel: string;
};

/** Yakun + ulashish */
export default function Outro({
  sub,
  title,
  names,
  date,
  shareText,
  copiedLabel,
}: Props) {
  const [copied, setCopied] = useState(false);

  const url = () => `${window.location.origin}${window.location.pathname}`;

  const share = async () => {
    // Mobilda — tizimning o'z ulashish oynasi
    if (navigator.share) {
      try {
        await navigator.share({ title: names, text: shareText, url: url() });
        return;
      } catch {
        /* foydalanuvchi bekor qilgan */
      }
    }
    window.open(telegramShareLink(url(), shareText), "_blank", "noopener");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard ruxsati yo'q */
    }
  };

  return (
    <footer className="outro" id="outro">
      <div className="outro__aurora" aria-hidden />
      <div className="outro__inner reveal" data-anim="fade-up">
        <Use id="orn-rings" className="orn orn--icon" />
        <p className="outro__sub">{sub}</p>
        <h2 className="outro__title">{title}</h2>
        <p className="outro__names script shine">{names}</p>
        <Divider />

        <div className="share">
          <button
            type="button"
            className="magnet"
            data-magnet
            onClick={share}
            aria-label="Telegram"
          >
            <svg viewBox="0 0 24 24">
              <use href="#ic-tg" />
            </svg>
          </button>
          <button
            type="button"
            className={`magnet${copied ? " is-done" : ""}`}
            data-magnet
            onClick={copy}
            aria-label={copiedLabel}
          >
            <svg viewBox="0 0 24 24">
              <use href="#ic-copy" />
            </svg>
          </button>
        </div>

        <p className="outro__credit">{copied ? copiedLabel : date}</p>
      </div>
    </footer>
  );
}