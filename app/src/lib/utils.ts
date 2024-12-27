import pkg from "~/package.json";
import merge from "lodash.mergewith";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

const LOCAL_DEV = process.env.NODE_ENV === "development";
const META_TITLE = `${pkg.details.author.name} | ${pkg.details.author.profession}`;

const LOCAL_PREFIX = LOCAL_DEV ? "🌕 " : "";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const SITE_URL = (args?: { isAPI?: boolean; isCMS?: boolean }) => {
	const isCMS = args?.isCMS ?? false;

	return `https://${isCMS ? "cms" : "ty"}.lerscott.${LOCAL_DEV ? "local" : "com"}`;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const customMerge = (objValue: any, srcValue: any, key: string) => {
	// Check if we're dealing with the specific keys we want to merge
	if (["title", "siteName"].includes(key)) {
		// If both values are strings, concatenate them
		if (typeof objValue === "string" && typeof srcValue === "string") {
			return `${LOCAL_PREFIX}${srcValue}${objValue ? ` | ${objValue}` : ""}`;
		}
	}
	return undefined;
};

const setMetadata = (metadata: Metadata & { slug: string }): Metadata => {
	metadata.alternates = metadata.slug
		? { canonical: `${SITE_URL()}${metadata.slug}` }
		: {};

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

const kebabToTitleCase = (str: string): string => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const setImageUrl = (id: string) => `${SITE_URL({ isCMS: true })}/assets/${id}`;

const yearsAgo = (date: string): number =>
	Number(new Date().getFullYear()) - Number(date);

export { cn, SITE_URL, setMetadata, kebabToTitleCase, setImageUrl, yearsAgo };
