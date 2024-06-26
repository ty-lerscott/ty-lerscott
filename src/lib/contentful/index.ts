import { PageType } from "@/types/contentful.types";
import { getEntriesByType } from "@/lib/contentful/helpers";
import type { Menu, Page, Post, Link } from "@/types/generics.types";

const getMenu = async (name: string = "Header") => {
  let menuItems = [] as Link[];

  try {
    const {
      data: { body },
    } = await getEntriesByType<Menu>({
      name,
      contentType: "menu",
    });

    return body;
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );
  }
  return menuItems;
};

const getPosts = async (select?: string[], skip?: number) => {
  const { pagination, data } = await getEntriesByType<Post[]>({
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
    posts: (Array.isArray(data) ? data : [data]).map((post) => {
      post.slug = post.slug.replace(/^\//, "");

      return post;
    }),
    pagination,
  };
};

const getPost = async (slug: string) => {
  const { data: post } = await getEntriesByType<Post>({
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

  return post;
};

const getPage = async (type: PageType) => {
  const { data } = await getEntriesByType<Page>({
    contentType: "page",
    pageType: type,
    select: [
      "fields.body",
      "fields.slug",
      "fields.title",
      "fields.keywords",
      "fields.description",
    ],
  });

  return data as Page;
};

export { getMenu, getPage, getPosts, getPost };
