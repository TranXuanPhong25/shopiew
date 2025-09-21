import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
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
               delay={0.3}
               triggerOnView={true}
               centerX={25}
               centerY={50}>
               <HeroSection />
            </CircularReveal>

            <CircularReveal
               duration={1.2}
               delay={0.5}
               triggerOnView={true}
               centerX={25}
               centerY={50}
            >
               <FeaturesSection />
            </CircularReveal>

            <CircularReveal
               duration={1.0}
               delay={0.2}
               triggerOnView={true}
               centerX={75}
               centerY={50}
            >
               <TestimonialsSection />
            </CircularReveal>


         </div>
      </PageZoomTransition>
   );
}