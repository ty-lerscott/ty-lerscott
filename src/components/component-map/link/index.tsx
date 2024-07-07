import omit from "object.omit";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import merge from "lodash.mergewith";
import { ButtonName } from "@/components/button";
import type { ButtonProps } from "@/components/button/types";
import type { Link as LinkType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Link = ({
  text,
  href,
  variant,
  external,
  className,
  ...rest
}: Omit<LinkType, "type"> & {
  type?: string;
  className?: string;
  variant?: ButtonProps["variant"];
}) => {
  const props = merge(omit(rest, "type"), {
    ...(external && {
      target: "__blank",
      rel: "noopener noreferrer",
    }),
  });

  return (
    <NextLink href={href} data-testid="Link" passHref legacyBehavior>
      <a
        {...props}
        className={cn(
          variant ? `Button ${ButtonName[variant]}` : styles.Link,
          className,
        )}
      >
        {text}
      </a>
    </NextLink>
  );
};

export default Link;
