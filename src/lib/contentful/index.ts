import { PageType, Entry } from "@/types/contentful.types";
import { getEntriesByType, getEntryById } from "@/lib/contentful/helpers";
import type {
  Page,
  Menu,
  Post,
  Link,
  List,
  Table,
  TableRow,
} from "@/types/generics.types";

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

  const listBody = await Promise.all(
    post.body
      .filter((bodyItem) => ["list"].includes(bodyItem.type))
      .map((item) => {
        const list = item as List;

        return getEntriesByType<List>({
          contentType: list.type,
          name: list.name,
        });
      }),
  );

  listBody.forEach(({ data: bodyItem }) => {
    const index = post.body.findIndex(
      (postBodyItem) => (postBodyItem as List).name === bodyItem.name,
    );
    post.body[index] = {
      ...(post.body[index] as List),
      ...bodyItem,
    };
  });

  /**
   *  FIX: this only allows for 1 table per post
   */
  const tableBody = await Promise.all(
    post.body
      .filter((bodyItem) => ["table"].includes(bodyItem.type))
      .reduce((acc, bodyItem) => {
        const table = bodyItem as Table;

        table.body.forEach((item) => {
          const row = item as unknown as Entry;

          acc.push(getEntryById<TableRow>(row.sys.id));
        });
        return acc;
      }, [] as Promise<TableRow>[]),
  );

  if (tableBody.length) {
    const tableIndex = post.body.findIndex((bodyItem) =>
      ["table"].includes(bodyItem.type),
    );

    post.body[tableIndex] = {
      ...post.body[tableIndex],
      body: tableBody,
    } as Table;
  }

  return post;
};

const getPage = async <Type extends Record<string, any> = Page>(
  type: PageType,
) => {
  const { data } = await getEntriesByType<Type>({
    contentType: "page",
    pageType: type,
    select: [
      "fields.body",
      "fields.slug",
      "fields.title",
      "fields.keywords",
      "fields.education",
      "fields.resumeBio",
      "fields.description",
      "fields.resumeSkills",
      "fields.workExperience",
    ],
  });

  return data as Type;
};

export { getMenu, getPage, getPosts, getPost };
