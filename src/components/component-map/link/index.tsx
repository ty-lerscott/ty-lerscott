import merge from "deepmerge";
import omit from "object.omit";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import type { Link as LinkType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Link = ({
  text,
  href,
  external,
  className,
  ...rest
}: Omit<LinkType, "type"> & { className?: string; type?: string }) => {
  const props = merge(omit(rest, "type"), {
    ...(external && {
      target: "__blank",
      rel: "noopener noreferrer",
    }),
  });

  return (
    <NextLink href={href} data-testid="Link" passHref legacyBehavior>
      <a {...props} className={cn(styles.Link, className)}>
        {text}
      </a>
    </NextLink>
  );
};

export default Link;
