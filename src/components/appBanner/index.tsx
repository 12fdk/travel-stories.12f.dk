import { useContext, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withCampaign } from "../../utils/appStoreCampaign";
import AppleGlyph from "../appleGlyph";

/**
 * The close: a field in the action colour with the app's own first screen
 * already open. The destination is editable and the trip type switches; the
 * one button takes the visitor to the App Store to make it for real.
 */
function AppBanner() {
  const { appStoreLink, appBanner, ui, topNavbar, home } = useContext(ConfigContext)!;
  const [destination, setDestination] = useState(ui?.live?.tripName ?? "Porto & Lisbon");
  const types = (home?.useCases?.cards ?? []).slice(0, 2).map((c) => c.title);
  const [type, setType] = useState(0);

  if (!appBanner) return null;

  return (
    <section
      id={appBanner.id}
      aria-labelledby="app-banner-heading"
      className="bg-accent text-accent-ink"
    >
      <div className="mx-auto grid min-h-[90svh] max-w-[1440px] gap-12 px-[var(--gutter)] py-14 lg:grid-cols-12 lg:items-center lg:py-10">
        <div className="flex flex-col lg:col-span-5 lg:h-full lg:justify-end lg:pb-6" data-reveal>
          <h2 id="app-banner-heading" className="text-head font-light">
            {appBanner.title}
          </h2>
          <p className="mt-6 max-w-[42ch] text-body">{appBanner.subtitle}</p>
        </div>

        <div className="lg:col-span-5 lg:col-start-7" data-reveal-self>
          <form
            data-ui
            className="ts-ui ts-dialog"
            onSubmit={(e) => e.preventDefault()}
            aria-label={topNavbar.cta ?? "New trip"}
          >
            <p className="ts-dialog__title">{topNavbar.cta}</p>
            <label className="ts-dialog__field">
              <span className="sr-only">Destination</span>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                />
              </svg>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.currentTarget.value)}
                autoComplete="off"
              />
            </label>
            {types.length === 2 && (
              <div className="ts-dialog__segments" role="group" aria-label="Trip type">
                {types.map((t, i) => (
                  <button key={t} type="button" aria-pressed={type === i} onClick={() => setType(i)}>
                    {t}
                  </button>
                ))}
              </div>
            )}
            {appStoreLink && (
              <a
                href={withCampaign(appStoreLink, "app-banner")}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="footer-banner-app-store-click"
                className="ts-dialog__primary"
              >
                <AppleGlyph className="h-5 w-5" />
                {ui?.downloadFree ?? "Download free"}
              </a>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default AppBanner;
