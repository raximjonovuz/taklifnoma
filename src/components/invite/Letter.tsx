import { Divider, Use } from "@/components/Ornaments";

type Props = {
  title: string;
  paragraphs: string[];
  signature: string;
  names: string;
  verse: { arabic: string; text: string; ref: string };
};

/** Taklif xati + Qur'on oyati */
export default function Letter({
  title,
  paragraphs,
  signature,
  names,
  verse,
}: Props) {
  return (
    <section className="section section--paper" id="letter">
      <div className="deco deco--l" aria-hidden>
        <Use id="orn-corner" />
      </div>
      <div className="deco deco--r" aria-hidden>
        <Use id="orn-corner" />
      </div>

      <div className="wrap wrap--narrow">
        <article className="card card--letter tilt reveal" data-tilt={4} data-anim="fade-up">
          <span className="card__glare" />
          <Use id="orn-corner" className="card__corner card__corner--tl" />
          <Use id="orn-corner" className="card__corner card__corner--tr" />
          <Use id="orn-corner" className="card__corner card__corner--bl" />
          <Use id="orn-corner" className="card__corner card__corner--br" />

          <div className="verse">
            <p className="verse__ar reveal" data-anim="zoom" lang="ar" dir="rtl">
              {verse.arabic}
            </p>
            <p className="verse__tr reveal" data-anim="fade-up">
              {verse.text}
            </p>
            <p className="verse__ref reveal" data-anim="fade-up">
              <span>{verse.ref}</span>
            </p>
            <Divider sm draw />
          </div>

          <h2 className="card__title">{title}</h2>
          <Divider sm />

          <div className="letter__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="letter__sign">
            <span>{signature}</span>
            <b className="script">{names}</b>
          </p>
        </article>
      </div>
    </section>
  );
}