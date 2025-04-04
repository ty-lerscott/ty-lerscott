"use client";

import { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi2";

import type { Image } from "@/types";
import { cn, setImageUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const setBlurImageUrl = (id: string): string =>
	`${setImageUrl(id)}?quality=75&transforms=${encodeURIComponent(JSON.stringify([["blur", 10]]))}`;

const ImageBackground = ({
	className,
	...image
}: Partial<Image> & { className?: string }) => {
	const [loading, setLoading] = useState(true);
	const [src, setSrc] = useState(setBlurImageUrl((image as Image).id));
	const isAIGenerated = image.description
		?.toLowerCase()
		.includes("ai generated");

	useEffect(() => {
		let highResTimer: NodeJS.Timeout;

		const imageHighRes = new Image();

		imageHighRes.src = setImageUrl((image as Image).id);

		imageHighRes.onload = () => {
			setLoading(false);
			highResTimer = setTimeout(() => {
				setSrc(imageHighRes.src);
			}, 1500);
		};

		return () => {
			imageHighRes.onload = null;
			clearTimeout(highResTimer);
		};
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	}, [image]);

	return (
		<div
			className={cn(
				"w-full h-full rounded overflow-hidden relative",
				className,
			)}
		>
			{isAIGenerated && !loading ? (
				<HiSparkles className="absolute bottom-2 right-2 text-[--ghost] size-6 z-20" />
			) : null}
			<div
				className={cn(
					"rounded",
					"absolute top-0 left-0 right-0 bottom-0",
					"transition-all bg-cover bg-no-repeat bg-center z-10",
				)}
				style={{
					backgroundImage: `url(${src})`,
				}}
				title={image.description || ""}
			/>

			{loading ? (
				<Skeleton className="w-full h-full rounded absolute top-0 left-0 right-0 bottom-0 z-0" />
			) : null}
		</div>
	);
};

export default ImageBackground;
