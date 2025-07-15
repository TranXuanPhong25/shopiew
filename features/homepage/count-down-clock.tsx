"use client";
import {useCallback, useEffect, useState} from "react"

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

interface CountdownClockProps {
    targetDate: Date
}

export default function CountDownClock({targetDate}: CountdownClockProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const calculateTimeLeft = useCallback(() => {
        const now = new Date()
        const difference = new Date(targetDate).getTime() - now.getTime()

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        } else {
            return {days: 0, hours: 0, minutes: 0, seconds: 0}
        }
    }, [targetDate])
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [calculateTimeLeft])
    if (!mounted) return null; // Chờ đến khi client mount mới render

    return (
        <div className="flex justify-center space-x-0 text-red-600 font-semibold">
            <div className="flex flex-col items-center">
                <span className="text-2xl">{timeLeft.days}</span>
                <span className="text-xs uppercase">Days</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="flex flex-col items-center">
                <span className="text-2xl">{timeLeft.hours.toString().padStart(2, "0")}</span>
                <span className="text-xs uppercase">Hours</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="flex flex-col items-center">
                <span className="text-2xl">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                <span className="text-xs uppercase">Minutes</span>
            </div>
            <span className="text-2xl">:</span>
            <div className="flex flex-col items-center">
                <span className="text-2xl">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                <span className="text-xs uppercase">Seconds</span>
            </div>
        </div>
    )
}

