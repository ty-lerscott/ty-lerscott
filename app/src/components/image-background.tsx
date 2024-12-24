"use client";

import { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import type { Image } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
const isLocal = process.env.NODE_ENV === "development";

const setUrl = ({ id }: Image) =>
	`https://${hostname}.${isLocal ? "local" : "com"}/assets/${id}`;

const setBlurImageUrl = (image: Image) => {
	return `${setUrl(image)}?transforms=${encodeURIComponent(JSON.stringify([["blur", 10]]))}`;
};

const ImageBackground = (image: Image) => {
	const [loading, setLoading] = useState(true);
	const [src, setSrc] = useState(setBlurImageUrl(image));
	const isAIGenerated = image.description
		?.toLowerCase()
		.includes("ai generated");

	useEffect(() => {
		let blurTimer: NodeJS.Timeout;
		let highResTimer: NodeJS.Timeout;

		const imageBlur = new Image();
		const imageHighRes = new Image();

		imageHighRes.src = setUrl(image);
		imageBlur.src = setBlurImageUrl(image);

		imageBlur.onload = () => {
			blurTimer = setTimeout(() => {
				setLoading(false);
			}, 100);
		};

		imageHighRes.onload = () => {
			setLoading(false);
			highResTimer = setTimeout(() => {
				setSrc(imageHighRes.src);
			}, 1500);
		};

		return () => {
			imageBlur.onload = null;
			imageHighRes.onload = null;
			clearTimeout(blurTimer);
			clearTimeout(highResTimer);
		};
	}, [image]);

	return (
		<div className="w-full h-full rounded overflow-hidden">
			{isAIGenerated && !loading ? (
				<HiSparkles className="absolute bottom-2 right-2 text-[--ghost] size-6 z-20" />
			) : null}
			<div
				className={cn(
					"w-full h-full rounded",
					loading ? "opacity-0" : "opacity-100",
					"absolute top-0 left-0 right-0 bottom-0",
					"transition-all bg-cover bg-no-repeat bg-center z-10",
				)}
				style={{
					backgroundImage: `url(${src})`,
				}}
				title={image.description || ""}
			/>

			<Skeleton className="w-full h-full rounded absolute top-0 left-0 right-0 bottom-0 z-0" />
		</div>
	);
};

export default ImageBackground;
