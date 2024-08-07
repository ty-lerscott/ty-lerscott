import Link from "next/link";
import { getMenu } from "@/lib/contentful";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { Link as LinkType } from "@/types/generics.types";

import styles from "./styles.module.css";

const HeaderMenu = async () => {
  const menuItems = await getMenu<LinkType>();

  if (!menuItems) return null;

  return (
    <header className={styles.Header}>
      <Link href="/">Tyler Scott</Link>
      <NavigationMenu>
        <NavigationMenuList className={styles.MenuList}>
          {menuItems.map(({ text, href }) => (
            <NavigationMenuItem key={`menuItem-${text}`}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink>{text}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default HeaderMenu;
