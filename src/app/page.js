import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import LiveActivity from "@/components/LiveActivity";
import TrustSection from "@/components/TrustSection";
import WhySwitch from "@/components/WhySwitch";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <LiveActivity />
      <TrustSection />
      <WhySwitch />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}