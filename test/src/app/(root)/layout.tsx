import type { Viewport } from "next";
import { Zilla_Slab, Inter } from "next/font/google";

import { SidebarProvider, Sidebar } from "@/components/sidebar";

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
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={`${inter.className} ${zillaSlab.variable} relative h-full w-full`}
			>
				<SidebarProvider>
					<Sidebar />

					<main className="mt-4 mx-6 mb-8 w-full flex flex-col gap-4">
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
