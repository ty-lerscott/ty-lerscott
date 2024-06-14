import type { GenericSysType } from "@/types/generics.types";

export type MenuItemsResponse = GenericSysType;

export type Menu = {
  menuTitle: string;
  menuItems: MenuItemsResponse[];
};

export type MenuItem = {
  url: string;
  text: string;
  external: boolean;
};
