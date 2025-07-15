import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/layout/navigation-bar";
import {ReactNode} from "react";
import Footer from "@/components/layout/footer";
import AjaxProgressBarProvider from "@/features/ajax-progress-bar/provider";
import {BackToTopButton} from "@/components/ui/back-to-top-btn";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shopiew | Miscellaneous land",
    description: "A strange shopping sanctuary",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 relative`}
        >
        <AjaxProgressBarProvider>
            <NavigationBar/>
            {children}
            <Footer/>
            <BackToTopButton/>
        </AjaxProgressBarProvider>
        </body>
        </html>
    );
}
