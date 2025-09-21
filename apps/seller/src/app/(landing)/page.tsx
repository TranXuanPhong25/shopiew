import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section-fixed";
import TestimonialsSection from "@/components/landing/testimonials-section";
import { PageZoomTransition, CircularReveal } from "@/components/effects";
import IntroSection from "@/components/landing/intro-section";

export default function LandingPage() {
   return (
      <PageZoomTransition>
         <div className="min-h-screen">

            <CircularReveal duration={2.0} delay={0.1}>
               <IntroSection />
            </CircularReveal>

            <CircularReveal
               duration={1.5}
               delay={0.2}
               triggerOnView={true}
               centerX={25}
               centerY={50}>
               <HeroSection />
            </CircularReveal>

            <FeaturesSection />

            <TestimonialsSection />
         </div>
      </PageZoomTransition>
   );
}