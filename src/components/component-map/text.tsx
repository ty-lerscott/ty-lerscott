import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import type { Text as TextType } from "@/types/generics.types";

const Text = ({
  tag,
  children,
  className,
}: PropsWithChildren &
  Omit<TextType, "text" | "type"> & {
    className?: string;
  }) => {
  const Tag = tag;

  return (
    <Tag data-testid="Text" className={cn(className)}>
      {children}
    </Tag>
  );
};
export default Text;
