// components/BackToTopButton.tsx
'use client'

import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {ArrowUp} from 'lucide-react'
import {cn} from "@/lib/utils";

export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <Button
            onClick={scrollToTop}
            variant="custom-1"
            size="icon"
            className={cn(
                "fixed right-4 bottom-4 rounded-full shadow-md transition-all duration-200 ease-in-out z-[1000]",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            aria-label="Back to top"
        >
            <ArrowUp className="h-4 w-4 "/>
        </Button>
    )
}