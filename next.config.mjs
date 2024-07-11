import {join, resolve, dirname} from 'path';
import webpack from 'webpack'
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IS_LOCAL = process.env.API_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: IS_LOCAL ? "http://canopy.lerscott.local:3100/:path*": "https://canopy.lerscott.com/:path*"
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
    webpack: (config, { webpack }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                sc: resolve(join(__dirname, 'src/plugins/safe-console.ts'))
            })
        );
        return config;
    },
};

export default nextConfig;
