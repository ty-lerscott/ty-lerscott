import { fetcher, setQueryParams, normalize } from "./helpers";
import { SearchParams, ResponseBody } from "@/types/contentful.types";

const IS_PROD = process.env.APP_ENV !== "development";
const API_URI = "https://cdn.contentful.com";
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID as string;
const ENVIRONMENT_ID = IS_PROD ? "master" : "dev";

const PATHS_OBJ = {
  assets: `/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/assets`,
  entries: `/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries`,
};

const PATHS = Object.entries(PATHS_OBJ).reduce(
  (acc, [key, value]) => {
    acc[key] = `${API_URI}${value}`;

    return acc;
  },
  {} as Record<string, any>,
) as Record<keyof typeof PATHS_OBJ, string>;

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

    response.data = normalize<GenericType>(resp);

    return response;
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
