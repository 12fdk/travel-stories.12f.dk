import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import SectionCta from "../../components/sectionCta";
import StickyDownload from "../../components/stickyDownload";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import type { BlogTeaser } from "../../content/blog";
import type { AppStoreReview } from "../../utils/appStoreData";
import Header from "./_components/header";
import Facts from "./_components/facts";
import Features from "./_components/features";
import Capabilities from "./_components/capabilities";
import VideoDemo from "./_components/videoDemo";
import UseCases from "./_components/useCases";
import Faq from "./_components/faq";
import HowItWorks from "./_components/howItWorks";
import Comparison from "./_components/comparison";
import AppStoreReviews from "./_components/appStoreReviews";
import Pricing from "./_components/pricing";
import FromTheBlog from "./_components/fromTheBlog";

interface Props {
  config: TemplateConfig;
  posts?: BlogTeaser[];
  reviews?: AppStoreReview[];
}

function Home({ config, posts = [], reviews = [] }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Navbar />
      <main id="main">
        <Header />
        <Facts />
        <Features />
        <Capabilities />
        <VideoDemo />
        <UseCases />
        <SectionCta
          text="Ready to plan your next adventure?"
          trackingId="cta-after-use-cases"
        />
        <HowItWorks />
        <Comparison />
        <SectionCta
          text="Leave the spreadsheet at home this time."
          trackingId="cta-after-comparison"
        />
        <AppStoreReviews reviews={reviews} />
        <Pricing />
        <FromTheBlog posts={posts} />
        <Faq />
        <AppBanner />
      </main>
      <Footer />
      <StickyDownload />
    </ConfigContext.Provider>
  );
}

export default Home;
