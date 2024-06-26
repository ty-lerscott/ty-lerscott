import { cn } from "@/lib/utils";
import Tag from "@/components/tags/tag";
import type { Tag as TagType } from "@/types/generics.types";

const Tags = ({ tags, className }: { tags: TagType[]; className?: string }) => {
  return (
    <div data-testid="Tags" className={cn(`mt-4 flex gap-2 mb-8`, className)}>
      {tags.map((tag) => {
        return <Tag {...tag} key={tag.text} />;
      })}
    </div>
  );
};

export default Tags;
