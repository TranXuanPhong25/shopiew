import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode, Suspense } from "react";
import AjaxProgressBarProvider from "@/features/ajax-progress-bar/provider";
import { AuthProvider } from "@/features/auth";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/features/react-query/provider";
import Loading from "./loading";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shopiew - Miscellaneous land",
    description: "A strange shopping sanctuary",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
            >
                {/* Suspense boundary for AuthProvider, uses loading.tsx automatically as fallback */}
                <ReactQueryProvider>
                    <AjaxProgressBarProvider>
                        {children}
                        {/* <BackToTopButton /> */}
                    </AjaxProgressBarProvider>
                </ReactQueryProvider>r
                <Toaster />
            </body>
        </html>
    );
}
