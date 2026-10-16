import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ConfigContext } from "../../utils/configContext";
import { withCampaign } from "../../utils/appStoreCampaign";
import type { TemplateConfig } from "../../utils/configType";

interface Props {
  config: TemplateConfig;
}

/**
 * Branded 404. Keeps the site chrome (navbar/footer) so a dead link is a
 * detour, not a dead end — and points at the pages people usually wanted.
 */
function NotFound({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Navbar />
      <main id="main" className="px-[var(--gutter)] py-[clamp(96px,14vw,200px)]">
        <div className="mx-auto w-full max-w-[1440px]" data-reveal>
          <p className="text-display font-light tabular text-muted">404</p>
          <h1 className="mt-6 max-w-[20ch] text-head font-light">
            This page wandered off the itinerary.
          </h1>
          <p className="mt-6 max-w-xl text-body text-ink">
            The page you're after was moved, renamed, or never existed. The rest
            of the site is right where you left it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="/" className="ts-button">
              Back to the homepage
            </a>
            <a href="/blog/" className="ts-link text-body text-ink">
              Read the blog
            </a>
            <a href="/packing-list/" className="ts-link text-body text-ink">
              Build a packing list
            </a>
            <a
              href={withCampaign(config.appStoreLink, "404")}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="404-cta-click"
              className="ts-link text-body text-ink"
            >
              Get the app
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;
