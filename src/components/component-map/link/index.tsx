import { cn } from "@/lib/utils";
import NextLink from "next/link";
import type { Link as LinkType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Link = ({
  type,
  text,
  href,
  external,
  className,
  ...rest
}: Omit<LinkType, "type"> & { className?: string }) => {
  const props = {
    ...rest,
    ...(external && {
      target: "__blank",
      rel: "noopener noreferrer",
    }),
  } as LinkType;

  return (
    <NextLink href={href} data-testid="Link" passHref legacyBehavior>
      <a {...props} className={cn(styles.Link, className)}>
        {text}
      </a>
    </NextLink>
  );
};

export default Link;
