import type {
  PostType,
  HomepageType,
  BlurbType,
} from "@/types/contentful.types";
import type { Menu, MenuItem } from "@/types/components.types";
import { getEntriesByType, getEntryById } from "@/lib/contentful/helpers";

const getMenu = async () => {
  try {
    const { fields } = await getEntriesByType<Menu>({ contentType: "menu" });

    return (fields.menuItems || []).map(({ sys }) => sys.fields);
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );

    return [] as MenuItem["sys"]["fields"][];
  }
};

const getPage = async <GenericPageType>(pageType: string) =>
  getEntriesByType<GenericPageType>({ contentType: pageType });

const getHomepage = async () => {
  const { fields } = await getPage<HomepageType>("landingPage");
  const posts = await getEntriesByType<PostType[]>({
    contentType: "post",
    order: "fields.publishDate",
  });

  return {
    title: fields.pageName,
    description: fields.description,
    posts: (Array.isArray(posts) ? posts : [posts]).map((post) => {
      return {
        ...post.fields,
        slug: post.fields.slug.replace(/^\//, ""),
      };
    }),
    blurb: (fields.blurb || []).map(({ sys }) => sys.fields) as Array<
      BlurbType["sys"]["fields"]
    >,
  };
};

export { getMenu, getPage, getHomepage };
