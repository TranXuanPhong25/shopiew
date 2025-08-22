import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import CTASection from "@/components/landing/cta-section";

export default function LandingPage() {
   return (
      <div className="min-h-screen">
         <HeroSection />
         <FeaturesSection />
         <TestimonialsSection />
         <CTASection />
      </div>
   );
}