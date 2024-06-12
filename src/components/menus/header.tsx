import Link from "next/link";
import type { MenuItem } from "@/types/components/menu.types";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getMenu } from "@/lib/contentful";

const HeaderMenu = async () => {
  const menuItems = await getMenu();

  if (!menuItems) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {menuItems.map((menuItem) => (
          <NavigationMenuItem key={`menuItem-${menuItem.text}`}>
            <Link href={menuItem.url} legacyBehavior passHref>
              <NavigationMenuLink>{menuItem.text}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderMenu;
