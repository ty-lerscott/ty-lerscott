import merge from "lodash.mergewith";

import type {
  Entry,
  BaseType,
  SearchParams,
  ContentfulResponse,
} from "@/types/contentful.types";

const API_KEY = process.env.CONTENTFUL_API_KEY as string;

const fetcher = async <GenericType = ContentfulResponse>(url: string) => {
  return fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
    }),
    next: { revalidate: 0 },
  } as RequestInit).then(async (resp) => {
    const data = await resp.json();

    return data as GenericType;
  });
};

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
  const sortOrder = order ? `${sort === "asc" ? "-" : ""}${order}` : "";

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

const extract = ({
  sys,
  fields: { file, ...fields },
}: Entry): { type: string; [key: string]: any } =>
  merge(fields, file, { type: sys?.contentType?.sys?.id || file?.contentType });

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
  cb: (i: BaseType) => void,
) => (Array.isArray(items) ? items.map(cb) : undefined);

const handleObjects = ({
  cb,
  item,
  base,
}: {
  item: BaseType;
  base: Record<string, any>;
  cb: (val: any) => Record<string, any>;
}) => {
  const found = find(item, base) || item;

  if (found?.body) {
    found.body = cb(found.body);
    return found;
  }

  if (found?.fields) {
    return Object.entries(found.fields).reduce(
      (newObj, [fieldName, fieldValue]) => {
        newObj[fieldName] = cb(fieldValue);
        return newObj;
      },
      {} as Record<string, any>,
    );
  }

  return found || item;
};

const recurser =
  (included: Record<string, any>) =>
  (item: BaseType | BaseType[]): Record<string, any> =>
    handlePrimitives(item) ||
    handleArrays(item as BaseType[], recurser(included)) ||
    handleObjects({
      base: included,
      cb: recurser(included),
      item: item as BaseType,
    });

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
    {} as Record<string, Omit<Entry, "metadata" | "sys" | "fields">>,
  );

  const normalizedData = recurser(included)(items);

  return (
    normalizedData.length > 1 ? normalizedData : normalizedData[0]
  ) as Generic;
};

export { querify, setQueryParams, extract, find, normalize, fetcher };
