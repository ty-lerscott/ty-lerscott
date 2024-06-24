import merge from "deepmerge";
import type { Page, Post, Tag } from "@/types/generics.types";
import type { Menu, MenuItem } from "@/types/components.types";
import { type PageType, getEntriesByType } from "@/lib/contentful/helpers";

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
    data: { fields: Post }[];
  }>({
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
      fields: Omit<Post, "image" | "tags"> & {
        image: {
          sys: {
            fields: Post["image"];
          };
        };
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
      "fields.title",
      "fields.description",
      "fields.keywords",
      "fields.image",
      "fields.body",
      "fields.tags",
      "fields.slug",
    ],
  });

  return {
    ...post,
    image: post.image?.sys.fields,
    tags: post.tags.map(({ sys }) => sys.fields) as Tag[],
  } as Post;
};

const getPage = async (type: PageType) => {
  const {
    data: { fields },
  } = await getEntriesByType<Page>({
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
    body: (fields.body || []).map(({ sys }) => sys.fields),
  };
};

export { getMenu, getPage, getPosts, getPost };
