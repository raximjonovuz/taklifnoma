"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, Use } from "@/components/Ornaments";

type Props = {
  title: string;
  name: string;
  address: string;
  note: string;
  date: string;
  time: string;
  lat: number;
  lng: number;
  mapsUrl?: string;
  yandexUrl?: string;
  photo?: string;
  lang: string;
  googleLabel: string;
  yandexLabel: string;
  mapLabel: string;
};

/** Manzil + xarita (iframe ko'rinmaganda yuklanadi) */
export default function Venue({
  title,
  name,
  address,
  note,
  date,
  time,
  lat,
  lng,
  mapsUrl,
  yandexUrl,
  photo,
  lang,
  googleLabel,
  yandexLabel,
  mapLabel,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || map) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [map]);

  const google = mapsUrl || `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const yandex = yandexUrl || `https://yandex.uz/maps/?rtext=~${lat},${lng}&rtt=auto`;
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=${
    lang === "uz" ? "ru" : lang
  }&output=embed`;

  return (
    <section className="section" id="venue">
      <div className="wrap">
        <header className="head reveal" data-anim="fade-up">
          <Use id="ic-pin" className="orn orn--icon" />
          <h2 className="head__title">{title}</h2>
        </header>

        <div className="venue tilt reveal" data-tilt={3} data-anim="fade-up">
          <span className="card__glare" />
          <figure className="venue__photo">
            {photo ? (
              <img
                src={photo}
                alt=""
                loading="lazy"
                decoding="async"
                data-parallax=".1"
              />
            ) : (
              <span className="venue__fallback" aria-hidden>
                <Use id="ic-pin" />
              </span>
            )}
          </figure>

          <div className="venue__info">
            <h3 className="venue__name">{name}</h3>
            <p className="venue__addr">{address}</p>
            <p className="venue__note">{note}</p>
            <div className="chips">
              <span className="chip">
                <Icon id="ic-cal" />
                <b>{date}</b>
              </span>
              <span className="chip">
                <Icon id="ic-clock" />
                <b>{time}</b>
              </span>
            </div>
            <div className="venue__actions">
              <a
                className="btn btn--gold magnet"
                data-magnet
                href={google}
                target="_blank"
                rel="noopener"
              >
                <span>{googleLabel}</span>
              </a>
              <a
                className="btn btn--ghost magnet"
                data-magnet
                href={yandex}
                target="_blank"
                rel="noopener"
              >
                <span>{yandexLabel}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="map reveal" data-anim="fade-up" ref={box}>
          {map ? (
            <iframe
              title={mapLabel}
              src={src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <button
              type="button"
              className="map__ph magnet"
              data-magnet
              onClick={() => setMap(true)}
            >
              <Icon id="ic-pin" />
              <span>{mapLabel}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}