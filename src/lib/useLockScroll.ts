"use client";

import { useEffect } from "react";

export function useLockScroll(locked: boolean): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const html = document.documentElement;
    if (locked) {
      const prevBody = body.style.overflow;
      const prevHtml = html.style.overflow;
      const prevPadRight = body.style.paddingRight;
      const scrollbar = window.innerWidth - html.clientWidth;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
      body.dataset.scrollLocked = "true";
      return () => {
        body.style.overflow = prevBody;
        html.style.overflow = prevHtml;
        body.style.paddingRight = prevPadRight;
        delete body.dataset.scrollLocked;
      };
    }
    return;
  }, [locked]);
}
