import Landing from "@/components/landing/Landing";
import { coupleIndex } from "@/couples";
import { CONTACT } from "@/lib/site";

/** Landing sahifa. Subdomen → taklifnoma qaytasi `layout.tsx` dagi skriptda. */
export default function Home() {
  return <Landing couples={coupleIndex} phone={CONTACT.phone} />;
}