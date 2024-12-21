import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import ThemeToggle from "@/components/theme-toggle";
import { Zilla_Slab, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/contexts/theme";
import { SidebarProvider, Sidebar } from "@/components/sidebar";

import "./global.css";
import "./tailwind.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "600"],
	style: ["normal"],
	variable: "--font-inter",
});

const zillaSlab = Zilla_Slab({
	subsets: ["latin"],
	weight: ["300", "500"],
	style: ["normal", "italic"],
	variable: "--font-zilla-slab",
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
	maximumScale: 1.0,
	userScalable: false,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider>
			<html lang="en" className="opacity-0 transition-opacity duration-300">
				<body
					className={`${inter.className} ${zillaSlab.variable} relative h-screen`}
				>
					<SidebarProvider>
						<Sidebar />

						<main className="m-2">{children}</main>

						<ThemeToggle />
						<Analytics />
						<SpeedInsights />
					</SidebarProvider>
				</body>
			</html>
		</ThemeProvider>
	);
}
