import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withCampaign } from "../../utils/appStoreCampaign";

/**
 * Phone-only: the download action follows you down the page, quietly. It
 * steps aside while you scroll down to read, so it never sits on top of the
 * text, and comes back as soon as you scroll up or reach the end.
 */
function StickyDownload() {
  const { appStoreLink, ui } = useContext(ConfigContext)!;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 120;
      const goingUp = y < last - 4;
      const goingDown = y > last + 4;
      if (y <= 480) setShown(false);
      else if (goingUp || atEnd) setShown(true);
      else if (goingDown) setShown(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!appStoreLink) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-ground p-3 transition-[opacity,transform] duration-300 md:hidden print:hidden"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(24px)",
        pointerEvents: shown ? "auto" : "none",
        visibility: shown ? "visible" : "hidden",
        transitionProperty: "opacity, transform, visibility",
      }}
    >
      <a
        href={withCampaign(appStoreLink, "sticky")}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="sticky-download-click"
        tabIndex={shown ? 0 : -1}
        className="ts-button w-full"
      >
        {ui?.downloadFree ?? "Download free"}
        <span className="text-small opacity-80">{ui?.stickyNote ?? "iOS 17+"}</span>
      </a>
    </div>
  );
}

export default StickyDownload;
