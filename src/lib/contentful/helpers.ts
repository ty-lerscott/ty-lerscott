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

  return querify({
    order: sortOrder,
    limit: limit?.toString() || "10",
    ...(skip && { skip: skip.toString() }),
    ...(name && { "fields.name[in]": name }),
    include: include ? String(include) : "5",
    select: select?.join(",") || "",
    ...(pageType && { "fields.type[in]": pageType }),
    ...(contentType && { content_type: contentType }),
    ...(slug && { "fields.slug[in]": slug.replace(/^\//, "") }),
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
    return Object.entries(found.fields).reduce(
      (newObj, [fieldName, fieldValue]) => {
        newObj[fieldName] = callback(fieldValue);
        return newObj;
      },
      {} as Record<string, any>,
    );
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

  return (
    normalizedData.length > 1 ? normalizedData : normalizedData[0]
  ) as Generic;
};

export { querify, setQueryParams, find, normalize, fetcher };
