import { notFound } from "next/navigation";
import { Suspense } from "react";
import { coupleSlugs, getCouple } from "@/couples";
import InviteView from "@/components/InviteView";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return coupleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) return {};
  return {
    title: `${couple.names.groomFull.uz} & ${couple.names.brideFull.uz} — Taklifnoma`,
    description: couple.greeting.uz,
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
  return (
    <Suspense fallback={null}>
      <InviteView couple={couple} />
    </Suspense>
  );
}
