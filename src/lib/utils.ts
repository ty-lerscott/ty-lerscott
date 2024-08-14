import pkg from "~/package.json";
import merge from "lodash.mergewith";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import type { SearchParams } from "@/types/contentful.types";

const LOCAL_APP = process.env.NEXT_PUBLIC_APP_ENV === "development";
const LOCAL_DEV = process.env.NODE_ENV === "development";
const LOCAL_API = process.env.API_ENV === "development";
const PREVIEW_MODE = process.env.PREVIEW_MODE === "true";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
const META_TITLE = `${pkg.author.name} | ${pkg.author.profession}`;

const LOCAL_PREFIX = LOCAL_DEV
  ? `${LOCAL_APP ? "🌑" : "🌕"}${LOCAL_API ? "⚪" : "🟢"}${PREVIEW_MODE ? "<👀" : ""} `
  : "";

const querify = (obj: Record<string, any>) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const setQueryParams = ({
  slug,
  skip,
  sort,
  name,
  limit,
  order,
  select,
  include,
  pageType,
  contentType,
}: SearchParams) => {
  const sortOrder = order ? `${sort === "asc" ? "-" : ""}${order}` : "";
  const hasSelect = Array.isArray(select) && select.length;

  return querify({
    order: sortOrder,
    limit: limit?.toString() || "10",
    ...(skip && { skip: skip.toString() }),
    ...(name && { "fields.name[in]": name }),
    include: include ? String(include) : "5",
    ...(pageType && { "fields.type[in]": pageType }),
    ...(contentType && { content_type: contentType }),
    select: `sys.updatedAt${hasSelect ? `,${select.join(",")}` : ""}`,
    ...(slug && { "fields.slug[in]": slug.replace(/^\//, "") }),
  });
};

const customMerge = (objValue: any, srcValue: any, key: string) => {
  // Check if we're dealing with the specific keys we want to merge
  if (["title", "siteName"].includes(key)) {
    // If both values are strings, concatenate them
    if (typeof objValue === "string" && typeof srcValue === "string") {
      return `${LOCAL_PREFIX}${srcValue} | ${objValue}`;
    }
  }
  return undefined;
};

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

export { cn, setMetadata, setQueryParams, querify };
