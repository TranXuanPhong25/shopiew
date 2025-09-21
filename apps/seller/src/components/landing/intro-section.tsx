"use client";

import { motion } from "framer-motion";
import Orb from '@/components/Orb';
import { Button } from "../ui/button";
import LandingButton from "./landing-button";
import Link from "next/link";

export default function MassiveOrbSection() {
   return (
      <section className="relative min-h-screen flex items-center justify-center  bg-black">
         {/* Massive Orb Background - Centered behind text */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 0.6 }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="w-[1200px] h-[1200px] md:w-[1400px] md:h-[1400px] lg:w-[1600px] lg:h-[1600px]"
            >
               <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={20}
                  forceHoverState={false}
               />
            </motion.div>
         </div>

         {/* Content Layer */}
         <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            {/* Top Label */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="mb-8"
            >
               <span className="inline-block px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                  A WONDERFUl PLATFORM
               </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, delay: 0.7 }}
               className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white mb-8 leading-none tracking-tight"
               style={{
                  textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3)',
               }}
            >
               <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1.0 }}
                  className="block"
               >
                  SHOPIEW
               </motion.span>
               <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                  className="block bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent"
               >
                  SELLER
               </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.4 }}
               className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed backdrop-blur-sm"
            >
               Transform your business with our innovative e-commerce platform.
               Connect, create, and grow with powerful seller tools.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.6 }}
               className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
               <Link href="/auth/signup">
                  <LandingButton title="Register now" />
               </Link>
            </motion.div>


         </div>

         {/* Additional Glow Effects */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-900/20 via-purple-900/10 to-transparent opacity-50"></div>
         </div>
         {/* Scroll Indicator */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
         >
            <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm mx-auto"
            >
               <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
               />
            </motion.div>
            <div className="text-xs text-white/60 mt-3 font-medium tracking-wider">
               SCROLL
            </div>
         </motion.div>

      </section>
   );
}