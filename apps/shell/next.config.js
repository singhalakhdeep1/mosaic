/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 's3.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.amazonaws.com',
            },
        ],
    },
    async rewrites() {
        return [
            { source: '/auth/:path*', destination: 'http://localhost:3001/:path*' },
            { source: '/lifestyle/:path*', destination: 'http://localhost:3002/:path*' },
            { source: '/ecommerce/:path*', destination: 'http://localhost:3003/:path*' },
            { source: '/learning/:path*', destination: 'http://localhost:3004/:path*' },
            { source: '/health/:path*', destination: 'http://localhost:3005/:path*' },
        ]
    },
}

module.exports = nextConfig
