import merge from "deepmerge";
import { extract, setQueryParams, normalize } from "@/lib/utils";
import {
  Entry,
  SearchParams,
  ResponseBody,
  ContentfulResponse,
} from "@/types/contentful.types";

import type { Image } from "@/types/generics.types";

const API_URI = "https://cdn.contentful.com";
const API_KEY = process.env.CONTENTFUL_API_KEY as string;
const IS_PROD = process.env.ENVIRONMENT === "production";
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID as string;
const ENVIRONMENT_ID = IS_PROD ? "master" : "dev";

const PATHS_OBJ = {
  entries: `/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries`,
  assets: `/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/assets`,
};

const PATHS = Object.entries(PATHS_OBJ).reduce(
  (acc, [key, value]) => {
    acc[key] = `${API_URI}${value}`;

    return acc;
  },
  {} as Record<string, any>,
) as Record<keyof typeof PATHS_OBJ, string>;

const fetcher = async <GenericType = ContentfulResponse>(url: string) => {
  return fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
    }),
    cache: "force-cache",
  } as RequestInit).then(async (resp) => {
    const data = await resp.json();

    return data as GenericType;
  });
};

const getAssetById = async <GenericType>(id: string) => {
  try {
    const resp = await fetcher<Entry>(
      `${PATHS.assets}/${id}/?${setQueryParams({
        contentType: "",
      })}`,
    );

    return extract(resp) as GenericType;
  } catch (err) {
    console.log(
      err instanceof Error
        ? `getEntryById error: ${err.message}`
        : "Unknown Error",
    );
  }

  return {} as GenericType;
};

const getEntriesByType = async <GenericType extends Record<string, any>>(
  searchParams: SearchParams,
) => {
  const response = {
    pagination: {
      total: 0,
      skip: 0,
    },
  } as ResponseBody<GenericType>;

  try {
    const resp = await fetcher(
      `${PATHS.entries}?${setQueryParams(searchParams)}`,
    );

    if (!resp.total) {
      // FIX: I dont think this typing is correct
      response.data = { body: [] } as unknown as GenericType;
      return response;
    }

    response.pagination = {
      total: resp.total,
      skip: resp.skip,
    };

    let image;
    const data = normalize<GenericType>(resp);

    if (data?.image?.sys.id) {
      image = await getAssetById<Image>(data.image.sys.id);
      response.data = merge(data, { image }) as GenericType;
    } else {
      response.data = data;
    }
  } catch (err) {
    console.log(
      err instanceof Error
        ? `getEntriesByType error: ${err.message}`
        : "Unknown Error",
    );
  }

  return response;
};

export { setQueryParams, getEntriesByType };
