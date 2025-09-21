import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import CTASection from "@/components/landing/cta-section";
import { PageZoomTransition, CircularReveal } from "@/components/effects";

export default function LandingPage() {
   return (
      <PageZoomTransition>
         <div className="min-h-screen">
            <CircularReveal duration={1.5} delay={0.3}>
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
            
            <CircularReveal 
               duration={1.3} 
               delay={0.3} 
               triggerOnView={true}
            >
               <CTASection />
            </CircularReveal>
         </div>
      </PageZoomTransition>
   );
}