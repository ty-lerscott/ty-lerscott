import merge from "deepmerge";
import { type PageType, getEntriesByType } from "@/lib/contentful/helpers";
import type {
  Tag,
  Menu,
  Page,
  Post,
  Body,
  Image,
  MenuItem,
} from "@/types/generics.types";

type ExtractType<T> = T extends { type: infer U } ? U : never;

const extract = <GenericType>(
  arr: { sys: { type?: ExtractType<GenericType>; fields: GenericType } }[],
) =>
  (arr || []).map(({ sys }) => ({
    ...sys.fields,
    type: sys.type,
  })) as GenericType[];

const getMenu = async () => {
  let menuItems = [] as MenuItem[];

  try {
    const {
      data: { fields },
    } = await getEntriesByType<{
      data: {
        fields: Omit<Menu, "menuItems"> & {
          menuItems: {
            sys: {
              fields: MenuItem;
            };
          }[];
        };
      };
    }>({ contentType: "menu" });

    menuItems = extract(fields.menuItems);
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );
  }
  return menuItems;
};

const getPosts = async (select?: string[], skip?: number) => {
  const { pagination, data } = await getEntriesByType<{
    pagination?: {
      total: number;
      skip: number;
    };
    data: { fields: Post }[];
  }>({
    skip,
    limit: 10,
    contentType: "post",
    order: "fields.publishDate",
    select: [
      "fields.title",
      "fields.description",
      "fields.publishDate",
      "fields.slug",
    ]
      .concat(select as string[])
      .filter(Boolean),
  });

  return {
    pagination,
    posts: (Array.isArray(data) ? data : [data]).map((post) => {
      return merge(post.fields, {
        slug: post.fields.slug.replace(/^\//, ""),
      }) as Post;
    }),
  };
};

const getPost = async (slug: string) => {
  const {
    data: { fields: post },
  } = await getEntriesByType<{
    data: {
      fields: Omit<Post, "image" | "tags" | "body"> & {
        image: {
          sys: {
            fields: Image;
          };
        };
        body: {
          sys: {
            fields: Body;
          };
        }[];
        tags: {
          sys: {
            fields: Tag;
          };
        }[];
      };
    };
  }>({
    contentType: "post",
    slug: slug,
    select: [
      "fields.body",
      "fields.tags",
      "fields.slug",
      "fields.title",
      "fields.image",
      "fields.keywords",
      "fields.description",
      "fields.publishDate",
    ],
  });

  return {
    ...post,
    tags: extract(post.tags),
    body: extract(post.body),
    image: post.image?.sys.fields,
  } as Post;
};

const getPage = async (type: PageType) => {
  const {
    data: { fields },
  } = await getEntriesByType<{
    data: { fields: Page };
  }>({
    contentType: "page",
    pageType: type,
    select: [
      "fields.title",
      "fields.description",
      "fields.keywords",
      "fields.body",
      "fields.slug",
    ],
  });

  return {
    ...fields,
    body: extract(fields.body),
  } as Page;
};

export { getMenu, getPage, getPosts, getPost };
