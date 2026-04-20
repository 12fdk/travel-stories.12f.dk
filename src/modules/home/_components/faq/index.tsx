import AnimatedText from "../../../../components/animatedText";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import NeonHexagon from "./svgs/neonHexagon";

function Faq() {
  const {
    home: { faq },
  } = useContext(ConfigContext)!;

  if (!faq) return null;

  return (
    <section id={faq.id} aria-labelledby="faq-heading" className="max-w-screen-lg mx-auto px-4 mb-12">
      <div className="flex flex-col md:flex-row">
        <div className="relative flex-1 flex items-center">
          <NeonHexagon />
          <div className="h-full w-full flex items-center justify-center">
            <h2
              id="faq-heading"
              className="text-center font-bold text-3xl flex flex-col items-center mb-8 md:mb-0 md:text-left"
            >
              <AnimatedText text={faq.title} initial={{ y: "0%" }} />
            </h2>
          </div>
        </div>
        <ol role="list" className="flex-1 list-none p-0 m-0">
          {faq.qa.map((qa, index) => (
            <li key={index} role="listitem" className="m-0 p-0">
              <details
                className="faq-item group border-2 border-primary/20 hover:border-primary/40 focus-within:border-primary/60 rounded-2xl my-2 transition-colors duration-200"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-lg font-medium select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl">
                  <span>{qa.question}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="shrink-0 w-5 h-5 text-primary transition-transform duration-300 group-open:rotate-45"
                    fill="currentColor"
                  >
                    <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 pt-0 text-base-content/90 leading-relaxed">
                  {qa.answer}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Faq;
