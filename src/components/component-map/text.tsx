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

  const fontSize = tag === "small" ? "text-sm" : "";

  return (
    <Tag data-testid="Text" className={cn(className, fontSize)}>
      {text}
    </Tag>
  );
};
export default Text;
