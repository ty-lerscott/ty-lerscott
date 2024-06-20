import type {
  PageType,
  HomepageType,
  BlurbType,
} from "@/types/contentful.types";
import type { Menu, MenuItem } from "@/types/components.types";
import { getEntriesByType, getEntryById } from "@/lib/contentful/helpers";

const getMenu = async () => {
  try {
    const { menuItems } = await getEntriesByType<Menu>({ contentType: "menu" });

    return Promise.all(
      menuItems.map(({ sys }) => getEntryById<MenuItem>(sys.id)),
    );
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );
  }

  return [] as MenuItem[];
};

const getPage = async <GenericPageType>(pageType: string) =>
  getEntriesByType<PageType & GenericPageType>({ contentType: pageType });

const getHomepage = async () => {
  const { blurb: blurbs } = await getPage<HomepageType>("landingPage");
  const posts = await getEntriesByType({ contentType: "post" });

  const settledBlurbs = await Promise.all(
    blurbs.map(({ sys }) => getEntryById<BlurbType>(sys.id)),
  );

  return {
    posts,
    blurb: settledBlurbs,
  };
};

export { getMenu, getPage, getHomepage };
