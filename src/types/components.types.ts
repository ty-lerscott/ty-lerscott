import { GenericWrapper } from "@/types/generics.types";

export type MenuItem = GenericWrapper & {
  fields: {
    url: string;
    text: string;
    external: boolean;
  };
};

export type Menu = {
  menuTitle: string;
  menuItems: {
    sys: MenuItem;
  }[];
};
