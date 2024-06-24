import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import type { Tag as TagType } from "@/types/generics.types";

const Tag = ({ text, slug, variant }: TagType) => {
  return (
    <Link href={`/tags/${slug}`} className={badgeVariants({ variant })}>
      {text}
    </Link>
  );
};

export default Tag;
