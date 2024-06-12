export type MenuItemsResponse = {
  sys: {
    id: string;
  };
};

export type Menu = {
  menuTitle: string;
  menuItems: MenuItemsResponse[];
};

export type MenuItem = {
  url: string;
  text: string;
  external: boolean;
};
