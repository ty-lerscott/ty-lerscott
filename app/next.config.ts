import type { NextConfig } from "next";

const IS_LOCAL = process.env.API_ENV === "development";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `https://cms.lerscott.${IS_LOCAL ? "local" : "com"}/:path*`,
			},
		];
	},
};

export default nextConfig;
