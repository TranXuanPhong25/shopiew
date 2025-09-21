"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CircularRevealProps {
  children: React.ReactNode;
  centerX?: number; // Vị trí trung tâm X (0-100%)
  centerY?: number; // Vị trí trung tâm Y (0-100%)
  duration?: number;
  delay?: number;
  className?: string;
  triggerOnView?: boolean;
}

export default function CircularReveal({
  children,
  centerX = 50,
  centerY = 50,
  duration = 1.2,
  delay = 0,
  className = "",
  triggerOnView = false,
}: CircularRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const shouldAnimate = triggerOnView ? isInView : true;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{
          clipPath: `circle(0% at ${centerX}% ${centerY}%)`,
        }}
        animate={
          shouldAnimate
            ? {
                clipPath: `circle(150% at ${centerX}% ${centerY}%)`,
              }
            : {}
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}