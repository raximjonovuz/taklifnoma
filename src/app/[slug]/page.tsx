import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { coupleSlugs, getCouple } from "@/couples";
import InviteView from "@/components/invite/InviteView";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/dict";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return coupleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) return {};

  const groom = couple.couple.groom.uz;
  const bride = couple.couple.bride.uz;
  const date = formatDate(couple.event.date, "uz");
  const title = `${groom} & ${bride} — ${pick(couple.event.title, "uz")}`;
  const description = `${date} · ${pick(couple.venue.name, "uz")}`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function CouplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) notFound();

  return <InviteView couple={couple} />;
}