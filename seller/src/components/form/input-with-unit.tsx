import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputWithUnitProps extends React.InputHTMLAttributes<HTMLInputElement> {
  unit: string
  inputClassName?: string
}

const InputWithUnit = React.forwardRef<HTMLInputElement, InputWithUnitProps>(
  ({ className, type, unit, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <input
          type={type}
          className={cn(
              "flex-1 px-3 py-2 bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              inputClassName,
            )}
          ref={ref}
          {...props}
        />
        <div className="flex items-center pr-3 pl-2 border-l border-input">
          <span className="text-muted-foreground">{unit}</span>
        </div>
      </div>
    )
  },
)
InputWithUnit.displayName = "InputWithUnit"

export { InputWithUnit }
