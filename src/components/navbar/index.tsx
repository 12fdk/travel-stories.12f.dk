import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withCampaign } from "../../utils/appStoreCampaign";
import ThemeSwitcher from "./themeSwitcher";
import LanguageSwitcher from "../languageSwitcher";

interface Props {
  /**
   * Homepage only: on wide screens the bar sits over the reading column of
   * the split stage instead of above it, and the small name gives way to the
   * large one in the hero.
   */
  overlay?: boolean;
}

/** A plain bar: the name, a few links, the language, one action. */
function Navbar({ overlay = false }: Props) {
  const { showThemeSwitch, topNavbar, appStoreLink, homeHref = "/" } = useContext(ConfigContext)!;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cta = topNavbar.cta && appStoreLink && (
    <a
      href={withCampaign(appStoreLink, "navbar")}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="navbar-cta-click"
      aria-label={`${topNavbar.cta}: opens the App Store in a new tab`}
      className="ts-button !min-h-[44px] !px-4 !text-small"
    >
      {topNavbar.cta}
    </a>
  );

  return (
    <nav
      aria-label="Primary"
      className={clsx("relative z-30", overlay && "lg:absolute lg:left-[47vw] lg:right-0 lg:top-0")}
    >
      <div
        className={clsx(
          "flex h-[72px] items-center justify-between gap-4 px-[var(--gutter)]",
          overlay ? "lg:pl-[clamp(40px,5vw,96px)]" : "mx-auto max-w-[1440px]",
        )}
      >
        <a
          href={homeHref}
          className={clsx("text-body font-medium tracking-tight text-ink", overlay && "lg:invisible")}
        >
          travel stories
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <ul className="m-0 hidden list-none items-center gap-4 p-0 min-[1360px]:flex">
            {topNavbar.links.map(({ title, href }) => (
              <li key={href}>
                <a className="ts-link whitespace-nowrap text-small text-ink" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          {cta}
          <button
            type="button"
            className="min-h-[44px] px-2 text-small text-ink min-[1360px]:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ts-link">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="site-menu" className="bg-surface px-[var(--gutter)] pb-8 pt-4 min-[1360px]:hidden">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {topNavbar.links.map(({ title, href }) => (
              <li key={href}>
                <a
                  className="block py-2 text-lead text-ink"
                  href={href}
                  onClick={() => setOpen(false)}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-6">
            <LanguageSwitcher />
            {showThemeSwitch && <ThemeSwitcher />}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
