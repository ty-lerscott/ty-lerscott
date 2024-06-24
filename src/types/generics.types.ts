import { BadgeProps } from "@/components/ui/badge";

export type GenericWrapper = {
  type: string;
  linkType: string;
  id: string;
  createdAt: string;
};

export type PageParams = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
};

export type Page = {
  data: {
    fields: {
      slug: string;
      title: string;
      keywords: string[];
      description: string;
      body: any[]; // TODO: conditional elements
    };
  };
};

type Image = {
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

export type Tag = {
  text: string;
  slug: string;
  variant: BadgeProps["variant"]; // TODO: be specific here
};

export type Post = {
  tags: Tag[];
  image: Image;
  slug: string;
  title: string;
  keywords: string[];
  description: string;
  publishDate: string;
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
