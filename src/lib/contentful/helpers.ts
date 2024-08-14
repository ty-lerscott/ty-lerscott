import merge from "lodash.mergewith";
import { setQueryParams } from "@/lib/utils";
import type {
  Entry,
  BaseType,
  SearchParams,
  ResponseBody,
  ContentfulResponse,
} from "@/types/contentful.types";

const PREVIEW_MODE = process.env.PREVIEW_MODE === "true";
const API_KEY = process.env.CONTENTFUL_API_KEY as string;
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID as string;
const PREVIEW_KEY = process.env.CONTENTFUL_PREVIEW_KEY as string;
const IS_PROD = process.env.NEXT_PUBLIC_APP_ENV !== "development";
const API_URI = `https://${PREVIEW_MODE ? "preview" : "cdn"}.contentful.com`;
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

const fetcher = async <GenericType = ContentfulResponse>(url: string) => {
  return fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${PREVIEW_MODE ? PREVIEW_KEY : API_KEY}`,
    }),
    next: { revalidate: 0 },
  } as RequestInit).then(async (resp) => {
    const data = await resp.json();

    return data as GenericType;
  });
};

const find = (item: BaseType, obj: Record<string, any>) => {
  return item?.sys?.id ? obj[item.sys.id] : undefined;
};

const handlePrimitives = (item: BaseType | BaseType[]) => {
  if (["string", "number", "boolean"].includes(typeof item)) {
    return item;
  }

  return undefined;
};

const handleArrays = (
  items: BaseType | BaseType[],
  callback: (i: BaseType) => void,
) => (Array.isArray(items) ? items.map(callback) : undefined);

const handleObjects = ({
  item,
  base,
  callback,
}: {
  item: BaseType;
  base: Record<string, any>;
  callback: (val: any) => Record<string, any>;
}) => {
  const found = find(item, base) || item;

  if (found?.body) {
    found.body = callback(found.body);
    return found;
  }

  if (found?.fields) {
    const newFound = Object.entries(found.fields).reduce(
      (newObj, [fieldName, fieldValue]) => {
        newObj[fieldName] = callback(fieldValue);
        return newObj;
      },
      {} as Record<string, any>,
    );

    if (found?.sys?.updatedAt) {
      newFound.updatedAt = found.sys.updatedAt;
    }

    return newFound;
  }

  return found || item;
};

const traverse =
  (included: Record<string, any>) => (item: BaseType | BaseType[]) =>
    handlePrimitives(item) ||
    handleArrays(item as BaseType[], traverse(included)) ||
    handleObjects({
      base: included,
      item: item as BaseType,
      callback: traverse(included),
    });

const normalize = <Generic>(resp: ContentfulResponse) => {
  const { items, includes } = resp;

  const preppedTraverser = traverse(
    [
      ...(includes?.Entry ? includes.Entry : []),
      ...(includes?.Asset ? includes.Asset : []),
    ].reduce(
      (acc, item) => {
        acc[item.sys.id] = merge(item.fields, item.fields?.file, {
          type:
            item.sys?.contentType?.sys?.id || item.fields?.file?.contentType,
        });
        return acc;
      },
      {} as Record<string, Entry>,
    ),
  );

  const normalizedData = preppedTraverser(items);

  // sc.log({ normalizedData });

  return (
    normalizedData.length > 1 ? normalizedData : normalizedData[0]
  ) as Generic;
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

export { find, normalize, fetcher, getEntriesByType };
