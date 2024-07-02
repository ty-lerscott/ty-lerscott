import merge from "deepmerge";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const setMetadata = (metadata: Metadata): Metadata => {
  return merge(
    {
      title: "",
      keywords: [],
      description: "",
      creator: "Tyler Scott",
      authors: [{ name: "Tyler Scott" }],
      metadataBase: "https://ty-lerscott.com",
      alternates: {
        canonical: "/",
      },
    },
    metadata,
  );
};

export { cn, setMetadata };
