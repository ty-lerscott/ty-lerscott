import type { ContentfulResponse, EntryType } from "@/types/contentful.types";

const IS_PROD = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
const API_URI = "https://cdn.contentful.com";
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY as string;
const ENVIRONMENT_ID = IS_PROD ? "master" : "dev"; //TODO: remove master from contentful

const PATHS_OBJ = {
  entries: `/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries
`,
};

const PATHS = Object.entries(PATHS_OBJ).reduce(
  (acc, [key, value]) => {
    acc[key] = `${API_URI}${value}`;

    return acc;
  },
  {} as Record<string, string>,
);

type NormalizedType = ContentfulResponse & {
  items: EntryType[];
  fields?: EntryType;
};

type SearchParams = {
  contentType: string;
  order?: string;
  limit?: string;
  sort?: "asc" | "desc";
};

const setQueryParams = ({ contentType, order, limit, sort }: SearchParams) => {
  const sortOrder = `${sort === "asc" ? "-" : ""}${order || "sys.createdAt"}`;

  return new URLSearchParams({
    order: sortOrder,
    limit: limit || "10",
    ...(contentType && { content_type: contentType }),
  }).toString();
};

const recursiveInjection = (
  targetArr: EntryType[],
  id: string,
  injection: {
    createdAt: string;
    fields: Record<string, any>;
  },
) => {
  for (const obj of targetArr) {
    for (const key in obj) {
      if (key === "id" && obj[key] === id) {
        (Object.keys(injection) as Array<keyof typeof injection>).forEach(
          (injectionKey) => {
            obj[injectionKey] = injection[injectionKey];
          },
        );
        break;
      }
      if (typeof obj[key] === "object") {
        recursiveInjection([obj[key]], id, injection);
      }
    }
  }
};

const normalize = <GenericType>(data: NormalizedType) => {
  const { items: entries, includes } = data;

  const include = [...includes.Entry].concat(includes.Asset).filter(Boolean);

  include.forEach((item) => {
    const { fields } = item;
    const { id, createdAt } = item.sys;

    recursiveInjection(entries, id, { createdAt, fields });
  });

  return (entries.length > 1 ? entries : entries[0]) as GenericType;
};

const getEntryById = async <GenericType>(id: string) => {
  try {
    const resp = await fetch(
      `${PATHS.entries}/${id}/?${setQueryParams({
        contentType: "",
      })}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${API_KEY}`,
        }),
      },
    ).then((resp) => resp.json());

    return normalize<GenericType>(resp);
  } catch (err) {
    console.log(
      err instanceof Error
        ? `getEntryById error: ${err.message}`
        : "Unknown Error",
    );
  }

  return [] as GenericType;
};

const getEntriesByType = async <GenericType>(searchParams: SearchParams) => {
  try {
    const resp = await fetch(
      `${PATHS.entries}?${setQueryParams(searchParams)}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${API_KEY}`,
        }),
      },
    ).then((resp) => resp.json());

    return normalize<GenericType>(resp);
  } catch (err) {
    console.log(
      err instanceof Error
        ? `getEntriesByType error: ${err.message}`
        : "Unknown Error",
    );
  }

  return [] as GenericType;
};

export { PATHS, getEntryById, setQueryParams, getEntriesByType };
