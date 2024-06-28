import Link from "next/link";
import { cn } from "@/lib/utils";
import { colorsArr, type TagClassesType } from "~/tailwind.config";
import type { Tag as TagType } from "@/types/generics.types";

const DEFAULT_STYLES =
  "py-1 px-2 font-semibold outline outline-2 rounded-full text-xs bg-transparent";

const TagStyles = {
  [colorsArr[0]]: {
    bgColor: "bg-tomatoFrog",
    color: "text-tomatoFrog-200 outline-persimmonOrange-300",
    hover: "hover:text-tomatoFrog-100",
  },
  [colorsArr[1]]: {
    bgColor: "bg-persimmonOrange",
    color: "text-persimmonOrange-200 outline-persimmonOrange-300",
    hover: "hover:text-persimmonOrange-100",
  },
  [colorsArr[2]]: {
    bgColor: "bg-miamiMarmalade",
    color: "text-miamiMarmalade-200 outline-miamiMarmalade-300",
    hover: "hover:text-miamiMarmalade-100",
  },
  [colorsArr[3]]: {
    bgColor: "bg-seLeiOrange",
    color: "text-seLeiOrange-200 outline-seLeiOrange-300",
    hover: "hover:text-seLeiOrange-100",
  },
  [colorsArr[4]]: {
    bgColor: "bg-goBananas",
    color: "text-goBananas-200 outline-goBananas-300",
    hover: "hover:text-goBananas-100",
  },
  [colorsArr[5]]: {
    bgColor: "bg-laudableLime",
    color: "text-laudableLime-200 outline-laudableLime-300",
    hover: "hover:text-laudableLime-100",
  },
  [colorsArr[6]]: {
    bgColor: "bg-marineGreen",
    color: "text-marineGreen-200 outline-marineGreen-300",
    hover: "hover:text-marineGreen-100",
  },
  [colorsArr[7]]: {
    bgColor: "bg-mirageLake",
    color: "text-mirageLake-200 outline-mirageLake-300",
    hover: "hover:text-mirageLake-100",
  },
  [colorsArr[8]]: {
    bgColor: "bg-copenBlue",
    color: "text-copenBlue-200 outline-copenBlue-300",
    hover: "hover:text-copenBlue-100",
  },
  [colorsArr[9]]: {
    bgColor: "bg-prominentBlue",
    color: "text-prominentBlue-200 outline-prominentBlue-300",
    hover: "hover:text-prominentBlue-100",
  },
} as Record<TagClassesType, { bgColor: string; color: string; hover: string }>;

const Tag = ({ text, href, dashed, variant }: Omit<TagType, "type">) => {
  const Component = href ? Link : "span";
  const url = href ? `/tags/${href as string}` : "";

  return (
    <Component
      href={url}
      className={cn([
        DEFAULT_STYLES,
        url ? "hover:transition-colors" : "hover:cursor-default",
        {
          ["outline-dashed"]: dashed,
        },
        Object.entries(TagStyles[variant as TagClassesType] || {}).filter(
          ([key, style]) => {
            return url ? style : key === "hover" ? "" : style;
          },
        ),
      ])}
    >
      #/{text.toLowerCase()}
    </Component>
  );
};

export default Tag;
