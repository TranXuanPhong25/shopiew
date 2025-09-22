"use client"

import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"

interface QuantityInputProps {
    value: number
    min?: number
    max?: number
    availableText?: string,
    onChange: (value: number) => void
}

export default function QuantityInput({
                                          value,
                                          min = 1,
                                          max = 999,
                                          onChange
                                      }: QuantityInputProps) {

    const increment = () => {
        if (value < max) {
            onChange(value + 1)
        }
    }

    const decrement = () => {
        if (value > min) {
            onChange(value - 1)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        if (!isNaN(value)) {
            if (value >= min&&value<=max) {
                onChange(value)
            }else if(value>=max){
                onChange(value)
            }
        }
    }


    return (
        <div className="flex items-center  space-x-4 my-2 ">
            <span className="">Quantity: </span>
            <div className="flex border border-gray-300 rounded-md overflow-hidden justify-around">
                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-none border-r border-gray-300 flex items-center justify-center p-0"
                    onClick={decrement}
                >
                    <span className="text-lg font-medium">-</span>
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
                >
                    <span className="text-lg font-medium">+</span>
                </Button>
            </div>
        </div>
    )
}

