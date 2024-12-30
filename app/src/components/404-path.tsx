"use client";

import { usePathname } from "next/navigation";

const Path = () => {
	const pathname = usePathname();

	return (
		<h1 className="text-center">
			😟 Womp Womp, <span className="text-[--foreground]">{pathname}</span>{" "}
			doesnt seem available 😟
		</h1>
	);
};

export default Path;
