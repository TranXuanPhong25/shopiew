"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

interface SafeLinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "secondary";
    size?: "sm" | "default" | "lg";
    [key: string]: any;
}

const SafeLinkButton = forwardRef<HTMLAnchorElement, SafeLinkButtonProps>(
    ({ href, children, className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <Link href={href} ref={ref} {...props}>
                <Button 
                    variant={variant} 
                    size={size} 
                    className={className}
                    asChild={false}
                >
                    {children}
                </Button>
            </Link>
        );
    }
);

SafeLinkButton.displayName = "SafeLinkButton";

export default SafeLinkButton;