import pkg from "~/package.json";
import merge from "lodash.mergewith";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

const LOCAL_APP = process.env.NEXT_PUBLIC_APP_ENV === "development";
const LOCAL_DEV = process.env.NODE_ENV === "development";
const LOCAL_API = process.env.API_ENV === "development";
const PREVIEW_MODE = process.env.PREVIEW_MODE === "true";
const META_TITLE = `${pkg.details.author.name} | ${pkg.details.author.profession}`;

const LOCAL_PREFIX = LOCAL_DEV
	? `${LOCAL_APP ? "🌑" : "🌕"}${LOCAL_API ? "⚪" : "🟢"}${PREVIEW_MODE ? "<👀" : ""} `
	: "";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const customMerge = (objValue: any, srcValue: any, key: string) => {
	// Check if we're dealing with the specific keys we want to merge
	if (["title", "siteName"].includes(key)) {
		// If both values are strings, concatenate them
		if (typeof objValue === "string" && typeof srcValue === "string") {
			return `${LOCAL_PREFIX}${srcValue} | ${objValue}`;
		}
	}
	return undefined;
};

const setMetadata = (metadata: Metadata): Metadata => {
	return merge(
		{},
		{
			title: META_TITLE,
			keywords: "",
			description: "",
			creator: pkg.details.author.name,
			authors: [{ name: pkg.details.author.name }],
			metadataBase: pkg.details.author.website,
			alternates: {
				canonical: "/",
			},
			openGraph: {
				title: "",
				images: [],
				description: "",
				type: "website",
				locale: "en_US",
				logo: "/favicon.ico",
				siteName: META_TITLE,
				url: pkg.details.author.website,
			},
		},
		metadata,
		customMerge,
	);
};

export { cn, setMetadata };
