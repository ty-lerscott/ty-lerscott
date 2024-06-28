import merge from "deepmerge";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import type {
  Entry,
  BaseType,
  SearchParams,
  ContentfulResponse,
} from "@/types/contentful.types";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const querify = (obj: Record<string, any>) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

const setQueryParams = ({
  slug,
  skip,
  sort,
  name,
  limit,
  order,
  select,
  pageType,
  contentType,
}: SearchParams) => {
  const sortOrder = order ? `${sort === "asc" ? "-" : ""}${order}` : "";

  return querify({
    order: sortOrder,
    limit: limit?.toString() || "10",
    ...(name && { "fields.name[in]": name }),
    ...(skip && { skip: skip.toString() }),
    select: select?.join(",") || "",
    ...(pageType && { "fields.type[in]": pageType }),
    ...(contentType && { content_type: contentType }),
    ...(slug && { "fields.slug[in]": slug.replace(/^\//, "") }),
  });
};

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

const extract = ({ sys, fields: { file, ...fields } }: Entry) => {
  return {
    ...fields,
    ...file,
    type: sys?.contentType?.sys?.id || file?.contentType,
  };
};

const normalize = <Generic>(resp: ContentfulResponse) => {
  const { items, includes } = resp;

  const included = [
    ...(includes?.Entry ? includes.Entry : []),
    ...(includes?.Asset ? includes.Asset : []),
  ].reduce(
    (acc, item) => {
      acc[item.sys.id] = extract(item);
      return acc;
    },
    {} as Record<string, any>,
  );

  const find = (obj: Record<string, any>) => (item: BaseType) =>
    obj[item.sys.id];

  const normalizedItems = items.map((item) => {
    return {
      ...item.fields,
      ...(item.fields.body && {
        body: item.fields.body.map(find(included)),
      }),
      ...(item.fields.tags && {
        tags: item.fields.tags.map(find(included)),
      }),
      ...(item.fields.education && {
        education: item.fields.education.map(find(included)),
      }),
      ...(item.fields.resumeSkills && {
        resumeSkills: item.fields.resumeSkills.map(find(included)),
      }),
      ...(item.fields.workExperience && {
        workExperience: item.fields.workExperience.map(find(included)),
      }),
    };
  });

  return (
    normalizedItems.length > 1 ? normalizedItems : normalizedItems[0]
  ) as Generic;
};

const buildVariants = () => {
  return {};
};

export { cn, extract, setQueryParams, setMetadata, normalize, buildVariants };
