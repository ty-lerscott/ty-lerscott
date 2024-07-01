import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import type { TagClassesType } from "~/colors";
import type { Tag as TagType } from "@/types/generics.types";

import styles from "./styles";

const Tag = ({ text, href, dashed, variant }: Omit<TagType, "type">) => {
  const Component = href ? Link : "span";
  const url = href ? `/tags/${href as string}` : "";

  const props = {
    ...(url && { href: url || "" }),
    "data-testid": "Tag",
    className: cn([
      styles.DEFAULT_STYLES,
      url
        ? "transition-colors transition-[color,background-color,border-color,text-decoration-color,outline-color]"
        : "hover:cursor-default",
      {
        ["outline-dashed"]: dashed,
      },
      Object.entries(styles.TagStyles[variant as TagClassesType] || {}).filter(
        ([key, style]) => {
          return url ? style : key === "hover" ? "" : style;
        },
      ),
    ]),
  } as LinkProps;

  return (
    <Component {...props}>
      {url ? (
        <span
          className={`pr-1.5 pl-1.5 flex h-full items-center text-xs ${styles.HashStyles[variant as TagClassesType]}`}
        >
          #
        </span>
      ) : null}
      <span className={styles.spacing}>{text.toLowerCase()}</span>
    </Component>
  );
};

export default Tag;
