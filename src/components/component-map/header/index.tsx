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
    className: cn("leading-none", className),
  };
  return <Component {...props}>{children}</Component>;
};

const Header = ({
  header,
  className,
  subheader,
  tag = "h2",
  wrapperClassName,
}: Omit<HeaderType, "type"> & {
  className?: string;
  wrapperClassName?: string;
}) => {
  return (
    <div data-testid="Header" className={cn("flex flex-col", wrapperClassName)}>
      <Tag className={className} tag={tag}>
        {header}
      </Tag>
      {!subheader ? null : isValidElement(subheader) ? (
        subheader
      ) : (
        <span className="text-sm text-[--color-dark]">{subheader}</span>
      )}
    </div>
  );
};

export default Header;
