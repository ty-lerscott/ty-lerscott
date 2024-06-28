import { cn } from "@/lib/utils";
import { isValidElement, PropsWithChildren } from "react";
import type { Header as HeaderType } from "@/types/generics.types";

const Tag = ({
  tag = "h2",
  children,
  className,
}: PropsWithChildren & { className?: string; tag: HeaderType["tag"] }) => {
  const Component = tag;
  const props = {
    className: cn("font-bold", className),
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
      {!subheader ? null : isValidElement(subheader) ? (
        subheader
      ) : (
        <span>{subheader}</span>
      )}
    </div>
  );
};

export default Header;
