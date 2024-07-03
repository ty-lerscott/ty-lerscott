import type { Text as TextType } from "@/types/generics.types";

const Text = ({
  tag = "p",
  text,
  className,
}: Omit<TextType, "type"> & {
  className?: string;
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className} data-testid="Text">
      {text}
    </Tag>
  );
};
export default Text;
