import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getMenu } from "@/lib/contentful";
import { Separator } from "@/components/ui/separator";

const HeaderMenu = async () => {
  const menuItems = await getMenu();

  if (!menuItems) return null;

  return (
    <div>
      <header className="container max-w-screen-md flex items-center justify-between px-4 py-4">
        <Link href="/">Tyler Scott</Link>
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
      </header>
      <Separator />
    </div>
  );
};

export default HeaderMenu;
