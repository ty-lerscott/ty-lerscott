import { GenericWrapper } from "@/types/generics.types";

export type MenuItem = {
  sys: GenericWrapper & {
    fields: {
      url: string;
      text: string;
      external: boolean;
    };
  };
};

export type Menu = {
  metadata: {
    tags: string[];
  };
  sys: Record<string, any>; // I don't really care about this for now
  fields: {
    menuTitle: string;
    menuItems: MenuItem[];
  };
};
