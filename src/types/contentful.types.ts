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
