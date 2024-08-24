import {join, resolve, dirname} from 'path';
import {fileURLToPath} from "node:url";
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IS_LOCAL = process.env.API_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `https://canopy.lerscott.${IS_LOCAL ? 'local' : 'com'}/:path*`
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
    },
};

export default nextConfig;
