import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import LoadingBlock from "@/components/ui/loading-block";
import { AuthProvider } from "@/features/auth";
import {
    AjaxProgressBarProvider,
    ChatWidget,
    ReactQueryProvider,
} from "@shopiew/common-features";

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
                <Suspense fallback={<LoadingBlock />}>
                    <AuthProvider>
                        <ReactQueryProvider>
                            <AjaxProgressBarProvider>
                                {children}
                                <ChatWidget />
                            </AjaxProgressBarProvider>
                        </ReactQueryProvider>
                    </AuthProvider>
                </Suspense>
                <Toaster />
            </body>
        </html>
    );
}
