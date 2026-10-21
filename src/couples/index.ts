import demo from "./demo";
import type { Couple } from "@/lib/types";

export const couples: Record<string, Couple> = {
  demo,
};

export const coupleSlugs = Object.keys(couples);

export function getCouple(slug: string): Couple | undefined {
  return couples[slug];
}
