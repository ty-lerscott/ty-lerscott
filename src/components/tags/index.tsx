import Tag from "@/components/tags/tag";
import type { Tag as TagType } from "@/types/generics.types";

const Tags = ({ tags }: { tags: TagType[] }) => {
  return (
    <div data-testid="Tags" className="mt-4 flex gap-2">
      {tags.map((tag) => {
        return <Tag {...tag} key={tag.text} />;
      })}
    </div>
  );
};

export default Tags;
