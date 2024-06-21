import { GenericWrapper } from "@/types/generics.types";

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

type ImageType = {
  sys: {
    type: string;
    linkType: "Asset";
    id: string;
    createdAt: string;
    fields: {
      title: string;
      file: {
        url: string;
        details: {
          size: number;
          image: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
  };
};

type TagType = {
  sys: {
    type: string;
    linkType: "Entry";
    id: string;
    createdAt: string;
    fields: {
      text: string;
      slug: string;
      color: string;
    };
  };
};

export type PostType = {
  title: string;
  description: string;
  publishDate: string;
  image: ImageType;
  tags: TagType[];
  body: any[]; // TODO: maybe not have an any object here, make it of the valid types that can go in body
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

export type BlurbType = {
  sys: GenericWrapper & {
    fields: {
      text: string;
      tag: TextTag;
    };
  };
};

export type HomepageType = {
  pageName: string;
  description: string;
  blurb: Array<BlurbType>;
};
