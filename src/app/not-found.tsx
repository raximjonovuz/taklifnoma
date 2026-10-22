import Link from "next/link";
import { DICT } from "@/lib/dict";
import { Use } from "@/components/Ornaments";

export const metadata = { title: "Topilmadi" };

export default function NotFound() {
  const t = DICT.uz;
  return (
    <main className="nf">
      <div style={{ display: "grid", justifyItems: "center", gap: 14 }}>
        <Use id="orn-divider" className="orn orn--sm" />
        <h1>{t["notfound.title"]}</h1>
        <p>{t["notfound.sub"]}</p>
        <Link className="btn btn--gold magnet nf__cta" data-magnet href="/">
          <span>{t["notfound.cta"]}</span>
        </Link>
      </div>
    </main>
  );
}