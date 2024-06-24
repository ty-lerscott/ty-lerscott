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
    contentType?: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    locale: string;
  };
  fields: Record<string, any>;
  [key: string]: any;
};

export type ContentfulResponse = {
  sys: {
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  total: number;
  skip: number;
  limit: number;
  includes: {
    Entry: EntryType[];
    Asset: EntryType[]; //TODO: may not be the proper type check later
  };
};
