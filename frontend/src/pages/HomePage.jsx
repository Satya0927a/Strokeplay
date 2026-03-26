
import { useState, useEffect } from "react";
import Footer from "../components/Homepage/Footer";
import Navbar from "../components/Homepage/Navbar";
import Hero from "../components/Homepage/Hero";
import StatsLine from "../components/Homepage/StatsLine";
import HowItWorks from "../components/Homepage/HowitWorks";
import RevealOnScroll from "../components/RevealOnscroll";
import MonthlyDraw from "../components/Homepage/Monthlydraw";
import FeaturesHighlight from "../components/Homepage/FeatureHighlight";
import CharityImpact from "../components/Homepage/Charityimpact";
import Testimonials from "../components/Homepage/Testimonials";
import FinalCTA from "../components/Homepage/FinalCTA";


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#080b09] text-[#f0f4f1]">
        <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main>
          <Hero fadeUp={fadeUp}/>
          <StatsLine/>
          <HowItWorks/>
          <MonthlyDraw/>
          <FeaturesHighlight/>
          <CharityImpact/>
          <Testimonials/>
          <FinalCTA/>
        </main>
        <Footer />
      </div>
    </>
  );
}