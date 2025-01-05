import type { Metadata } from "next";
import { FaInfinity } from "react-icons/fa";

import getFact from "@/lib/get-fact";
import Path from "@/components/404-path";
import { setMetadata } from "@/lib/utils";

export const metadata: Metadata = setMetadata({
	slug: "/404",
	alternates: {
		canonical: "/404",
	},
	title: "Not Found",
});

const NotFoundPage = async () => {
	const { text } = await getFact(true);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<FaInfinity className="w-48 h-40 text-[--subtle]" />

			<Path />

			<div className="mt-4 flex flex-col gap-2 items-center">
				<h3 className="text-center text-[--foreground]">
					Here&apos;s a random fact to compensate for the awkwardness:
				</h3>
				<span className="block text-center text-sm max-w-[80%] text-[--ghost] leading-4">
					{text}
				</span>
			</div>
		</div>
	);
};

export const dynamic = "force-dynamic";
export default NotFoundPage;
