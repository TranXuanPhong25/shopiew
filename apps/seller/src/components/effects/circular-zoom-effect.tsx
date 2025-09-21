"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CircularZoomEffectProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function CircularZoomEffect({
  children,
  duration = 1.5,
  delay = 0,
  className = "",
}: CircularZoomEffectProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              clipPath: "circle(0% at 50% 50%)",
              scale: 1.2,
            }}
            animate={{
              clipPath: "circle(100% at 50% 50%)",
              scale: 1,
            }}
            transition={{
              duration,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}