import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { PHOTO_CREDITS } from "../../data/photoCredits";
import ThemeSwitcher from "../navbar/themeSwitcher";

interface Props {
  /** Show the credit line for the found photographs (homepage). */
  credits?: boolean;
}

/**
 * A single quiet line: what this is, the links, the year and the legal
 * pages. The page above has already made its invitation.
 */
function Footer({ credits = false }: Props) {
  const {
    name,
    showThemeSwitch,
    ui,
    footer: { links, legalLinks, socials },
  } = useContext(ConfigContext)!;

  return (
    // pb-28 on phones clears the sticky download bar.
    <footer className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-28 pt-[20svh] text-small md:pb-8">
      <div className="grid items-baseline gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <p className="text-muted">
          {name}, an iPhone trip planner made in Denmark
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          {links.map(({ title, href }) => (
            <li key={href}>
              <a className="ts-link text-ink" href={href}>
                {title}
              </a>
            </li>
          ))}
          {socials?.instagram && (
            <li>
              <a className="ts-link text-ink" href={socials.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          )}
          {socials?.facebook && (
            <li>
              <a className="ts-link text-ink" href={socials.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          )}
        </ul>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
          <span className="text-muted">© {new Date().getFullYear()}</span>
          {legalLinks.privacyPolicy && (
            <a className="ts-link text-ink" href="/privacy-policy/">
              Privacy
            </a>
          )}
          {legalLinks.termsAndConditions && (
            <a className="ts-link text-ink" href="/terms-and-conditions/">
              Terms
            </a>
          )}
          {legalLinks.cookiesPolicy && (
            <a className="ts-link text-ink" href="/cookies-policy/">
              Cookies
            </a>
          )}
          {showThemeSwitch && <ThemeSwitcher />}
        </div>
      </div>
      {credits && (
        <p className="mt-6 max-w-[110ch] text-muted">
          {ui?.photoCredits ?? "Photographs"}:{" "}
          {PHOTO_CREDITS.map((c, i) => (
            <span key={c.page}>
              <a className="ts-link" href={c.page} target="_blank" rel="noopener noreferrer">
                {c.title}
              </a>{" "}
              by {c.creator}, {c.license}
              {i < PHOTO_CREDITS.length - 1 ? "; " : ". "}
            </span>
          ))}
          App screens, step photographs and the demo video are from Travel Stories.
        </p>
      )}
    </footer>
  );
}

export default Footer;
