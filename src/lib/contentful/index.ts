import type {
  PostType,
  HomepageType,
  BlurbType,
} from "@/types/contentful.types";
import type { Menu, MenuItem } from "@/types/components.types";
import {
  getEntriesByType,
  getEntryById,
  type SearchParams,
  type PageType,
} from "@/lib/contentful/helpers";

const getMenu = async () => {
  try {
    const { data } = await getEntriesByType<Menu>({ contentType: "menu" });

    return (data.fields.menuItems || []).map(({ sys }) => sys.fields);
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );

    return [] as MenuItem["sys"]["fields"][];
  }
};

const getPosts = async (select?: string[], skip?: number) => {
  const { pagination, data } = await getEntriesByType<{
    pagination?: {
      total: number;
      skip: number;
    };
    data: PostType[];
  }>({
    limit: 10,
    contentType: "post",
    order: "fields.publishDate",
    select: [
      "fields.title",
      "fields.description",
      "fields.publishDate",
      "fields.slug",
      select && select.join(","),
    ]
      .filter(Boolean)
      .join(","),
  });

  return {
    pagination,
    posts: (Array.isArray(data) ? data : [data]).map((post) => {
      return {
        ...post.fields,
        slug: post.fields.slug.replace(/^\//, ""),
      } as PostType["fields"];
    }),
  };
};

const getPage = async <GenericPageType>(searchParams: SearchParams) =>
  getEntriesByType<GenericPageType>(searchParams);

const getHomepage = async () => {
  const {
    data: { fields },
  } = await getPage<HomepageType>({
    contentType: "page",
    pageType: "home",
    select: ["fields.title", "fields.description", "fields.body"].join(","),
  });

  return {
    title: fields.title,
    description: fields.description,
    blurb: (fields.body || []).map(({ sys }) => sys.fields) as Array<
      BlurbType["sys"]["fields"]
    >,
  };
};

export { getMenu, getPage, getHomepage, getPosts };
