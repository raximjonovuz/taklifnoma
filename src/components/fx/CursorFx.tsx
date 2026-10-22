"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  REDUCED,
  getCursorSnapshot,
  mountCursorFx,
  stopCursorFx,
  subscribeCursor,
} from "@/lib/fx";

/**
 * Maxsus kursor (oltin nuqta + halqa), nur va oltin uchqunlar.
 * Sichqoncha aniqlanganda yoqiladi — telefon/touchscreen'da umuman yuklanmaydi.
 */
export default function CursorFx() {
  const on = useSyncExternalStore(
    subscribeCursor,
    getCursorSnapshot,
    () => false,
  );

  useEffect(() => {
    if (!on || REDUCED) return;
    mountCursorFx();
    return stopCursorFx;
  }, [on]);

  if (!on || REDUCED) return null;

  return (
    <>
      <div className="glow" id="glow" aria-hidden />
      <canvas className="fx" id="fx" aria-hidden />
      <div className="cursor" aria-hidden>
        <i className="cursor__dot" id="cursorDot" />
        <i className="cursor__ring" id="cursorRing" />
      </div>
    </>
  );
}