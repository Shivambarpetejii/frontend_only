// import Navbar from "../components/layout/Navbar";
import HeroSection from "../sections/HeroSection";
import ClientsSection from '../sections/ClientSection'
import CommunitySection from "../sections/CommunitySection";
import PixelgradeSection from "../sections/pixelgradeSection";
import StatsSection from "../sections/StatsSection";
import Extra from "../sections/Extra";
import TestimonialSection from "../sections/TestimonialSection";
import BlogSection from "../sections/BlogSection";
import FooterSection from "../sections/FooterSection";
import CTASection from "../sections/CTASection";
// import Register from "./Register";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <ClientsSection />
      <CommunitySection/>
      <PixelgradeSection />
      <StatsSection/>
      <Extra/>
      <TestimonialSection/>
      <BlogSection/>
      <CTASection/>
      <FooterSection/>
      {/* <Register/> */}
    </>
  );
};

export default Home;