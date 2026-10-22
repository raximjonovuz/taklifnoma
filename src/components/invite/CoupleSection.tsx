import { Use } from "@/components/Ornaments";

type Props = {
  title: string;
  groom: { role: string; name: string; parents: string };
  bride: { role: string; name: string; parents: string };
  archImage?: string;
  ampersand: string;
};

/** Kuyov va kelin */
export default function CoupleSection({
  title,
  groom,
  bride,
  archImage,
  ampersand,
}: Props) {
  return (
    <section className="section" id="couple">
      <div className="wrap">
        <header className="head reveal" data-anim="fade-up">
          <Use id="orn-rings" className="orn orn--icon" />
          <h2 className="head__title">{title}</h2>
        </header>

        <div className="couple">
          <div className="couple__side reveal" data-anim="fade-right">
            <p className="couple__role">{groom.role}</p>
            <h3 className="couple__name script">{groom.name}</h3>
            <p className="couple__parents">{groom.parents}</p>
          </div>

          <figure className="arch tilt reveal" data-tilt={7} data-anim="zoom">
            <span className="arch__halo" />
            <div className="arch__frame">
              {archImage ? (
                <img
                  src={archImage}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  data-parallax=".12"
                />
              ) : (
                <span className="arch__fallback" aria-hidden>
                  <Use id="orn-rings" />
                </span>
              )}
            </div>
            <span className="arch__amp script">{ampersand}</span>
          </figure>

          <div className="couple__side reveal" data-anim="fade-left">
            <p className="couple__role">{bride.role}</p>
            <h3 className="couple__name script">{bride.name}</h3>
            <p className="couple__parents">{bride.parents}</p>
          </div>
        </div>
      </div>
    </section>
  );
}