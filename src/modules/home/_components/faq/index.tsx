import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * Every answer in plain reading text, like the notes at the back of a
 * programme: the question is the run-in, the answer follows on the same line.
 * No toggles, so everything is answered at a glance and crawlers see it all.
 */
function Faq() {
  const {
    home: { faq },
  } = useContext(ConfigContext)!;

  if (!faq) return null;

  return (
    <section
      id={faq.id}
      aria-labelledby="faq-heading"
      className="mx-auto grid max-w-[1440px] gap-10 px-[var(--gutter)] py-[clamp(112px,12vw,200px)] lg:grid-cols-12"
    >
      <h2 id="faq-heading" className="self-start text-head font-light lg:col-span-4" data-reveal-self>
        {faq.title}
      </h2>
      <div className="lg:col-span-8 lg:col-start-5 md:columns-2 md:gap-14" data-reveal-self>
        {faq.qa.map((qa) => (
          <p key={qa.question} className="faq-item mb-5 break-inside-avoid text-body text-muted">
            <strong className="font-medium text-ink">{qa.question}</strong> {qa.answer}
          </p>
        ))}
      </div>
    </section>
  );
}

export default Faq;
