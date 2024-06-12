import type { Menu, MenuItem } from "@/types/components/menu.types";
import { getEntriesByType, getEntryById } from "@/lib/contentful/helpers";

const getMenu = async () => {
  try {
    const { menuItems } = await getEntriesByType<Menu>("menu");

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

export { getMenu };
