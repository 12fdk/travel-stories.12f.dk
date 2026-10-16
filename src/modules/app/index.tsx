import { useEffect } from "react";
import { getMobileOperatingSystem } from "utils/common";
import type { TemplateConfig } from "utils/configType";
import { withCampaign } from "utils/appStoreCampaign";

interface Props {
  config: TemplateConfig;
}

function AppRedirectionPage({ config }: Props) {
  const { googlePlayLink, appStoreLink } = config;

  useEffect(() => {
    const platform = getMobileOperatingSystem();
    if (platform === "ios" && appStoreLink)
      window.location.href = withCampaign(appStoreLink, "app-redirect");
    else if (platform === "android" && googlePlayLink)
      window.location.href = googlePlayLink;
    else window.location.href = "/";
  }, [googlePlayLink, appStoreLink]);

  return (
    <main className="flex h-[100svh] w-full flex-col items-center justify-center gap-6 px-[var(--gutter)]">
      <span className="loading loading-dots w-16"></span>
      <h1 className="max-w-md text-center text-lead">
        We're sending you to our app. If nothing happens, you'll be redirected
        shortly.
      </h1>
    </main>
  );
}

export default AppRedirectionPage;
