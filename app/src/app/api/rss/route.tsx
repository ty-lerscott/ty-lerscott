import RSS from "rss";
import type { NextRequest } from "next/server";

import pkg from "~/package.json";
import { getPosts, getPage } from "@/lib/cms";
import { SITE_URL, META_TITLE } from "@/lib/utils";
import dayjs from "dayjs";

export async function GET(request: NextRequest) {
	const siteUrl = SITE_URL();
	const [page, posts] = await Promise.all([getPage("/blog"), getPosts()]);

	const feed = new RSS({
		language: "en",
		site_url: siteUrl,
		pubDate: new Date(),
		title: `Blog | ${META_TITLE}`,
		feed_url: `${siteUrl}/rss.xml`,
		webMaster: pkg.details.author.name,
		description: page.metadata.description,
		managingEditor: pkg.details.author.name,
		copyright: `All rights reserved ${new Date().getFullYear()}`,
	});

	for (const post of posts) {
		feed.item({
			title: post.metadata.title,
			description: post.metadata.description,
			url: `${siteUrl}${post.metadata.slug}`,
			date: dayjs(post.publish_date).format("YYYY-MM-DD HH:mm:ss"),
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
