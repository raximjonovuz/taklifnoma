import type { CSSProperties } from "react";

/** Bezak va ikonkalar — bitta SVG kutubxonasi (sahifa boshida bir marta) */
export function Symbols() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#F3E3B6" />
          <stop offset=".5" stopColor="#C9A45C" />
          <stop offset="1" stopColor="#8E6F2E" />
        </linearGradient>

        <symbol id="orn-divider" viewBox="0 0 240 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <path d="M8 12h72" />
            <path d="M160 12h72" />
            <path d="M96 12c6-8 14-8 18 0 4 8 12 8 18 0" />
            <path d="M96 12c6 8 14 8 18 0" />
          </g>
          <circle cx="120" cy="6" r="1.8" fill="currentColor" />
          <circle cx="88" cy="12" r="1.4" fill="currentColor" />
          <circle cx="152" cy="12" r="1.4" fill="currentColor" />
        </symbol>

        <symbol id="orn-corner" viewBox="0 0 120 120">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          >
            <path d="M6 114C6 60 30 22 78 10" />
            <path d="M14 114C16 70 38 36 74 24" />
            <path d="M40 76c-9-4-14-13-11-22 9-1 17 4 19 13" />
            <path d="M48 67c3-9 12-14 21-11 1 9-4 17-13 19" />
            <path d="M26 96c-8-2-13-9-12-17 8-2 15 2 17 10" />
            <path d="M62 44c2-8 9-13 17-12 2 8-2 15-10 17" />
          </g>
          <g fill="currentColor" opacity=".55">
            <circle cx="86" cy="18" r="2.2" />
            <circle cx="70" cy="34" r="1.6" />
            <circle cx="34" cy="86" r="1.6" />
            <circle cx="18" cy="104" r="2.2" />
          </g>
        </symbol>

        <symbol id="orn-rings" viewBox="0 0 48 32">
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="18" cy="18" r="10" />
            <circle cx="30" cy="18" r="10" />
            <path d="M24 5l2.4 3.6L24 12l-2.4-3.4z" />
          </g>
        </symbol>

        <symbol id="orn-star" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z"
          />
        </symbol>

        <symbol id="ic-heart" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 21s-7.5-4.7-9.6-9.2C.7 8.1 2.6 4.6 6 4c2.2-.4 4.3.7 6 2.6C13.7 4.7 15.8 3.6 18 4c3.4.6 5.3 4.1 3.6 7.8C19.5 16.3 12 21 12 21z"
          />
        </symbol>

        <symbol id="ic-pin" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </g>
        </symbol>

        <symbol id="ic-clock" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5.2l3.4 2" />
          </g>
        </symbol>

        <symbol id="ic-cal" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </g>
        </symbol>

        <symbol id="ic-phone" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z"
          />
        </symbol>

        <symbol id="ic-tg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.9 4.3L18.9 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.9 13 2.3 11.5c-1-.3-1-1 .2-1.5l18.1-7c.8-.3 1.5.2 1.3 1.3z"
          />
        </symbol>

        <symbol id="ic-copy" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </g>
        </symbol>

        <symbol id="ic-search" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" />
          </g>
        </symbol>

        <symbol id="ic-check" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" />
          <path d="M14 27l8 8 16-17" />
        </symbol>
      </defs>
    </svg>
  );
}

type UseProps = {
  id: string;
  className?: string;
  style?: CSSProperties;
};

/** <symbol> dan foydalanish */
export function Use({ id, className, style }: UseProps) {
  return (
    <svg className={className} style={style} aria-hidden focusable="false">
      <use href={`#${id}`} />
    </svg>
  );
}

export function Divider({ sm, draw, className = "" }: { sm?: boolean; draw?: boolean; className?: string }) {
  return (
    <Use
      id="orn-divider"
      className={`orn ${sm ? "orn--sm" : ""} ${draw ? "orn--draw" : ""} ${className}`.trim()}
    />
  );
}

export function Corner({ className = "" }: { className?: string }) {
  return <Use id="orn-corner" className={`${className}`.trim()} />;
}

export function Icon({ id, className }: { id: string; className?: string }) {
  return <Use id={id} className={className} />;
}