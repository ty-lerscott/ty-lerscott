const IS_LOCAL = process.env.LOCAL_API;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: IS_LOCAL ? "http://canopy.lerscott.local:3100/api/:path*": "https://canopy.lerscott.com/api/:path*",
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
            }
        ]
    }
};

export default nextConfig;
