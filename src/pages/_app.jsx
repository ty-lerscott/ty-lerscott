import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
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
  const [theme, setTheme] = useLocalStorage("theme", THEMES.default);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Navigation {...pageProps} theme={theme} setTheme={setTheme} />
      <main className={cn(OpenSansFont.className, "container", "pt-4")}>
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
