import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Zilla_Slab, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import ScreenSizes from "~/app/tailwind.screens.config";

import "../tailwind.css";

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
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} ${zillaSlab.variable} relative h-full w-full`}
			>
				<main
					style={{
						maxWidth: ScreenSizes["2xl"],
					}}
					className="p-4 md:px-6 md:py-4 w-full flex flex-col gap-4 mx-auto 2xl:mx-0"
				>
					{children}
				</main>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
