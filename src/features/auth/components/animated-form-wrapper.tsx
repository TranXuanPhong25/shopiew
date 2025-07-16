"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedFormWrapperProps {
  children: React.ReactNode
  isVisible: boolean
  animationType?: "fade" | "zoom" | "slide-up" | "slide-down"
  duration?: number
  className?: string
}

export function AnimatedFormWrapper({
  children,
  isVisible,
  animationType = "fade",
  duration = 300,
  className,
}: AnimatedFormWrapperProps) {
  const [shouldRender, setShouldRender] = useState(isVisible)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 1)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), duration)
    }
  }, [isVisible, duration])

  if (!shouldRender) return null

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`

    switch (animationType) {
      case "fade":
        return cn(baseClasses, isAnimating ? "opacity-100" : "opacity-0")
      case "zoom":
        return cn(baseClasses, isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95")
      case "slide-up":
        return cn(baseClasses, isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
      case "slide-down":
        return cn(baseClasses, isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4")
      default:
        return baseClasses
    }
  }

  return <div className={cn(getAnimationClasses(), className)}>{children}</div>
}
