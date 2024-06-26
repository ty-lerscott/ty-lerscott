import { Image, Tag, List } from "@/types/generics.types";

export type PageType = "home" | "about" | "posts" | "resume";

export type Entry = {
  metadata: {
    tags: string[];
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
    contentType?: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    locale: string;
  };
  fields: {
    file?: {
      contentType: string;
    };
    [key: string]: any;
  };
  // [key: string]: any;
};

export type Pagination = {
  total: number;
  skip: number;
};

export type SearchParams = {
  skip?: number;
  slug?: string;
  name?: string;
  order?: string;
  limit?: number;
  select?: string[];
  contentType: string;
  pageType?: PageType;
  sort?: "asc" | "desc";
};

export type ContentfulResponseItem = {
  fields: {
    body?: any[];
    image?: Image;
    tags?: (Tag & {
      sys: {
        id: string;
      };
    })[];
    [key: string]: any;
  };
};

export type ContentfulResponse = {
  sys: {
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  total: Pagination["total"];
  skip: Pagination["skip"];
  limit: number;
  items: ContentfulResponseItem[];
  includes: {
    Entry: Entry[];
    Asset: Entry[];
  };
};

export type ResponseBody<T> = {
  pagination: Pagination;
  data: T;
};
