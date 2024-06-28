import Link from "next/link";
import type { Tag as TagType } from "@/types/generics.types";

const stylesObj = {
  primary: "text-blue-500",
  secondary: "text-green-500",
  tertiary: "text-yellow-500",
  quaternary: "text-red-500",
};

type VariantProp = {
  variant: keyof typeof stylesObj;
};

const Tag = ({ text, slug, variant }: Omit<TagType, "type"> & VariantProp) => {
  const vari = variant;

  return <Link href={`/tags/${slug}`}>{text}</Link>;
};

export default Tag;
