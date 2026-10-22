"use client";

import { useRef, useState } from "react";
import { Use } from "@/components/Ornaments";
import { DICT } from "@/lib/dict";
import { BOT_USERNAME, buildRsvpText } from "@/lib/telegram";
import type { Lang } from "@/lib/types";

type Props = {
  lang: Lang;
  coupleLine: string;
  bot?: string;
};

/** Ishtirokni tasdiqlash (RSVP) */
export default function Rsvp({ lang, coupleLine, bot }: Props) {
  const t = DICT[lang];
  const form = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const step = (d: number) => setGuests((g) => Math.min(20, Math.max(1, g + d)));

  const field = (n: string) =>
    form.current?.elements.namedItem(n) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    const name = (field("name")?.value || "").trim();
    if (name.length < 2) {
      setMsg(t["rsvp.errName"]);
      nameRef.current?.focus();
      return;
    }

    const text = buildRsvpText(
      {
        name,
        attending: attending === "yes",
        guests,
        message: (field("message")?.value || "").trim(),
      },
      lang,
      coupleLine,
    );

    const user = (bot || BOT_USERNAME).replace(/^@/, "");
    const w = window.open(
      `https://t.me/${encodeURIComponent(user)}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
    if (!w) {
      setMsg(t["rsvp.errTelegram"]);
      return;
    }

    setDone(true);
    window.setTimeout(
      () =>
        document
          .getElementById("rsvp")
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      60,
    );
  };

  return (
    <section className="section section--paper" id="rsvp">
      <div className="wrap wrap--narrow">
        <header className="head reveal" data-anim="fade-up">
          <Use id="ic-heart" className="orn orn--icon" />
          <h2 className="head__title">{t["rsvp.title"]}</h2>
          <p className="head__sub">{t["rsvp.sub"]}</p>
        </header>

        {!done ? (
          <form
            className="form card reveal"
            data-anim="fade-up"
            ref={form}
            onSubmit={submit}
            noValidate
          >
            <label className="field">
              <span>{t["rsvp.name"]}</span>
              <input
                ref={nameRef}
                type="text"
                name="name"
                required
                maxLength={80}
                autoComplete="name"
                placeholder={t["rsvp.namePh"]}
              />
            </label>

            <div className="field">
              <span>{t["rsvp.attending"]}</span>
              <div className="choice">
                <label>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === "yes"}
                    onChange={() => setAttending("yes")}
                  />
                  <b>{t["rsvp.yes"]}</b>
                </label>
                <label>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === "no"}
                    onChange={() => setAttending("no")}
                  />
                  <b>{t["rsvp.no"]}</b>
                </label>
              </div>
            </div>

            <label
              className={`field${attending === "no" ? " is-hidden" : ""}`}
            >
              <span>{t["rsvp.guests"]}</span>
              <div className="stepper">
                <button type="button" onClick={() => step(-1)} aria-label="−">
                  −
                </button>
                <input
                  type="number"
                  name="guests"
                  value={guests}
                  min={1}
                  max={20}
                  inputMode="numeric"
                  readOnly
                  onChange={() => {}}
                />
                <button type="button" onClick={() => step(1)} aria-label="+">
                  +
                </button>
              </div>
            </label>

            <label className="field">
              <span>{t["rsvp.message"]}</span>
              <textarea
                name="message"
                rows={3}
                maxLength={500}
                placeholder={t["rsvp.messagePh"]}
              />
            </label>

            <button
              className="btn btn--gold btn--wide magnet"
              data-magnet
              type="submit"
            >
              <span>{t["rsvp.send"]}</span>
            </button>
            <p className="form__msg" role="status">
              {msg}
            </p>
          </form>
        ) : (
          <div className="thanks">
            <Use id="ic-check" className="thanks__check" />
            <h3>{t["rsvp.thanksTitle"]}</h3>
            <p>{t["rsvp.thanksText"]}</p>
          </div>
        )}
      </div>
    </section>
  );
}