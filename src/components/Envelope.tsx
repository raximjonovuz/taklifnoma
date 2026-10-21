"use client";

import { useMemo, useState } from "react";
import Ornament from "./Ornament";
import { UI } from "@/lib/translations";
import { useLocale } from "@/lib/LocaleContext";

function initialsForGroomBride(groom: string, bride: string): string {
  const g = groom.trim().charAt(0).toUpperCase() || "J";
  const b = bride.trim().charAt(0).toUpperCase() || "M";
  return `${g} & ${b}`;
}

export default function Envelope({
  groomName,
  brideName,
  onOpen,
}: {
  groomName: string;
  brideName: string;
  onOpen: () => void | Promise<void>;
}) {
  const { locale } = useLocale();
  const [opening, setOpening] = useState(false);
  const monogram = useMemo(
    () => initialsForGroomBride(groomName, brideName),
    [groomName, brideName],
  );

  const handleOpen = async () => {
    if (opening) return;
    setOpening(true);
    await onOpen();
  };

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200 px-6">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,103,0.25),transparent_70%)]" />
      </div>

      <div
        className={`envelope-3d ${opening ? "env-open" : ""}`}
        aria-hidden="true"
      >
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
        <div className="envelope-3d__seal-wrap">
          <button
            type="button"
            onClick={handleOpen}
            aria-label={UI.openSeal[locale]}
            className="wax-seal"
          >
            <span className="wax-seal__monogram">{monogram}</span>
          </button>
        </div>
      </div>

      <p
        className={`mt-12 text-center anim-fade-up anim-delay-1 transition-opacity duration-500 ${
          opening ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="eyebrow block">{UI.openSeal[locale]}</span>
        <span className="mt-3 inline-block font-display italic text-base text-charcoal-soft">
          {UI.sealCaption[locale]}
        </span>
      </p>
      <div className={`mt-6 ${opening ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        <Ornament />
      </div>
    </div>
  );
}
