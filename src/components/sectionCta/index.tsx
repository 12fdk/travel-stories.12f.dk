import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withCampaign } from "../../utils/appStoreCampaign";
import AppleGlyph from "../appleGlyph";

interface Props {
  text: string;
  /** Distinct Umami event name so each mid-scroll CTA is measurable. */
  trackingId: string;
}

/**
 * A one-line conversion row placed between long sections, an extra
 * download touchpoint for visitors who are already convinced mid-scroll.
 */
function SectionCta({ text, trackingId }: Props) {
  const { appStoreLink, ui } = useContext(ConfigContext)!;

  if (!appStoreLink) return null;

  return (
    <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-[clamp(96px,10vw,160px)]">
      <div
        className="flex flex-col items-start justify-between gap-6 rounded-ui bg-surface px-7 py-8 sm:flex-row sm:items-center lg:px-10"
        data-reveal
      >
        <p className="text-lead text-ink">{text}</p>
        <a
          href={withCampaign(appStoreLink, "section-cta")}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event={trackingId}
          className="ts-button"
        >
          <AppleGlyph className="h-5 w-5" />
          {ui?.downloadFree ?? "Download free"}
        </a>
      </div>
    </div>
  );
}

export default SectionCta;
