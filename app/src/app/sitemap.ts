import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/utils";
import { getSitemap, type GetSitemapData } from "@/lib/cms";

const toYYYYMMDD = (date: string) => dayjs(date).format("YYYY-MM-DD");

const setPostAndTagPriority = (dateUpdated: string): number => {
	// Parse the input date and get the current date using Day.js
	const updatedDate = dayjs(dateUpdated);
	const currentDate = dayjs();

	// Calculate the difference in days
	const diffInDays = currentDate.diff(updatedDate, "day");

	// Define priority ranges based on age in days
	if (diffInDays <= 30) {
		return 0.9; // High priority for posts updated in the last 30 days
	}
	if (diffInDays <= 90) {
		return 0.7; // Medium priority for posts updated in the last 3 months
	}

	if (diffInDays <= 365) {
		return 0.5; // Lower priority for posts updated in the last year
	}
	return 0.3; // Lowest priority for older posts
};

const setPagePriority = (
	slug: string,
): MetadataRoute.Sitemap[number]["priority"] => {
	switch (slug) {
		case "/":
			return 1.0;
		case "/blog":
		case "/blog/tags":
			return 0.7;
		case "/resume":
			return 0.8;
		default:
			return 0.4;
	}
};

const setChangeFrequency = (
	slug: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] => {
	switch (slug) {
		case "/":
			return "daily";
		case "/blog":
		case "/blog/tags":
			return "weekly";
		default:
			return "monthly";
	}
};

const setLastModified = (
	slug: string,
	sitemapData: GetSitemapData,
	type: "pages" | "posts" | "tags",
): MetadataRoute.Sitemap[number]["lastModified"] => {
	switch (slug) {
		case "/":
		case "/blog":
			return toYYYYMMDD(sitemapData.posts[0].date_updated);
		case "/blog/tags":
			return toYYYYMMDD(sitemapData.tags[0].date_updated);
		default:
			return toYYYYMMDD(
				sitemapData[type].find((item) =>
					"metadata" in item ? item.metadata.slug === slug : item.slug === slug,
				)?.date_updated as string,
			);
	}
};

const normalizeSitemapData = (
	sitemapData: GetSitemapData,
): MetadataRoute.Sitemap => {
	const sitemapArray: MetadataRoute.Sitemap = [];

	const siteUrl = SITE_URL();

	for (const page of sitemapData.pages) {
		sitemapArray.push({
			url: `${siteUrl}${page.metadata.slug}`,
			priority: setPagePriority(page.metadata.slug),
			changeFrequency: setChangeFrequency(page.metadata.slug),
			lastModified: setLastModified(page.metadata.slug, sitemapData, "pages"),
		});
	}

	for (const post of sitemapData.posts) {
		console.log("POST", post);
		sitemapArray.push({
			url: `${siteUrl}/blog${post.metadata.slug}`,
			priority: setPostAndTagPriority(post.date_updated),
			changeFrequency: setChangeFrequency(post.metadata.slug),
			lastModified: setLastModified(post.metadata.slug, sitemapData, "posts"),
		});
	}

	for (const tag of sitemapData.tags) {
		sitemapArray.push({
			url: `${siteUrl}/blog/tags/${tag.slug}`,
			priority: setPostAndTagPriority(tag.date_updated),
			changeFrequency: setChangeFrequency(`/blog/tags/${tag.slug}`),
			lastModified: setLastModified(
				`/blog/tags/${tag.slug}`,
				sitemapData,
				"tags",
			),
		});
	}

	return sitemapArray;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const sitemapData = await getSitemap();

	return normalizeSitemapData(sitemapData);
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default sitemap;
