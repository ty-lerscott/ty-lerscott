import "@/app/styles/globals.css";

import { Open_Sans, Montserrat } from "next/font/google";

export const OpenSansFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const MontserratFont = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={OpenSansFont.className}>
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
  );
}
