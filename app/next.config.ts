import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/favicon.ico",
				destination: "/api/favicon",
			},
			{
				source: "/favicon.png",
				destination: "/api/favicon",
			},
			{
				source: "/rss.xml",
				destination: "/api/rss",
			},
			{
				source: "/profile-card.png",
				destination: "/api/profile-card",
			},
			{
				source: "/.well-known/atproto-did",
				destination: "/api/at-proto",
			},
		];
	},
};

export default nextConfig;
