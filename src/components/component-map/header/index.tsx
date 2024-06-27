import { cn } from "@/lib/utils";
import type { Header as HeaderType } from "@/types/generics.types";

import styles from "./styles.module.css";
import { PropsWithChildren, ReactNode } from "react";

const Tag = ({
  tag = "h2",
  children,
  className,
}: PropsWithChildren & { className?: string; tag: HeaderType["tag"] }) => {
  const Component = tag;
  const props = {
    className: cn(styles.Header, styles[tag], className),
  };
  return <Component {...props}>{children}</Component>;
};

const Header = ({
  header,
  className,
  subheader,
  tag = "h2",
}: Omit<HeaderType, "type"> & { className?: string }) => {
  return (
    <div data-testid="Header">
      <Tag className={className} tag={tag}>
        {header}
      </Tag>
      {subheader ? <span>{subheader}</span> : null}
    </div>
  );
};

export default Header;
