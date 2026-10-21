import Link from "next/link";
import { couples, coupleSlugs } from "@/couples";
import EditorialCard from "@/components/EditorialCard";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-16">
      <EditorialCard className="w-full px-6 py-14 sm:px-12 sm:py-20 anim-fade-in">
        <p className="eyebrow text-center">Taklifnoma</p>
        <h1 className="font-display mt-5 text-center text-5xl text-charcoal">
          <span className="gold-foil">To&apos;y</span> taklifnomasi
        </h1>
        <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-charcoal-soft">
          Namuna sahifa:{" "}
          <code className="rounded bg-ivory-200 px-2 py-0.5">/demo</code>
        </p>
        <ul className="mt-12 w-full space-y-4">
          {coupleSlugs.map((slug) => {
            const c = couples[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="block w-full rounded-md border border-gold-300/50 bg-ivory-50/70 px-6 py-5 text-left transition-all duration-500 hover:-translate-y-0.5 hover:bg-ivory-100"
                >
                  <div className="font-display text-2xl text-charcoal">
                    {c.names.groomFull.uz} <span className="italic gold-foil">&amp;</span>{" "}
                    {c.names.brideFull.uz}
                  </div>
                  <div className="eyebrow mt-2">/{slug}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </EditorialCard>
    </main>
  );
}
