import { Use } from "@/components/Ornaments";
import type { CSSProperties } from "react";

type Props = {
  title: string;
  sub: string;
  callLabel: string;
  phone?: string;
  phoneValue?: string;
  telegram?: string;
};

/** Telefon va Telegram */
export default function Contacts({
  title,
  sub,
  callLabel,
  phone,
  phoneValue,
  telegram,
}: Props) {
  if (!phone && !telegram) return null;

  return (
    <section className="section" id="contacts">
      <div className="wrap wrap--narrow">
        <header className="head reveal" data-anim="fade-up">
          <Use id="orn-divider" className="orn" />
          <h2 className="head__title">{title}</h2>
          <p className="head__sub">{sub}</p>
        </header>

        <div className="contacts">
          {phone ? (
            <a
              className="contact tilt reveal"
              data-tilt={8}
              data-anim="fade-up"
              href={`tel:+${phone.replace(/\D/g, "")}`}
            >
              <span className="contact__ic">
                <Use id="ic-phone" />
              </span>
              <span className="contact__body">
                <b>{callLabel}</b>
                <em>{phoneValue}</em>
              </span>
            </a>
          ) : null}

          {telegram ? (
            <a
              className="contact contact--tg tilt reveal"
              data-tilt={8}
              data-anim="fade-up"
              style={{ "--d": "120ms" } as CSSProperties}
              href={`https://t.me/${encodeURIComponent(telegram.replace(/^@/, ""))}`}
              target="_blank"
              rel="noopener"
            >
              <span className="contact__ic">
                <Use id="ic-tg" />
              </span>
              <span className="contact__body">
                <b>Telegram</b>
                <em>@{telegram.replace(/^@/, "")}</em>
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}