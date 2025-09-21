import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section-fixed";
import TestimonialsSection from "@/components/landing/testimonials-section";
import { PageZoomTransition, CircularReveal } from "@/components/effects";
import IntroSection from "@/components/landing/intro-section";
import ClientOnly from "@/components/client-only";

export default function LandingPage() {
   return (
      <ClientOnly fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
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
      </ClientOnly>
   );
}