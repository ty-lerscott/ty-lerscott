import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/rss.xml",
				destination: "/api/rss",
			},
			{
				source: "/profile-card.png",
				destination: "/api/profile-card",
			},
		];
	},
};

export default nextConfig;
