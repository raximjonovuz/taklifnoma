import type { Localized } from "@/lib/types";

type Props = {
  title: Localized;
  text: Localized;
  lang: "uz" | "ru" | "en";
};

/**
 * Vaqtinchali test bo'limi.
 * Lokatsiya (manzil + xarita) olib tashlangan — o'rniga shu turadi.
 * Haqiqiy manzil kelgachina `Venue` komponenti qaytariladi.
 */
export default function TestSection({ title, text, lang }: Props) {
  return (
    <section className="section section--paper" id="test">
      <div className="wrap wrap--narrow">
        <header className="head reveal" data-anim="fade-up">
          <h2 className="head__title">{title[lang] || title.uz}</h2>
          <p className="head__sub">{text[lang] || text.uz}</p>
        </header>

        <div className="card reveal" data-anim="fade-up">
          <p className="letter__body" style={{ marginTop: 0 }}>
            <span style={{ display: "block", textAlign: "center" }}>
              Test kontenti
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}