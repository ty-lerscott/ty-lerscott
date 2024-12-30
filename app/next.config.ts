import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/rss.xml",
				destination: "/api/rss",
			},
		];
	},
};

export default nextConfig;
