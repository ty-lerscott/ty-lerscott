import { BadgeProps } from "@/components/ui/badge";

export type MenuItem = {
  url: string;
  type: "link";
  text: string;
  external: boolean;
};

export type Menu = {
  menuTitle: string;
  menuItems: MenuItem[];
};

export type PageParams = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
};

export type Page = {
  slug: string;
  title: string;
  keywords: string[];
  description: string;
  body: any[]; // TODO: conditional elements
};

export type Image = {
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
  type: "tag";
  text: string;
  slug: string;
  variant: BadgeProps["variant"];
};

export type Text = {
  tag:
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
  text: string;
  type: "text";
};

export type Default = {
  type: "default";
};

export type Code = {
  type: "code";
  text: string;
  syntax: "typescript" | "css" | "gleam" | "scss";
};

export type Body = Text | Code | Default;

export type Post = {
  tags: Tag[];
  image: Image;
  slug: string;
  title: string;
  keywords: string[];
  description: string;
  publishDate: string;
  body: Body[];
};
