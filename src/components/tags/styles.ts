import { colorsArr, type TagClassesType } from "~/colors";

const spacing = "inline-block py-1 px-2";

const DEFAULT_STYLES =
  "group  tracking-wider outline outline-2 rounded-full text-xs bg-transparent overflow-hidden";
const DEFAULT_HOVER_STYLES =
  "transition-[color,background-color,border-color,text-decoration-color,outline-color] h-full";
const DEFAULT_HASH = `${spacing} ${DEFAULT_HOVER_STYLES} text-[--background]`;

const TagStyles = {
  [colorsArr[0]]: {
    color: "text-tomatoFrog-300 outline-tomatoFrog-300",
    hash: "bg-tomatoFrog-300 group-hover:bg-tomatoFrog-100",
    hover: "hover:text-tomatoFrog-100 hover:outline-tomatoFrog-100",
  },
  [colorsArr[1]]: {
    color: "text-persimmonOrange-300 outline-persimmonOrange-300",
    hash: "bg-persimmonOrange-300 group-hover:bg-persimmonOrange-100",
    hover: "hover:text-persimmonOrange-100 hover:outline-persimmonOrange-100",
  },
  [colorsArr[2]]: {
    color: "text-miamiMarmalade-300 outline-miamiMarmalade-300",
    hash: "bg-miamiMarmalade-300 group-hover:bg-miamiMarmalade-100",
    hover: "hover:text-miamiMarmalade-100 hover:outline-miamiMarmalade-100",
  },
  [colorsArr[3]]: {
    color: "text-seLeiOrange-300 outline-seLeiOrange-300",
    hash: "bg-seLeiOrange-300 group-hover:bg-seLeiOrange-100",
    hover: "hover:text-seLeiOrange-100 hover:outline-seLeiOrange-100",
  },
  [colorsArr[4]]: {
    color: "text-goBananas-300 outline-goBananas-300",
    hash: "bg-goBananas-300 group-hover:bg-goBananas-100",
    hover: "hover:text-goBananas-100 hover:outline-goBananas-100",
  },
  [colorsArr[5]]: {
    color: "text-laudableLime-300 outline-laudableLime-300",
    hash: "bg-laudableLime-300 group-hover:bg-laudableLime-100",
    hover: "hover:text-laudableLime-100 hover:outline-laudableLime-100",
  },
  [colorsArr[6]]: {
    color: "text-marineGreen-300 outline-marineGreen-300",
    hash: "bg-marineGreen-300 group-hover:bg-marineGreen-100",
    hover: "hover:text-marineGreen-100 hover:outline-marineGreen-100",
  },
  [colorsArr[7]]: {
    color: "text-mirageLake-300 outline-mirageLake-300",
    hash: "bg-mirageLake-300 group-hover:bg-mirageLake-100",
    hover: "hover:text-mirageLake-100 hover:outline-mirageLake-100",
  },
  [colorsArr[8]]: {
    color: "text-copenBlue-300 outline-copenBlue-300",
    hash: "bg-copenBlue-300 group-hover:bg-copenBlue-100",
    hover: "hover:text-copenBlue-100 hover:outline-copenBlue-100",
  },
  [colorsArr[9]]: {
    color: "text-prominentBlue-300 outline-prominentBlue-300",
    hash: "bg-prominentBlue-300 group-hover:bg-prominentBlue-100",
    hover: "hover:text-prominentBlue-100 hover:outline-prominentBlue-100",
  },
} as Record<TagClassesType, { hash: string; color: string; hover: string }>;

const HashStyles = {
  [colorsArr[0]]: "text-tomatoFrog-600 bg-tomatoFrog-300",
  [colorsArr[1]]: "text-persimmonOrange-600 bg-persimmonOrange-300",
  [colorsArr[2]]: "text-miamiMarmalade-600 bg-miamiMarmalade-300",
  [colorsArr[3]]: "text-seLeiOrange-600 bg-seLeiOrange-300",
  [colorsArr[4]]: "text-goBananas-600 bg-goBananas-300",
  [colorsArr[5]]: "text-laudableLime-600 bg-laudableLime-300",
  [colorsArr[6]]: "text-marineGreen-600 bg-marineGreen-300",
  [colorsArr[7]]: "text-mirageLake-600 bg-mirageLake-300",
  [colorsArr[8]]: "text-copenBlue-600 bg-copenBlue-300",
  [colorsArr[9]]: "",
};

const styles = {
  spacing,
  TagStyles,
  HashStyles,
  DEFAULT_HASH,
  DEFAULT_STYLES,
  DEFAULT_HOVER_STYLES,
};

export default styles;
