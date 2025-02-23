"use client"
import React from "react"
import {Star} from "lucide-react"

export default function RatingStars(
    {
        rating
    }: {
        rating: number
    }) {
    return (
        <div className="relative w-fit font-sans ">


            <div className="flex items-center justify-center space-x-1 select-none">
                {[...Array(5)].map((_, index) => {
                    const fillPercentage = Math.min(100, Math.max(0, (rating - index) * 100))
                    return (
                        <div
                            key={index}
                            className="relative cursor-pointer"

                        >
                            <Star
                                className={`${"size-6 md:size-8"} text-gray-300 dark:text-gray-500 `}
                                fill="currentColor"
                            />
                            <div className="absolute top-0 left-0 overflow-hidden"
                                 style={{width: `${fillPercentage}%`}}>
                                <Star
                                    className={`${"size-6 md:size-8 "} text-yellow-400 `}
                                    fill="currentColor"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}