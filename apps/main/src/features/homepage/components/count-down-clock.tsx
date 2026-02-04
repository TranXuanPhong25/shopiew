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

    if (!mounted) {
        return (
            <div className="flex items-center gap-1">
                {[0, 0, 0, 0].map((_, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[40px] text-center">
                            <span className="text-lg font-bold text-white tabular-nums">--</span>
                        </div>
                        {i < 3 && <span className="text-white/80 font-bold">:</span>}
                    </div>
                ))}
            </div>
        );
    }

    const timeUnits = [
        { value: timeLeft.days, label: 'd' },
        { value: timeLeft.hours, label: 'h' },
        { value: timeLeft.minutes, label: 'm' },
        { value: timeLeft.seconds, label: 's' },
    ];

    return (
        <div className="flex items-center gap-1" role="timer" aria-label="Flash sale countdown">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center gap-1">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[40px] text-center transition-all hover:bg-white/30">
                        <span className="text-lg font-bold text-white tabular-nums">
                            {unit.value.toString().padStart(2, "0")}
                        </span>
                        <span className="text-[10px] text-white/80 uppercase ml-0.5">{unit.label}</span>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <span className="text-white/80 font-bold animate-pulse">:</span>
                    )}
                </div>
            ))}
        </div>
    )
}

