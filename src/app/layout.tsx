import type { Viewport } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/footer/footer";
import { Inter } from "next/font/google";
import Header from "@/components/menus/header";

import "./tailwind.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
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
      <body className={`${inter.className} Body`}>
        <Header />

        <main className="Main">{children}</main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
