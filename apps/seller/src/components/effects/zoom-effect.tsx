"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface ZoomEffectProps {
  children: React.ReactNode;
  variant?: "center" | "circular" | "scale" | "combined";
  direction?: "in" | "out";
  duration?: number;
  delay?: number;
  className?: string;
  triggerOnView?: boolean;
  centerX?: number;
  centerY?: number;
}

const zoomVariants: Record<string, Variants> = {
  center: {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  },
  circular: {
    hidden: {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 0,
    },
    visible: {
      clipPath: "circle(150% at 50% 50%)",
      opacity: 1,
    },
  },
  scale: {
    hidden: {
      scale: 1.2,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  },
  combined: {
    hidden: {
      clipPath: "circle(0% at 50% 50%)",
      scale: 1.1,
      opacity: 0,
    },
    visible: {
      clipPath: "circle(150% at 50% 50%)",
      scale: 1,
      opacity: 1,
    },
  },
};

export default function ZoomEffect({
  children,
  variant = "circular",
  direction = "in",
  duration = 1.2,
  delay = 0,
  className = "",
  triggerOnView = false,
  centerX = 50,
  centerY = 50,
}: ZoomEffectProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const shouldAnimate = triggerOnView ? isInView : true;

  // Tùy chỉnh clip-path cho vị trí trung tâm
  const customVariants = variant === "circular" || variant === "combined" 
    ? {
        ...zoomVariants[variant],
        hidden: {
          ...zoomVariants[variant].hidden,
          clipPath: `circle(0% at ${centerX}% ${centerY}%)`,
        },
        visible: {
          ...zoomVariants[variant].visible,
          clipPath: `circle(150% at ${centerX}% ${centerY}%)`,
        },
      }
    : zoomVariants[variant];

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={customVariants}
        initial={direction === "in" ? "hidden" : "visible"}
        animate={shouldAnimate ? (direction === "in" ? "visible" : "hidden") : "hidden"}
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