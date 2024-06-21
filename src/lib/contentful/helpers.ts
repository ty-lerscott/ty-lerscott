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
  items?: EntryType[];
  fields?: EntryType;
};

type SearchParams = {
  contentType: string;
  order?: string;
  limit?: string;
};

const setQueryParams = ({ contentType, order, limit }: SearchParams) => {
  return new URLSearchParams({
    order: order || "sys.createdAt",
    limit: limit || "10",
    ...(contentType && { content_type: contentType }),
  }).toString();
};

const recursiveInjection = <GenericType>(
  obj: GenericType,
  id: string,
  injection: {
    createdAt: string;
    fields: Record<string, any>;
  },
) => {
  for (const key in obj) {
    if (key === "id" && obj[key] === id) {
      for (const injectKey in injection) {
        // @ts-ignore
        obj[injectKey] = injection[injectKey];
      }
      break;
    }
    if (typeof obj[key] === "object") {
      recursiveInjection(obj[key], id, injection);
    }
  }
};

const normalize = <GenericType>(data: NormalizedType) => {
  const { items: entries, fields, includes, ...rest } = data;

  const normalized = {
    ...fields,
    ...(entries?.[0] && entries[0].fields),
  } as GenericType;

  const include = [...includes.Entry].concat(includes.Asset).filter(Boolean);

  for (let i = 0; i <= include.length - 1; i++) {
    const item = include[i];
    const { id, createdAt } = item.sys;
    const { fields } = item;

    recursiveInjection<GenericType>(normalized, id, { createdAt, fields });
  }

  console.log(entries);

  return normalized;
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
