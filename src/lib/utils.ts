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
  include,
  pageType,
  contentType,
}: SearchParams) => {
  const sortOrder = order ? `${sort === "desc" ? "-" : ""}${order}` : "";

  return querify({
    order: sortOrder,
    limit: limit?.toString() || "10",
    include: include ? String(include) : "5",
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

const extract = ({ sys, fields: { file, ...fields } }: Entry) => {
  return {
    ...fields,
    ...file,
    type: sys?.contentType?.sys?.id || file?.contentType,
  };
};

const find = (obj: Record<string, any>) => (item: BaseType) => obj[item.sys.id];

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

  // i'm not a huge fan of all this looping, I'd like the data to come back in a more structured way
  // TODO: lookup up Directus as an alternative
  const normalizedItems = items.map((item) => {
    return {
      ...item.fields,
      ...(Array.isArray(item?.fields?.body) && {
        body: (item.fields.body || []).map((bodyItem) => {
          const item = find(included)(bodyItem);

          // this only accounts for one deep,
          // TODO: write function to recursive find and replace
          if (Array.isArray(item?.body)) {
            item.body = item.body.map(find(included));
          }

          return item;
        }),
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
      ...(Array.isArray(item?.fields?.workExperience) && {
        workExperience: item.fields.workExperience.map((item) => {
          const experience = find(included)(item);

          if (Array.isArray(experience.body) && experience.body.length) {
            experience.body = experience?.body.map(find(included));
          }

          return experience;
        }),
      }),
    };
  });

  return (
    normalizedItems.length > 1 ? normalizedItems : normalizedItems[0]
  ) as Generic;
};

export { cn, extract, setQueryParams, setMetadata, normalize };
