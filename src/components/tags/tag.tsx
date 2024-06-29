import Link from "next/link";
import { cn } from "@/lib/utils";
import { colorsArr, type TagClassesType } from "~/colors";
import type { Tag as TagType, Link as LinkType } from "@/types/generics.types";

const spacing = "py-1 px-2";

const DEFAULT_STYLES =
  "font-semibold tracking-wider outline outline-2 rounded-full text-2xs bg-transparent overflow-hidden flex";

const TagStyles = {
  [colorsArr[0]]: {
    bgColor: "bg-tomatoFrog",
    color: "text-tomatoFrog-100 outline-tomatoFrog-300",
    hover: "hover:text-tomatoFrog-100 hover:outline-tomatoFrog-300",
  },
  [colorsArr[1]]: {
    bgColor: "bg-persimmonOrange",
    color: "text-persimmonOrange-200 outline-persimmonOrange-400",
    hover: "hover:text-persimmonOrange-100 hover:outline-persimmonOrange-200",
  },
  [colorsArr[2]]: {
    bgColor: "bg-miamiMarmalade",
    color: "text-miamiMarmalade-200 outline-miamiMarmalade-400",
    hover: "hover:text-miamiMarmalade-50 hover:outline-miamiMarmalade-100",
  },
  [colorsArr[3]]: {
    bgColor: "bg-seLeiOrange",
    color: "text-seLeiOrange-200 outline-seLeiOrange-400",
    hover: "hover:text-seLeiOrange-100 hover:outline-seLeiOrange-100",
  },
  [colorsArr[4]]: {
    bgColor: "bg-goBananas-600",
    color: "text-goBananas-200 outline-goBananas-400",
    hover: "hover:text-goBananas-50 hover:outline-goBananas-100",
  },
  [colorsArr[5]]: {
    bgColor: "bg-laudableLime-600",
    color: "text-laudableLime-100 outline-laudableLime-400",
    hover: "hover:text-laudableLime-50 hover:outline-laudableLime-100",
  },
  [colorsArr[6]]: {
    bgColor: "bg-marineGreen-600",
    color: "text-marineGreen-200 outline-marineGreen-400",
    hover: "hover:text-marineGreen-100 hover:outline-marineGreen-100",
  },
  [colorsArr[7]]: {
    bgColor: "bg-mirageLake-600",
    color: "text-mirageLake-200 outline-mirageLake-400",
    hover: "hover:text-mirageLake-100 hover:outline-mirageLake-200",
  },
  [colorsArr[8]]: {
    bgColor: "bg-copenBlue",
    color: "text-copenBlue-200 outline-copenBlue-400",
    hover: "hover:text-copenBlue-100 hover:outline-copenBlue-200",
  },
  [colorsArr[9]]: {
    bgColor: "bg-prominentBlue",
    color: "text-prominentBlue-200 outline-prominentBlue-400",
    hover: "hover:text-prominentBlue-100 hover:outline-prominentBlue-200",
  },
} as Record<TagClassesType, { bgColor: string; color: string; hover: string }>;

const HashStyles = {
  [colorsArr[0]]: "text-tomatoFrog-600 bg-tomatoFrog-400",
  [colorsArr[1]]: "text-persimmonOrange-600 bg-persimmonOrange-400",
  [colorsArr[2]]: "text-miamiMarmalade-600 bg-miamiMarmalade-400",
  [colorsArr[3]]: "text-seLeiOrange-600 bg-seLeiOrange-400",
  [colorsArr[4]]: "text-goBananas-600 bg-goBananas-300",
  [colorsArr[5]]: "text-laudableLime-600 bg-laudableLime-300",
  [colorsArr[6]]: "text-marineGreen-600 bg-marineGreen-400",
  [colorsArr[7]]: "text-mirageLake-600 bg-mirageLake-400",
  [colorsArr[8]]: "text-copenBlue-600 bg-copenBlue-400",
  [colorsArr[9]]: "text-prominentBlue-500 bg-prominentBlue-400",
};

const Tag = ({ text, href, dashed, variant }: Omit<TagType, "type">) => {
  const Component = href ? Link : "span";
  const url = href ? `/tags/${href as string}` : "";

  const props = {
    ...(url && { href: url }),
    "data-testid": "Tag",
    className: cn([
      DEFAULT_STYLES,
      url
        ? "transition-colors transition-[color,background-color,border-color,text-decoration-color,outline-color]"
        : "hover:cursor-default",
      {
        ["outline-dashed"]: dashed,
      },
      Object.entries(TagStyles[variant as TagClassesType] || {}).filter(
        ([key, style]) => {
          return url ? style : key === "hover" ? "" : style;
        },
      ),
    ]),
  } as Omit<TagType | LinkType, "type">;

  return (
    <Component {...props}>
      {url ? (
        <span
          className={`pr-1.5 pl-1.5 flex h-full items-center text-xs ${HashStyles[variant as TagClassesType]}`}
        >
          #
        </span>
      ) : null}
      <span className={spacing}>{text.toLowerCase()}</span>
    </Component>
  );
};

export default Tag;
