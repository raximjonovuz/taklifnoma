"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Use } from "@/components/Ornaments";
import LangSwitch from "@/components/ui/LangSwitch";
import Petals from "@/components/fx/Petals";
import CursorFx from "@/components/fx/CursorFx";
import { DICT, pick } from "@/lib/dict";
import { useLang } from "@/lib/useLang";
import { initFx } from "@/lib/fx";
import { formatDate, normalize } from "@/lib/format";
import { TELEGRAM_BOT, telegramLink } from "@/lib/site";
import { BOT_USERNAME, buildContactText } from "@/lib/telegram";
import type { CoupleIndexItem, Lang } from "@/lib/types";

export type View = "home" | "search" | "contact";

const HOW = ["lp.how.1", "lp.how.2", "lp.how.3"] as const;
const FEATURES = ["lp.features.1", "lp.features.2", "lp.features.3"] as const;

const isView = (v: string): v is View =>
  v === "home" || v === "search" || v === "contact";

/** Ko'rinish `#hash` orqali saqlanadi — orqaga tugmasi ishlaydi */
function useHashView(): [View, (v: View) => void] {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("hashchange", cb);
    return () => window.removeEventListener("hashchange", cb);
  }, []);

  const view = useSyncExternalStore(
    subscribe,
    () => {
      const h = window.location.hash.replace("#", "");
      return isView(h) ? h : "home";
    },
    () => "home" as View,
  );

  const go = useCallback((v: View) => {
    if (window.location.hash.replace("#", "") !== v) {
      window.history.replaceState(null, "", `#${v}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new Event("hashchange"));
  }, []);

  return [view, go];
}

type Props = {
  couples: CoupleIndexItem[];
  phone?: string;
};

export default function Landing({ couples, phone }: Props) {
  const [lang] = useLang();
  const t = DICT[lang];
  const [view, go] = useHashView();

  useEffect(() => {
    initFx();
  }, []);

  return (
    <div className="lp">
      <nav className="lp__nav">
        <Link href="/" className="lp__brand">
          <Use id="orn-rings" className="lp__brand-ic" />
          <b>{t["brand"]}</b>
        </Link>
        <LangSwitch className="lang--inline" />
        <div className="lp__tabs" role="tablist">
          {(["home", "search", "contact"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              className={`lp__tab${view === v ? " is-on" : ""}`}
              onClick={() => go(v)}
            >
              {t[`nav.${v}` as const]}
            </button>
          ))}
        </div>
      </nav>

      <main className="lp__main" key={view}>
        {view === "home" ? (
          <Home lang={lang} onSearch={() => go("search")} onContact={() => go("contact")} />
        ) : view === "search" ? (
          <Search lang={lang} couples={couples} onContact={() => go("contact")} />
        ) : (
          <Contact lang={lang} phone={phone} />
        )}
      </main>

      <footer className="lp__footer">
        <b>{t["brand"]}</b>
        <span>{t["lp.footer.text"]}</span>
        <span>{t["lp.footer.privacy"]}</span>
      </footer>

      <Petals />
      <CursorFx />
    </div>
  );
}

/* ───────────────────────── Bosh sahifa ───────────────────────── */
function Home({
  lang,
  onSearch,
  onContact,
}: {
  lang: Lang;
  onSearch: () => void;
  onContact: () => void;
}) {
  const t = DICT[lang];
  return (
    <>
      <div className="lp__hero">
        <Use id="orn-divider" className="orn orn--sm" />
        <h1 className="lp__title">{t["lp.hero.title"]}</h1>
        <p className="lp__sub">{t["lp.hero.sub"]}</p>
        <div className="lp__cta">
          <button
            className="btn btn--gold magnet"
            data-magnet
            type="button"
            onClick={onSearch}
          >
            <span>{t["lp.hero.cta"]}</span>
          </button>
          <button
            className="btn btn--ghost magnet"
            data-magnet
            type="button"
            onClick={onContact}
          >
            <span>{t["lp.hero.cta2"]}</span>
          </button>
        </div>
      </div>

      <h2 className="lp__sectitle" style={{ marginTop: "clamp(48px,8vw,80px)" }}>
        {t["lp.how.title"]}
      </h2>
      <div className="lp__cards">
        {HOW.map((k, i) => (
          <div className="lp__card" key={k}>
            <span className="lp__card-n">{i + 1}</span>
            <h3>{t[`${k}.t`]}</h3>
            <p>{t[`${k}.d`]}</p>
          </div>
        ))}
      </div>

      <h2 className="lp__sectitle" style={{ marginTop: "clamp(40px,7vw,64px)" }}>
        {t["lp.features.title"]}
      </h2>
      <div className="lp__cards">
        {FEATURES.map((k) => (
          <div className="lp__card" key={k}>
            <h3>{t[`${k}.t`]}</h3>
            <p>{t[`${k}.d`]}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ───────────────────────── Qidiruv ───────────────────────── */
function Search({
  lang,
  couples,
  onContact,
}: {
  lang: Lang;
  couples: CoupleIndexItem[];
  onContact: () => void;
}) {
  const t = DICT[lang];
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const results = useMemo(() => {
    const n = normalize(q);
    if (n.length < 2) return [];
    return couples.filter((c) => {
      const hay = [
        c.slug.replace(/-/g, " "),
        ...Object.values(c.groom),
        ...Object.values(c.bride),
      ]
        .map(normalize)
        .join(" ");
      return hay.includes(n);
    });
  }, [q, couples]);

  return (
    <>
      <div className="lp__hero">
        <Use id="ic-search" className="orn orn--icon" />
        <h1 className="lp__title">{t["lp.search.title"]}</h1>
        <p className="lp__sub">{t["lp.search.sub"]}</p>
      </div>

      <form
        className="lp__search"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <div className="lp__search-row">
          <label className="field" style={{ flex: 1 }}>
            <span className="sr">{t["lp.search.title"]}</span>
            <input
              ref={input}
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t["lp.search.ph"]}
              autoComplete="off"
            />
          </label>
          <button className="btn btn--gold magnet" data-magnet type="submit">
            <span>{t["lp.search.btn"]}</span>
          </button>
        </div>
      </form>

      <div className="lp__results">
        {normalize(q).length < 2 ? null : results.length === 0 ? (
          <div className="lp__empty">
            <b>{t["lp.search.empty"]}</b>
            <span>{t["lp.search.emptySub"]}</span>
            <button
              className="btn btn--ghost magnet"
              data-magnet
              type="button"
              onClick={onContact}
              style={{ marginTop: 10 }}
            >
              <span>{t["lp.contact.title"]}</span>
            </button>
          </div>
        ) : (
          results.map((c) => (
            <Link key={c.slug} href={`/${c.slug}/`} className="lp__result">
              <span className="lp__result-ic">{c.monogram}</span>
              <span className="lp__result-body">
                <b>
                  {pick(c.groom, lang)} &amp; {pick(c.bride, lang)}
                </b>
                <em>
                  {t["lp.search.date"]}: {formatDate(c.date, lang)}
                </em>
              </span>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

/* ───────────────────────── Kontakt ───────────────────────── */
function Contact({ lang, phone }: { lang: Lang; phone?: string }) {
  const t = DICT[lang];
  const form = useRef<HTMLFormElement>(null);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const field = (n: string) =>
    form.current?.elements.namedItem(n) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (field("name")?.value || "").trim();
    if (name.length < 2) {
      setMsg(t["rsvp.errName"]);
      return;
    }
    setMsg("");
    const text = buildContactText(
      {
        name,
        event: (field("event")?.value || "").trim(),
        message: (field("message")?.value || "").trim(),
      },
      lang,
    );
    const w = window.open(
      telegramLink(BOT_USERNAME, text),
      "_blank",
      "noopener",
    );
    if (!w) {
      setMsg(t["rsvp.errTelegram"]);
      return;
    }
    setSent(true);
  };

  return (
    <>
      <div className="lp__hero">
        <Use id="orn-divider" className="orn orn--sm" />
        <h1 className="lp__title">{t["lp.contact.title"]}</h1>
        <p className="lp__sub">{t["lp.contact.sub"]}</p>
      </div>

      {sent ? (
        <div className="lp__empty">
          <Use id="ic-check" className="thanks__check" />
          <b>{t["rsvp.thanksTitle"]}</b>
          <span>{t["rsvp.thanksText"]}</span>
        </div>
      ) : (
        <form className="lp__form card" ref={form} onSubmit={submit} noValidate>
          <label className="field">
            <span>{t["lp.contact.name"]}</span>
            <input
              type="text"
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              placeholder={t["lp.contact.namePh"]}
            />
          </label>
          <label className="field">
            <span>{t["lp.contact.event"]}</span>
            <input
              type="text"
              name="event"
              maxLength={200}
              placeholder={t["lp.contact.eventPh"]}
            />
          </label>
          <label className="field">
            <span>{t["lp.contact.message"]}</span>
            <textarea
              name="message"
              rows={3}
              maxLength={500}
              placeholder={t["lp.contact.messagePh"]}
            />
          </label>
          <button className="btn btn--gold btn--wide magnet" data-magnet type="submit">
            <span>{t["lp.contact.send"]}</span>
          </button>
          <p className="lp__form-msg" role="status">
            {msg}
          </p>
        </form>
      )}

      <div className="lp__direct">
        <span>{t["lp.contact.or"]}</span>
        {phone ? (
          <a className="btn btn--ghost magnet" data-magnet href={`tel:+${phone.replace(/\D/g, "")}`}>
            <span>{t["lp.contact.call"]}</span>
          </a>
        ) : null}
        <a
          className="btn btn--ghost magnet"
          data-magnet
          href={telegramLink(TELEGRAM_BOT.username)}
          target="_blank"
          rel="noopener"
        >
          <span>{t["lp.contact.telegram"]}</span>
        </a>
      </div>
    </>
  );
}