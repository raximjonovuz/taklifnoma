"use client";

import { Suspense, useState } from "react";
import { useLockScroll } from "@/lib/useLockScroll";
import { useAudio } from "@/lib/useAudio";
import Preloader from "@/components/Preloader";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import CoupleSection from "@/components/Couple";
import Countdown from "@/components/Countdown";
import Details from "@/components/Details";
import Contacts from "@/components/Contacts";
import Closing from "@/components/Closing";
import MusicButton from "@/components/MusicButton";
import LanguageButton from "@/components/LanguageButton";
import EditorialCard from "@/components/EditorialCard";
import type { Couple } from "@/lib/types";

type Phase = "preloading" | "envelope" | "content";

export default function InviteView({ couple }: { couple: Couple }) {
  const [phase, setPhase] = useState<Phase>("preloading");
  const audio = useAudio(couple.music);

  useLockScroll(phase !== "content");

  const openEnvelope = async () => {
    if (!audio.isPlaying) await audio.play();
    setPhase("content");
  };

  return (
    <>
      <LanguageButton />
      <main className="relative mx-auto w-full max-w-[560px] px-3 sm:px-4">
        <EditorialCard className="overflow-hidden anim-fade-in">
          {phase === "content" && (
            <div className="relative">
              <Hero couple={couple} />
              <Suspense fallback={null}>
                <Invitation couple={couple} />
              </Suspense>
              <div className="relative">
                <div
                  className="rule-gold mx-auto h-px w-3/4"
                  aria-hidden="true"
                />
              </div>
              <CoupleSection couple={couple} />
              <div
                className="rule-gold mx-auto h-px w-3/4"
                aria-hidden="true"
              />
              <Countdown dateISO={couple.date} />
              <div
                className="rule-gold mx-auto h-px w-3/4"
                aria-hidden="true"
              />
              <Details couple={couple} />
              <div
                className="rule-gold mx-auto h-px w-3/4"
                aria-hidden="true"
              />
              <Contacts couple={couple} />
              <Closing couple={couple} />
            </div>
          )}
        </EditorialCard>
        <MusicButton audio={audio} />
      </main>

      {phase === "preloading" && (
        <Preloader onDone={() => setPhase("envelope")} />
      )}
      {phase === "envelope" && (
        <Envelope
          groomName={couple.names.groomFull.uz}
          brideName={couple.names.brideFull.uz}
          dateLabel="15 · 11 · 2026"
          yearLabel={new Date(couple.date).getFullYear().toString()}
          onContinue={openEnvelope}
        />
      )}
    </>
  );
}
