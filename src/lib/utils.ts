import merge from "deepmerge";
import pkg from "~/package.json";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const setMetadata = (metadata: Metadata): Metadata => {
  return merge(
    {
      title: "",
      keywords: "",
      description: "",
      creator: pkg.author.name,
      authors: [{ name: pkg.author.name }],
      metadataBase: "https://ty.lerscott.com",
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
        siteName: pkg.metadata.title.replace(/^\|/, ""),
        url: "https://ty.lerscott.com",
      },
    },
    metadata,
  );
};

export { cn, setMetadata };
