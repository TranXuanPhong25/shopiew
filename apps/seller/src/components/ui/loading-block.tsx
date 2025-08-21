"use client"

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { cn } from '@/lib/utils'

export default function LoadingBlock({className = ""}:{ className?: string }) {
   const centralRingRef = useRef<HTMLDivElement>(null)
   const innerCircleRef = useRef<HTMLDivElement>(null)
   const outerRingRef = useRef<HTMLDivElement>(null)
   const loadingTextRef = useRef<HTMLDivElement>(null)
   const dotsRef = useRef<HTMLDivElement[]>([])

   useEffect(() => {
      if (!centralRingRef.current || !innerCircleRef.current || !outerRingRef.current || !loadingTextRef.current) return;
      // Central rotating ring animation
      animate(centralRingRef.current, {
         rotate: 360,
         duration: 2000,
         loop: true,
         easing: 'linear'
      })

      // Inner pulsing circle animation
      animate(innerCircleRef.current, {
         scale: [0.8, 1.2, 0.8],
         opacity: [0.5, 0.8, 0.5],
         duration: 2000,
         loop: true,
         easing: 'easeInOutQuad'
      })

      // Outer rotating ring animation
      animate(outerRingRef.current, {
         rotate: -360,
         duration: 4000,
         loop: true,
         easing: 'linear'
      })


      // Loading text animation
      animate(loadingTextRef.current, {
         opacity: [0.5, 1, 0.5],
         duration: 2000,
         loop: true,
         easing: 'easeInOutQuad'
      })

      // Progress dots animation
      dotsRef.current.forEach((dot, i) => {
         animate(dot, {
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
            duration: 1500,
            delay: i * 200,
            loop: true,
            easing: 'easeInOutQuad'
         })
      })

   }, [])

   // Function to add dot refs
   const addDotRef = (el: HTMLDivElement | null) => {
      if (el && !dotsRef.current.includes(el)) {
         dotsRef.current.push(el)
      }
   }

   return (
      <div className={
         cn("flex items-center justify-center min-h-screenr",
            className
         )
      }>
         <div className="relative">
            {/* Central rotating ring */}
            <div
               ref={centralRingRef}
               className="w-32 h-32 border-4 border-transparent border-t-blue-400 border-r-sky-400 rounded-full"
            />

            {/* Inner pulsing circle */}
            <div
               ref={innerCircleRef}
               className="absolute inset-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
            />

            {/* Outer rotating ring */}
            <div
               ref={outerRingRef}
               className="absolute -inset-8 border-2 border-transparent border-l-blue-400 border-b-cyan-400 rounded-full"
            />

         </div>

         {/* Loading text */}
         <div
            ref={loadingTextRef}
            className="absolute mt-40 text-sky-400 font-semibold text-lg tracking-wider"
         >
            Loading...
         </div>

         {/* Progress dots */}
         <div className="absolute mt-52 flex space-x-2">
            {[...Array(3)].map((_, i) => (
               <div
                  key={i}
                  ref={addDotRef}
                  className="w-2 h-2 bg-sky-400 rounded-full"
               />
            ))}
         </div>
      </div>
   )
}
