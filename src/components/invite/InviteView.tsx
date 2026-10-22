"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import Cover, { type CoverStage } from "./Cover";
import Hero from "./Hero";
import Letter from "./Letter";
import CoupleSection from "./CoupleSection";
import Countdown from "./Countdown";
import TestSection from "./TestSection";
import Rsvp from "./Rsvp";
import Contacts from "./Contacts";
import Outro from "./Outro";
import MusicButton from "@/components/ui/MusicButton";
import LangSwitch from "@/components/ui/LangSwitch";
import CursorFx from "@/components/fx/CursorFx";
import { DICT, pick } from "@/lib/dict";
import { useLang } from "@/lib/useLang";
import { useMusic } from "@/lib/useMusic";
import { initFx, refreshFx, revealHero, REDUCED } from "@/lib/fx";
import {
  formatDate,
  formatDateShort,
  formatPhone,
  targetTime,
} from "@/lib/format";
import type { Couple } from "@/lib/types";

type Phase = "preload" | "cover" | "content";

export default function InviteView({ couple }: { couple: Couple }) {
  const [phase, setPhase] = useState<Phase>("preload");
  const [stage, setStage] = useState<CoverStage>("idle");
  const [lang] = useLang();
  const music = useMusic(couple.music);
  const t = DICT[lang];

  /* effektlarni bir marta ishga tushirish */
  useEffect(() => {
    initFx();
  }, []);

  /* til almashganda yangilangan DOM ni qayta kuzatish */
  useEffect(() => {
    refreshFx();
  }, [lang]);

  /* sahifa scroll qilinmasligi (konvert ochiq bo'lmaganicha) */
  useEffect(() => {
    const locked = phase !== "content";
    document.documentElement.classList.toggle("is-locked", locked);
    document.body.classList.toggle("is-locked", locked);
  }, [phase]);

  useEffect(
    () => () => {
      document.documentElement.classList.remove("is-locked");
      document.body.classList.remove("is-locked");
    },
    [],
  );

  /**
   * Ochilish: konvert qopqog'i ochiladi → xat konvertdan chiqadi →
   * xat ekranni to'liq qoplab, asta yo'qoladi va taklifnoma ochiladi.
   */
  const open = () => {
    if (stage !== "idle") return;
    music.play();

    if (REDUCED) {
      setPhase("content");
      window.setTimeout(() => refreshFx(), 0);
      return;
    }

    setStage("opening");
    window.setTimeout(() => {
      setStage("morph");
      refreshFx();
      revealHero();
    }, 560);
    window.setTimeout(() => setStage("fade"), 1300);
    window.setTimeout(() => {
      setPhase("content");
      window.setTimeout(refreshFx, 30);
    }, 1820);
  };

  const groom = pick(couple.couple.groom, lang).trim();
  const bride = pick(couple.couple.bride, lang).trim();
  // Ism kiritilmagan bo'lsa, yakka "&" qolmasligi uchun
  const pair = [groom, bride].filter(Boolean).join(" & ");
  const dateStr = formatDate(couple.event.date, lang);
  const target = targetTime(
    couple.event.date,
    couple.event.time,
    couple.event.tzOffset,
  );
  const showContacts =
    couple.settings.showContacts &&
    !!(couple.contacts.phone || couple.contacts.telegram);

  return (
    <>
      <div className="progress" aria-hidden>
        <span />
      </div>

      <LangSwitch only={couple.settings.languages} />
      {couple.music ? <MusicButton music={music} label={t["share.open"]} /> : null}
      <CursorFx />

      <main id="main">
        <Hero
          hello={pick(couple.texts.hello, lang)}
          invited={pick(couple.texts.invitedTitle, lang)}
          groom={groom}
          bride={bride}
          date={dateStr}
          time={couple.event.time}
          heroImage={couple.images.hero}
          scrollLabel={t["hero.scroll"]}
          petals={couple.settings.petals}
        />

        <Letter
          title={pick(couple.texts.letterTitle, lang)}
          paragraphs={pick(couple.texts.letter, lang)
            .split(/\n{2,}|\n/)
            .map((p) => p.trim())
            .filter(Boolean)}
          signature={pick(couple.texts.signature, lang)}
          names={pair}
          verse={{
            arabic: couple.verse.arabic,
            text: pick(couple.verse.text, lang),
            ref: pick(couple.verse.ref, lang),
          }}
        />

        <CoupleSection
          title={pick(couple.event.title, lang)}
          groom={{
            role: t["couple.groom"],
            name: groom,
            parents: pick(couple.couple.groomParents, lang),
          }}
          bride={{
            role: t["couple.bride"],
            name: bride,
            parents: pick(couple.couple.brideParents, lang),
          }}
          archImage={couple.images.arch}
          ampersand="&"
        />

        {couple.settings.showCountdown && target ? (
          <Countdown
            title={t["count.title"]}
            labels={{
              days: t["count.days"],
              hours: t["count.hours"],
              mins: t["count.mins"],
              secs: t["count.secs"],
            }}
            doneText={t["count.done"]}
            target={target}
          />
        ) : null}

        {/* Lokatsiya vaqtincha olib tashlangan — o'rnida test bo'limi.
            Haqiqiy manzil kerak bo'lsa: <Venue .../> ni qaytarish yetarli. */}
        <TestSection
          lang={lang}
          title={{
            uz: "Test bo'lim",
            ru: "Тестовый раздел",
            en: "Test section",
          }}
          text={{
            uz: "Bu vaqtinchali — lokatsiya keyin qo'shiladi",
            ru: "Временно — локация будет добавлена позже",
            en: "Temporary — location will be added later",
          }}
        />

        {couple.rsvp.enabled ? (
          <Rsvp
            lang={lang}
            coupleLine={`${pair} — ${formatDateShort(couple.event.date)}`}
            bot={couple.rsvp.bot}
          />
        ) : null}

        {showContacts ? (
          <Contacts
            title={t["contacts.title"]}
            sub={t["contacts.sub"]}
            callLabel={t["contacts.call"]}
            phone={couple.contacts.phone}
            phoneValue={formatPhone(couple.contacts.phone)}
            telegram={couple.contacts.telegram}
          />
        ) : null}

        <Outro
          sub={pick(couple.texts.closingSub, lang)}
          title={pick(couple.texts.closing, lang)}
          names={pair}
          date={`${dateStr} · ${couple.event.time}`}
          shareText={t["share.text"]}
          copiedLabel={t["share.copied"]}
        />
      </main>

      {phase === "preload" ? (
        <Preloader monogram={couple.couple.monogram} onDone={() => setPhase("cover")} />
      ) : null}

      {phase !== "content" ? (
        <Cover
          names={pair}
          date={formatDateShort(couple.event.date)}
          monogram={couple.couple.monogram}
          eyebrow={t["cover.eyebrow"]}
          hint={t["cover.hint"]}
          openLabel={t["cover.open"]}
          stage={stage}
          onOpen={open}
        />
      ) : null}
    </>
  );
}