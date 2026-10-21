"use client";

import { useState } from "react";
import Ornament from "./Ornament";
import Reveal from "./Reveal";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";

function initialsForGroomBride(groom: string, bride: string): string {
  const g = groom.trim().charAt(0).toUpperCase() || "J";
  const b = bride.trim().charAt(0).toUpperCase() || "M";
  return `${g}&${b}`;
}

type Step = "closed" | "torn";

export default function Envelope({
  groomName,
  brideName,
  dateLabel,
  yearLabel,
  onContinue,
}: {
  groomName: string;
  brideName: string;
  dateLabel: string;
  yearLabel: string;
  onContinue: () => void | Promise<void>;
}) {
  const { locale } = useLocale();
  const [step, setStep] = useState<Step>("closed");
  const [submitting, setSubmitting] = useState(false);
  const monogram = initialsForGroomBride(groomName, brideName);

  const handleSeal = () => {
    if (step !== "closed" || submitting) return;
    setStep("torn");
  };

  const handleContinue = async () => {
    if (step !== "torn" || submitting) return;
    setSubmitting(true);
    await onContinue();
  };

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-300">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.35),transparent_70%)]" />
      </div>

      <Reveal className="relative z-10 flex flex-col items-center px-6 pt-12 pb-10">
        <span className="eyebrow text-gold-600">
          {UI.envelopeHeader[locale].replace("2026", yearLabel)}
        </span>

        <div className={`mt-10 envelope-3d ${step === "torn" ? "env-open" : ""}`}>
          <div className="envelope-3d__base" />
          <div className="envelope-3d__letter">
            <div>
              <p className="font-display gold-foil text-2xl tracking-wide">
                {UI.invitationWord[locale]}
              </p>
              <div className="my-3 divider-ornament mx-auto" />
              <p className="eyebrow">{UI.sealCaption[locale]}</p>
            </div>
          </div>
          <div className="envelope-3d__flap">
            <div className="envelope-3d__flap-face" />
            <div className="envelope-3d__flap-back" />
          </div>
          {step === "closed" && (
            <div className="envelope-3d__seal-wrap">
              <button
                type="button"
                onClick={handleSeal}
                aria-label={UI.openSeal[locale]}
                className="wax-seal"
              >
                <span className="wax-seal__monogram">{monogram}</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 flex w-full max-w-[300px] flex-col items-center text-center">
          {step === "closed" ? (
            <div key="closed" className="flex flex-col items-center">
              <p className="font-display text-4xl leading-tight text-ink-primary">
                {groomName}
              </p>
              <p
                className="font-display italic gold-foil my-2 text-4xl leading-none"
                aria-hidden="true"
              >
                &amp;
              </p>
              <p className="font-display text-4xl leading-tight text-ink-primary">
                {brideName}
              </p>
              <p className="mt-5 font-mono text-[13px] tracking-[0.4em] text-gold-600">
                {dateLabel}
              </p>
            </div>
          ) : (
            <div key="torn" className="torn-content flex flex-col items-center">
              <Ornament />
              <p className="mt-6 font-display italic text-base text-charcoal-soft">
                {UI.swipeToContinue[locale]}
              </p>
            </div>
          )}
        </div>
      </Reveal>

      <div className="relative z-10 px-6 pb-12 pt-2">
        <button
          type="button"
          disabled={submitting}
          onClick={step === "closed" ? handleSeal : handleContinue}
          className={`btn-primary ${
            step === "torn" ? "torn-content" : ""
          }`}
        >
          <span className="relative z-10">
            {step === "closed"
              ? UI.openEnvelope[locale]
              : UI.continueCta[locale]}
          </span>
        </button>
        <p
          key={step}
          className={`mt-4 text-center font-display italic text-sm transition-opacity duration-500 ${
            step === "torn" ? "opacity-100" : "opacity-70"
          } text-charcoal-soft`}
        >
          {step === "closed" ? UI.sealCaption[locale] : UI.continueReady[locale]}
        </p>
      </div>
    </div>
  );
}
