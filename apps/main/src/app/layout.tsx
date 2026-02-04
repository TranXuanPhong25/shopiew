import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/layout/navigation-bar";
import { ReactNode } from "react";
import Footer from "@/components/layout/footer";
import AjaxProgressBarProvider from "@/features/ajax-progress-bar/provider";
import { BackToTopButton } from "@/components/ui/back-to-top-btn";
import { AuthProvider } from "@/features/auth";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/features/react-query/provider";
import { ChatWidget } from "@/features/chat-widget/components";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Shopiew | Miscellaneous land",
	description: "A strange shopping sanctuary",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f8fafc" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable}>
			<body className="font-sans antialiased bg-slate-50 relative min-h-screen flex flex-col">
				<ReactQueryProvider>
					<AuthProvider>
						<AjaxProgressBarProvider>
							<NavigationBar />
							<main className="flex-1">{children}</main>
							<Footer />
							<BackToTopButton />
							<ChatWidget />
						</AjaxProgressBarProvider>
					</AuthProvider>
				</ReactQueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
