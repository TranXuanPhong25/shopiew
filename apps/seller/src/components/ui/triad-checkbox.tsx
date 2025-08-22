"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {Check, Minus} from "lucide-react"

import {cn} from "@/lib/utils"

export enum TriadState {
  All = "all",
  None = "none",
  Indeterminate = "indeterminate"
}

interface TriadCheckboxProps 
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "checked" | "onCheckedChange"> {
  state: TriadState
  onStateChange?: (state: TriadState) => void
}

const TriadCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  TriadCheckboxProps
>(({ className, state, onStateChange, ...props }, ref) => {
  // Convert triad state to Radix checkbox checked prop
  const getCheckedValue = (state: TriadState): boolean | "indeterminate" => {
    switch (state) {
      case TriadState.All:
        return true
      case TriadState.None:
        return false
      case TriadState.Indeterminate:
        return "indeterminate"
    }
  }

  // Handle Radix checkbox change and convert to triad state
  const handleCheckedChange = () => {
    if (!onStateChange) return
    
    // Cycle through states: none -> all -> none (partial is set externally)
    if (state === TriadState.None) {
      onStateChange(TriadState.All)
    } else if (state === TriadState.All) {
      onStateChange(TriadState.None)
    } else if (state === TriadState.Indeterminate) {
      onStateChange(TriadState.All)
    }
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        className
      )}
      checked={getCheckedValue(state as TriadState)}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {state === "indeterminate" ? (
          <Minus className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

TriadCheckbox.displayName = "TriadCheckbox"

export { TriadCheckbox }
