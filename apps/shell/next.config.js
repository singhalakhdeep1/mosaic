const { withModuleFederation } = require('@module-federation/nextjs-mf')

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
}

const federationConfig = {
    name: 'shell',
    filename: 'static/chunks/remoteEntry.js',
    remotes: {
        auth: `auth@http://localhost:3001/_next/static/${process.env.NODE_ENV === 'production' ? 'ssr' : 'development'}/remoteEntry.js`,
        lifestyle: `lifestyle@http://localhost:3002/_next/static/${process.env.NODE_ENV === 'production' ? 'ssr' : 'development'}/remoteEntry.js`,
        ecommerce: `ecommerce@http://localhost:3003/_next/static/${process.env.NODE_ENV === 'production' ? 'ssr' : 'development'}/remoteEntry.js`,
        learning: `learning@http://localhost:3004/_next/static/${process.env.NODE_ENV === 'production' ? 'ssr' : 'development'}/remoteEntry.js`,
        health: `health@http://localhost:3005/_next/static/${process.env.NODE_ENV === 'production' ? 'ssr' : 'development'}/remoteEntry.js`,
    },
    exposes: {},
    shared: {
        react: {
            singleton: true,
            requiredVersion: false,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: false,
        },
    },
}

module.exports = withModuleFederation(nextConfig, federationConfig)
