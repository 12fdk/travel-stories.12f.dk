import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import SectionCta from "../../components/sectionCta";
import StickyDownload from "../../components/stickyDownload";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import type { BlogTeaser } from "../../content/blog";
import type { AppStoreReview } from "../../utils/appStoreData";
import SplitStage from "./_components/stage";
import VideoDemo from "./_components/videoDemo";
import Comparison from "./_components/comparison";
import Capabilities from "./_components/capabilities";
import Languages from "./_components/languages";
import AppStoreReviews from "./_components/appStoreReviews";
import Pricing from "./_components/pricing";
import PackingTool from "./_components/packingTool";
import FromTheBlog from "./_components/fromTheBlog";
import Faq from "./_components/faq";

interface Props {
  config: TemplateConfig;
  posts?: BlogTeaser[];
  reviews?: AppStoreReview[];
}

/**
 * The homepage reads as one trip (#88): the split stage carries the hero,
 * the features, the steps and the live trip card; after it the page runs
 * full width for the demo, the comparison, the details, the price and the
 * answers, and closes on the app's own first screen.
 */
function Home({ config, posts = [], reviews = [] }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Navbar overlay />
      <main id="main">
        <SplitStage />
        <SectionCta
          text={config.ui?.ctaAfterUseCases ?? "Ready to plan your next adventure?"}
          trackingId="cta-after-use-cases"
        />
        <div className="pt-[clamp(112px,12vw,200px)]">
          <VideoDemo />
        </div>
        <Comparison />
        <SectionCta
          text={config.ui?.ctaAfterComparison ?? "Leave the spreadsheet at home this time."}
          trackingId="cta-after-comparison"
        />
        <Capabilities />
        <Languages />
        <AppStoreReviews reviews={reviews} />
        <Pricing />
        <PackingTool />
        <FromTheBlog posts={posts} />
        <Faq />
        <AppBanner />
      </main>
      <Footer credits />
      <StickyDownload />
    </ConfigContext.Provider>
  );
}

export default Home;
