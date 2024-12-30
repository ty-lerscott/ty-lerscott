import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/utils";

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: "*",
		allow: "/",
		disallow: ["/private/", "/_next/"],
	},
	sitemap: `${SITE_URL()}/sitemap.xml`,
});

export default robots;
