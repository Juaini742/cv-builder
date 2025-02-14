import ArticleSection from "./_landing-page/article-section";
import BannerSection from "./_landing-page/banner-section";
import FeaturesSection from "./_landing-page/features-section";
import FooterSection from "./_landing-page/footer-section";
import GetStartedSection from "./_landing-page/get-started-section";
import HeroSection from "./_landing-page/hero-section";
import NavbarSection from "./_landing-page/navbar-section";
import TestimonialSection from "./_landing-page/testimonial-section";

export default function page() {
  return (
    <>
      <NavbarSection />
      <div className="mt-36 md:mt-10" />
      <HeroSection />
      <ArticleSection />
      <FeaturesSection />
      <TestimonialSection />
      <BannerSection />
      <GetStartedSection />
      <FooterSection />
    </>
  );
}
