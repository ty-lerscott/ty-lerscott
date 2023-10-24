import { useState } from "react";
import { Open_Sans, Montserrat } from "next/font/google";

import { cn } from "@/utils";
import { Navigation } from "@/components/Navigation";

import "@/app/styles/globals.css";

export const OpenSansFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const MontserratFont = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const THEMES = {
  default: "default",
};

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(THEMES.default);

  const themeSetter = (theme) => {
    document.querySelector("html").setAttribute("data-theme", theme);
    setTheme(theme);
  };
  return (
    <>
      <Navigation {...pageProps} theme={theme} setTheme={themeSetter} />
      <main className={cn(OpenSansFont.className, "container")}>
        <style jsx global>{`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: ${MontserratFont.style.fontFamily};
            font-weight: 700;
          }
        `}</style>
        <Component {...pageProps} />
      </main>
    </>
  );
}
