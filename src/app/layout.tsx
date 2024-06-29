import type { Viewport } from "next";
import type { ReactNode } from "react";
import { Fira_Code, Inter } from "next/font/google";
import Header from "@/components/menus/header";
import Footer from "@/components/footer/footer";

import "./tailwind.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-inter",
});

const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-fira-code",
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
      <body className={`${inter.className} ${fira.variable} Body`}>
        <Header />

        <main className="Main">{children}</main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
