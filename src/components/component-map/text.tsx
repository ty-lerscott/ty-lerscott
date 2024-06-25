import { cn } from "@/lib/utils";
import type { Text as TextType } from "@/types/generics.types";

const Text = ({
  tag,
  text,
  className,
}: Omit<TextType, "type"> & {
  className?: string;
}) => {
  const Tag = tag;

  return (
    <Tag data-testid="Text" className={cn(className)}>
      {text}
    </Tag>
  );
};
export default Text;
