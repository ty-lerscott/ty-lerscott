import type { ReactNode } from "react";
import type { LinkProps } from "next/link";

export type Link = LinkProps & {
  text: string;
  type: "link";
  external?: boolean;
  target?: string;
  rel?: string;
  href: string;
};

export type Space = {
  type: "space";
  amount: "1x" | "2x" | "3x" | "4x" | "default";
};

export type SocialLink = {
  href: string;
  type: "socialLink";
  brand: "Instagram" | "Github" | "LinkedIn";
};

type HeaderTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Header = {
  type: "header";
  tag?: HeaderTag;
  header: string | ReactNode;
  subheader?: string | ReactNode;
};

export type Tag = {
  type: "tag";
  text: string;
  href?: string;
  variant: string;
  dashed: boolean;
};

export type Menu = {
  name: string;
  body: (Link | SocialLink)[];
};

export type PageParams = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
};

export type Image = {
  title: string;
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

export type Text = {
  tag:
    | HeaderTag
    | "p"
    | "span"
    | "strong"
    | "em"
    | "mark"
    | "del"
    | "ins"
    | "small";
  text: string;
  type: "text";
};

export type List = {
  type: "list";
  name: string; // This is not optional, but recursive calls dont pass it down
  header?: string;
  ordered: boolean;
  subheader?: string;
  body: (Text | Link | List)[];
};

export type Quote = {
  type: "quote";
  text: string;
  author?: string;
};

export const CodeSyntax = {
  typescript: "typescript",
  javascript: "javascript",
  css: "css",
  scss: "scss",
  gleam: "gleam",
};

export type Code = {
  type: "code";
  text: string;
  header?: string;
  subheader?: string;
  syntax: keyof typeof CodeSyntax;
};

export type TableRow = {
  name: string;
  body: string[];
};

export type Table = {
  type: "table";
  name: string;
  header?: string;
  subheader?: string;
  columns: string[];
  body: TableRow[];
};

export type Separator = {
  type: "separator";
};

export type Body =
  | Text
  | Code
  | Link
  | List
  | Quote
  | Table
  | Header
  | Space
  | Separator;

export type Page = {
  slug: string;
  title: string;
  keywords: string[];
  description: string;
  body: Body[];
};

export type ResumeSkill = {
  name: string;
  type: "resumeSkill";
  comfortLevel: number;
  startDate: string;
  isActive: boolean;
  endDate?: string;
  favorite: boolean;
};

export type WorkExperience = {
  type: "workExperience";
  name: string;
  title: string;
  company: string;
  location: string;
  workStyle: "hybrid" | "in-office" | "remote";
  startDate: string;
  endDate?: string;
  body: (Header | Text)[];
};

export type Resume = Page & {
  resumeSkills: ResumeSkill[];
  workExperience: WorkExperience[];
  education: Header[];
  resumeBio: string;
};

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
