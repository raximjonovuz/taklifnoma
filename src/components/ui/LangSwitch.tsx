"use client";

import { LANGS_ORDER } from "@/lib/dict";
import { useLang } from "@/lib/useLang";
import type { Lang } from "@/lib/types";

const LABEL: Record<Lang, string> = { uz: "UZ", ru: "RU", en: "EN" };

export default function LangSwitch({
  only,
  className = "",
}: {
  only?: Lang[];
  className?: string;
}) {
  const [lang, setLang] = useLang();
  const list = only ?? LANGS_ORDER;

  return (
    <div className={`lang ${className}`.trim()} role="group" aria-label="Til">
      {list.map((l) => (
        <button
          key={l}
          type="button"
          className={l === lang ? "is-on" : ""}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
        >
          {LABEL[l]}
        </button>
      ))}
    </div>
  );
}