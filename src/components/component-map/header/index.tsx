import { cn } from "@/lib/utils";
import { isValidElement, type ReactNode, ElementType } from "react";
import type { Header as HeaderType } from "@/types/generics.types";

const Tag = ({
  tag,
  children,
  className,
}: Pick<HeaderType, "tag"> & {
  className?: string;
  children?: ReactNode | JSX.Element | "string";
}) => {
  const Component = tag as ElementType;

  return <Component className={className}>{children}</Component>;
};

const Header = ({
  header,
  className,
  subheader,
  tag = "h2",
  subClassName,
  wrapperClassName,
}: Omit<HeaderType, "type"> & {
  className?: string;
  subClassName?: string;
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
        <span className={cn("text-sm text-[--secondary] mt-0.5", subClassName)}>
          {subheader}
        </span>
      )}
    </div>
  );
};

export default Header;
