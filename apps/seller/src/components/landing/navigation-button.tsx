"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NavigationButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "secondary";
    size?: "sm" | "default" | "lg";
}

export default function NavigationButton({ 
    href, 
    children, 
    className = "", 
    variant = "default", 
    size = "default" 
}: NavigationButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(href);
    };

    return (
        <Button 
            onClick={handleClick}
            variant={variant} 
            size={size} 
            className={className}
        >
            {children}
        </Button>
    );
}