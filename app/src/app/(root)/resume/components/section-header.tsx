import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export const SectionHeader = ({
	children,
	className,
}: PropsWithChildren & { className?: string }) => {
	return (
		<div className={cn("flex flex-col", className)}>
			<h3 className="p-4 border-y-2 border-[--ghost] text-center uppercase tracking-widest">
				{children}
			</h3>
		</div>
	);
};

export default SectionHeader;
