export type PageType = "home" | "about" | "posts" | "resume";

export type BaseType = {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
};

export type Entry = {
  metadata: {
    tags: string[];
  };
  sys: {
    space: BaseType["sys"];
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: BaseType["sys"];
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
  include?: number;
  contentType: string;
  pageType?: PageType;
  sort?: "asc" | "desc";
};

export type ContentfulResponse = {
  sys: BaseType["sys"] & {
    createdAt: string;
    updatedAt: string;
  };
  total: Pagination["total"];
  skip: Pagination["skip"];
  limit: number;
  items: (BaseType & { fields: Record<string, any> })[];
  includes: {
    Entry: Entry[];
    Asset: Entry[];
  };
};

export type ResponseBody<T> = {
  pagination: Pagination;
  data: T;
};
