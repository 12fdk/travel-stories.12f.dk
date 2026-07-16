import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import type { BlogTeaser } from "../../content/blog";
import Header from "./_components/header";
import Features from "./_components/features";
import Faq from "./_components/faq";
import HowItWorks from "./_components/howItWorks";
import Testimonials from "./_components/testimonials";
import Pricing from "./_components/pricing";
import FromTheBlog from "./_components/fromTheBlog";

interface Props {
  config: TemplateConfig;
  posts?: BlogTeaser[];
}

function Home({ config, posts = [] }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <Navbar />
      <main id="main">
        <Header />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FromTheBlog posts={posts} />
        <Faq />
        <AppBanner />
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default Home;
