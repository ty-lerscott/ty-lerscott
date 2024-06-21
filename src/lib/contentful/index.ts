import type {
  PostType,
  HomepageType,
  BlurbType,
} from "@/types/contentful.types";
import type { Menu, MenuItem } from "@/types/components.types";
import { getEntriesByType, getEntryById } from "@/lib/contentful/helpers";

const getMenu = async () => {
  try {
    const { menuItems } = await getEntriesByType<Menu>({ contentType: "menu" });

    return menuItems.map(({ sys }) => sys.fields);
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );
    // TODO: match the return type of the try here as well
    return;
  }
};

const getPage = async <GenericPageType>(pageType: string) =>
  getEntriesByType<GenericPageType>({ contentType: pageType });

const getHomepage = async () => {
  const { blurb, pageName, description } =
    await getPage<HomepageType>("landingPage");
  const posts = await getEntriesByType<PostType[]>({
    contentType: "post",
  });

  return {
    description,
    title: pageName,
    posts: Array.isArray(posts) ? posts : [posts],
    blurb: blurb.map(({ sys }) => sys.fields) as Array<
      BlurbType["sys"]["fields"]
    >,
  };
};

export { getMenu, getPage, getHomepage };
