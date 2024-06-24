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

// TODO: clean this up to match the page model
export type Menu = {
  data: {
    metadata: {
      tags: string[];
    };
    sys: Record<string, any>; // I don't really care about this for now
    fields: {
      menuTitle: string;
      menuItems: MenuItem[];
    };
  };
};
