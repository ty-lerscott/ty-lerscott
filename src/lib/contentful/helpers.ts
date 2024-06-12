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

const normalize = <GenericType>(data: NormalizedType) => {
  const { items: entries, fields } = data;
  // TODO: check if entries array ever has more than 1 item

  return (fields || entries?.[0].fields) as GenericType;
};

const setQueryParams = (params?: Record<string, string>) => {
  const contentType = params?.contentType;

  return new URLSearchParams({
    ...(contentType && { content_type: contentType }),
    access_token: API_KEY,
  }).toString();
};

const getEntryById = async <GenericType>(id: string) => {
  try {
    const resp = await fetch(
      `${PATHS.entries}/${id}/?${setQueryParams()}`,
    ).then((resp) => resp.json());

    return normalize<GenericType>(resp);
  } catch (err) {
    console.log(
      err instanceof Error
        ? `getEntries error: ${err.message}`
        : "Unknown Error",
    );
  }

  return [] as GenericType;
};

const getEntriesByType = async <GenericType>(contentType: string) => {
  try {
    const resp = await fetch(
      `${PATHS.entries}?${setQueryParams({ contentType })}`,
    ).then((resp) => resp.json());

    return normalize<GenericType>(resp);
  } catch (err) {
    console.log(
      err instanceof Error
        ? `getEntries error: ${err.message}`
        : "Unknown Error",
    );
  }

  return [] as GenericType;
};

export { PATHS, getEntryById, setQueryParams, getEntriesByType };
