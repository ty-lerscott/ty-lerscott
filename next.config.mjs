const IS_LOCAL = process.env.LOCAL_API === 'true' || process.env.LOCAL_API === true;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: IS_LOCAL ? "http://canopy.lerscott.local:3100/api/:path*": "https://canopy.lerscott.com/api/:path*"
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
