import Link from "next/link";
import type { PropsWithChildren } from "react";

import { badgeVariants } from "./badge";
import type { Tag as TagType } from "@/types";

const Tag = ({
	slug,
	color,
	children,
	text_color,
}: PropsWithChildren<Omit<TagType, "name">>) => {
	return (
		<Link
			href={`/blog/tags/${slug}`}
			className={badgeVariants()}
			style={{
				...(color && {
					backgroundColor: color,
					color: text_color?.includes("#") ? text_color : `var(${text_color})`,
				}),
			}}
		>
			{children}
		</Link>
	);
};

export default Tag;
