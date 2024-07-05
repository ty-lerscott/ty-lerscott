import { cn } from "@/lib/utils";
import type { ElementType } from "react";
import Link, { LinkProps } from "next/link";
import type { TagClassesType } from "~/colors";
import type { Tag as TagType } from "@/types/generics.types";

import styles from "./styles";

const Tag = ({ text, href, variant }: Omit<TagType, "type">) => {
  const Component = href ? Link : ("span" as ElementType);
  const url = href ? `/tags/${href as string}` : "";

  const tagStyles = styles.TagStyles[variant as TagClassesType];

  const props = {
    ...(url && { href: url || "" }),
    "data-testid": "Tag",
    className: cn("px-0", [
      styles.DEFAULT_STYLES,
      tagStyles.color,
      url
        ? [styles.DEFAULT_HOVER_STYLES, tagStyles.hover]
        : "hover:cursor-default",
    ]),
  } as LinkProps;

  return (
    <Component {...props}>
      {url ? (
        <span
          data-state="url"
          className={cn(styles.DEFAULT_HASH, tagStyles.hash, "font-semibold")}
        >
          #
        </span>
      ) : null}
      <span className={cn(styles.spacing)}>{text.toLowerCase()}</span>
    </Component>
  );
};

export default Tag;
