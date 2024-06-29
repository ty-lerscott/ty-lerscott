import type { Text as TextType } from "@/types/generics.types";

const Text = ({
  tag,
  text,
  className,
}: Omit<TextType, "type"> & {
  className?: string;
}) => {
  const Tag = tag;

  const props = {
    className,
    "data-testid": "Text",
  };

  return <Tag {...props}>{text}</Tag>;
};
export default Text;
