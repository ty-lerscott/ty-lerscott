import merge from "deepmerge";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const querify = (obj: Record<string, any>) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

const setMetadata = (metadata: Metadata): Metadata => {
  return merge(
    {
      metadataBase: "https://ty-lerscott.com",
      alternates: {
        canonical: "/",
      },
      title: "",
      description: "",
      keywords: [],
      authors: [{ name: "Tyler Scott" }],
      creator: "Tyler Scott",
    },
    metadata,
  );
};

export { cn, querify, setMetadata };
