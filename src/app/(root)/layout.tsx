import type { Viewport } from "next";
import type { ReactNode } from "react";
import Header from "@/components/menus/header";
import Footer from "@/components/footer/footer";
import Separator from "@/components/ui/separator";
import { Analytics } from "@vercel/analytics/react";
import { Zilla_Slab, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./global.css";
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

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${zillaSlab.variable} bg-[--background] text-[--primary]`}
      >
        <Header />

        <Separator />

        <main className="container pb-8">{children}</main>

        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
