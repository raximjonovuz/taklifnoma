import type { ReactNode } from "react";

export default function EditorialCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative editorial-card ${className}`}>
      <CornerFlourish corner="tl" />
      <CornerFlourish corner="tr" />
      <CornerFlourish corner="bl" />
      <CornerFlourish corner="br" />
      <div className="relative">{children}</div>
    </div>
  );
}

function CornerFlourish({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const cls = `corner-flourish corner-flourish--${corner}`;
  return (
    <svg
      viewBox="0 0 44 44"
      className={cls}
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M2 14 V2 H14" />
      <path d="M2 22 V2" opacity="0.5" />
      <path d="M22 2 H2" opacity="0.5" />
      <path d="M10 10 Q 18 6, 22 10 T 26 18" opacity="0.7" />
      <circle cx="22" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}
