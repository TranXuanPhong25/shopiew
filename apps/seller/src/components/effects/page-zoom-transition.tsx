"use client";

import { motion } from "framer-motion";

interface PageZoomTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageZoomTransition({
  children,
  className = "",
}: PageZoomTransitionProps) {
  return (
    <motion.div
      initial={{
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
      }}
      animate={{
        clipPath: "circle(150% at 50% 50%)",
        opacity: 1,
      }}
      exit={{
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}