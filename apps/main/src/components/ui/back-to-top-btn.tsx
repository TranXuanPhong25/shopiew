// components/BackToTopButton.tsx
'use client'

import {useEffect, useState} from 'react'
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
        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <Button
            onClick={scrollToTop}
            variant="secondary"
            size="icon"
            className={cn(
                "fixed right-4 bottom-4 rounded-full shadow-lg transition-all duration-300 ease-out z-[1000] bg-white hover:bg-brand-50 border border-border/50 hover:border-brand-200 hover:shadow-xl",
                isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4 pointer-events-none"
            )}
            aria-label="Back to top"
        >
            <ArrowUp className="h-4 w-4 text-brand-600" aria-hidden="true" />
        </Button>
    )
}