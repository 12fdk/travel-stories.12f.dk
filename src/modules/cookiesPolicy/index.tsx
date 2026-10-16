import AppBanner from "@components/appBanner";
import Footer from "@components/footer";
import Navbar from "@components/navbar";
import Markdown from "react-markdown";
import { ConfigContext } from "utils/configContext";
import type { TemplateConfig } from "utils/configType";

interface Props {
  config: TemplateConfig;
}

function CookiesPolicyPage({ config }: Props) {
  const { cookiesPolicy } = config;

  return (
    <ConfigContext.Provider value={config}>
      <main>
        <Navbar />
        <section className="mx-auto max-w-[46rem] px-[var(--gutter)] pb-[clamp(96px,10vw,160px)] pt-[clamp(40px,6vw,96px)]">
          <div data-reveal-each className="prose max-w-none prose-h1:text-head prose-h1:font-light">
            <Markdown>{cookiesPolicy.content}</Markdown>
          </div>
        </section>
        <AppBanner />
        <Footer />
      </main>
    </ConfigContext.Provider>
  );
}

export default CookiesPolicyPage;
