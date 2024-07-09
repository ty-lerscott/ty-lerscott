import pkg from "~/package.json";
import merge from "lodash.mergewith";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const isLocal = process.env.APP_ENV === "development";
const LOCAL_API = process.env.LOCAL_API === "true";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
const META_TITLE = `${pkg.author.name} | ${pkg.author.profession}`;

const LOCAL_PREFIX = isLocal ? `✴️ ${LOCAL_API ? "🌑" : "🌕"} ` : null;

function customMerge(objValue: any, srcValue: any, key: string) {
  // Check if we're dealing with the specific keys we want to merge
  if (["title", "siteName"].includes(key)) {
    // If both values are strings, concatenate them
    if (typeof objValue === "string" && typeof srcValue === "string") {
      return `${LOCAL_PREFIX}${srcValue} | ${objValue}`;
    }
  }
  return undefined;
}

const setMetadata = (metadata: Metadata): Metadata => {
  return merge(
    {},
    {
      title: META_TITLE,
      keywords: "",
      description: "",
      creator: pkg.author.name,
      authors: [{ name: pkg.author.name }],
      metadataBase: pkg.author.website,
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title: "",
        images: [],
        description: "",
        type: "website",
        locale: "en_US",
        logo: "/favicon.ico",
        siteName: META_TITLE,
        url: pkg.author.website,
      },
    },
    metadata,
    customMerge,
  );
};

export { cn, setMetadata };
