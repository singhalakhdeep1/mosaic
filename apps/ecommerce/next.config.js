const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        const { isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'ecommerce',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './ProductsPage': './src/pages/products',
                    './CartPage': './src/pages/cart',
                    './CheckoutPage': './src/pages/checkout',
                    './OrdersPage': './src/pages/orders',
                },
                shared: {
                    react: { singleton: true, eager: true, requiredVersion: false },
                    'react-dom': { singleton: true, eager: true, requiredVersion: false },
                },
            })
        );
        return config;
    },
    images: {
        domains: ['localhost', 's3.amazonaws.com', 'cloudinary.com'],
    },
};

module.exports = nextConfig;
