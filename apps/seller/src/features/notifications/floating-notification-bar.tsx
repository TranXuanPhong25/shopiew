"use client"

import React, { useRef, useEffect } from "react"
import { animate, createTimeline } from "animejs"

import { cn } from "@/lib/utils"
import { PhoneCall, Music, Timer, XIcon, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DynamicIslandWrapperProps {
  children: React.ReactNode,
  isExpanded: boolean,
  activityType?: "call" | "music" | "timer" | "none"
}

export default function FloatingNotificationBar({
  children,
  isExpanded,
  activityType = "none",
}: DynamicIslandWrapperProps) {
  const [isExpandedState, setIsExpandedState] = React.useState(true)
  const barRef = useRef<HTMLDivElement>(null)
  const collapsedContentRef = useRef<HTMLDivElement>(null)
  const expandedContentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setIsExpandedState(isExpanded)
  }, [isExpanded])
  useEffect(() => {
    if (!barRef.current) return
   
    if (isExpandedState) {
      animate(barRef.current, {
        y:-18,
        width: '350px',
        height: '46px',
        borderRadius: '24px',
        duration: 350,
      })
    } else {
      animate(barRef.current, {
        y:0,
        width: '0',
        height: '0',
        borderRadius: '24px',
        duration: 200,
      })
    }
  }, [isExpandedState])
  // useEffect(() => {
  //   if (!barRef.current) return

  //   if (isExpandedState) {
  //     // Animation for expanding
  //     animate(barRef.current, {
  //       width: 'auto',
  //       height: '46px',
  //       borderRadius: '24px',
  //       padding: '8px 16px',
  //       duration: 300,
  //     })
  //   }

  // }, [])


  return (
    <div className="fixed top-9 left-1/2 -translate-x-1/2 z-50  rounded-full">
      <div
        ref={barRef}
        className={cn(
          "relative flex items-center justify-center bg-gray-800 text-white overflow-hidden border-gray-500 border-b-4 ",
        )}
        style={{
          width: '0',
          height: '40px',
          borderRadius: '24px',
          padding: '0',
        }}
      >

        {/* Expanded content
        <Button
          type="button"
          onClick={() => setIsExpandedState(!isExpandedState)}
          className={
            cn(
              "absolute top-1/2 right-1/2 !p-0 size-6 flex items-center justify-center translate-x-1/2 -translate-y-1/2  !bg-white text-black rounded-full border-2 border-black transition-all",
              isExpandedState ? "top-0 " : "top-1/2"
            )
          }
        >
          <X className={cn(
            !isExpandedState ? "rotate-45" : "-rotate-0",
            "transition-all"
          )}/>
        </Button> */}

        <div
          ref={expandedContentRef}
          className={cn(
            "flex items-center gap-2 w-full ",
            !isExpandedState ? "opacity-0 pointer-events-none  " : "opacity-100 pointer-events-auto ",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
