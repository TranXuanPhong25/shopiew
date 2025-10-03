"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useDebounce } from "@/lib/hooks/use-debounce"

interface QuantityInputProps {
    value: number
    min?: number
    max?: number
    frontText?: string,
    onChangeAction?: (value: number) => void
    onChange: (value: number) => void
    debounceMs?: number
}

export default function QuantityInput({
    value,
    min = 1,
    max = 999,
    onChange,
    onChangeAction,
    frontText = "",
    debounceMs = 500
}: QuantityInputProps) {
    
    // Use the custom debounce hook
    const debouncedAction = useDebounce(onChangeAction ? onChangeAction : () => {}, 0)
    
    const increment = () => {
        if (value < max) {
            const newValue = value + 1
            onChange(newValue)
            debouncedAction(newValue)
        }
    }
    const decrement = () => {
        if (value > min) {
            const newValue = value - 1
            onChange(newValue)
            debouncedAction(newValue)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseInt(e.target.value)
        if (!isNaN(newValue)) {
            if (newValue >= min && newValue <= max) {
                onChange(newValue)
                debouncedAction(newValue)
            } else if (newValue >= max) {
                onChange(newValue)
                debouncedAction(newValue)
            }
        }
    }


    return (
        <div className="flex items-center  space-x-4 my-2 ">
            {
                frontText &&
                <span className="">{frontText} </span>

            }
            <div className="flex border border-gray-300 rounded-md overflow-hidden justify-around">
                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-none border-r border-gray-300 flex items-center justify-center p-0"
                    onClick={decrement}
                    disabled={value <= min}
                >
                    <Minus />
                </Button>

                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="h-8 w-10 text-center border-none focus:ring-0 focus:outline-none"
                    aria-label="Quantity"
                />

                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-none border-l border-gray-300 flex items-center justify-center p-0"
                    onClick={increment}
                    disabled={value >= max}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    )
}

