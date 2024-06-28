import { cn } from "@/lib/utils";
import Tag from "@/components/tags/tag";
import type { Tag as TagType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Tags = ({ tags, className }: { tags: TagType[]; className?: string }) => {
  return (
    <div data-testid="Tags" className={cn(styles.Tags, className)}>
      {tags.map((tag) => {
        return <Tag {...tag} key={tag.text} />;
      })}
    </div>
  );
};

export default Tags;
