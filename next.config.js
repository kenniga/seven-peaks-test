/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.guim.co.uk',
            },
            {
                protocol: 'http',
                hostname: 'static.guim.co.uk',
            },
            {
                protocol: 'https',
                hostname: 'static.guim.co.uk',
            },
        ],
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
}

module.exports = nextConfig
