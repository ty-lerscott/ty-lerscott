import { GenericSysType } from "@/types/generics.types";

export type EntryType = {
  metadata: {
    tags: Array<string>;
  };
  sys: {
    space: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    revision: number;
    contentType: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    locale: string;
  };
  fields: Record<string, any>;
};

export type ContentfulResponse = {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  includes: {
    Entry: EntryType[];
    //TODO: asset type
  };
};

export type PageType = {
  pageName: string;
};

type TextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "strong"
  | "em"
  | "mark"
  | "del"
  | "ins";

export type HomepageType = PageType & {
  blurb: Array<GenericSysType>;
};

export type BlurbType = {
  text: string;
  tag: TextTag;
};
