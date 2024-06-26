import NextLink from "next/link";
import type { Link as LinkType } from "@/types/generics.types";

const Link = (args: LinkType) => {
  const { type, text, external, url, ...props } = args;

  const additionalProps = {
    ...(external && {
      target: "__blank",
      rel: "noopener noreferrer",
    }),
  };

  return (
    <NextLink {...props} {...additionalProps} href={url}>
      {text}
    </NextLink>
  );
};

export default Link;
