import Link from "next/link";
import { getMenu } from "@/lib/contentful";
import Separator from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import styles from "./styles.module.css";

const HeaderMenu = async () => {
  const menuItems = await getMenu();

  if (!menuItems) return null;

  return (
    <div data-testid="Header">
      <header className={styles.Header}>
        <Link href="/" className="Link">
          Tyler Scott
        </Link>
        <NavigationMenu>
          <NavigationMenuList className={styles.MenuList}>
            {menuItems.map(({ text, href }) => (
              <NavigationMenuItem key={`menuItem-${text}`}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink className="Link">
                    {text}
                  </NavigationMenuLink>
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
