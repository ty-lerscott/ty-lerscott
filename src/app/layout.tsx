import Link from "next/link";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/menus/header";
import { Separator } from "@/components/ui/separator";

import "./tailwind.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <header className="container max-w-screen-md flex items-center justify-between px-4 py-4">
          <Link href="/">Tyler Scott</Link>
          <Header />
        </header>
        <Separator />
        <main className="container max-w-screen-md px-4 pt-4">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
