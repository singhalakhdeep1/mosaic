const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        const { isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'lifestyle',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './EventsPage': './src/pages/events',
                    './VenuesPage': './src/pages/venues',
                    './BookingsPage': './src/pages/bookings',
                    './EventDetailsPage': './src/pages/event-details',
                    './VenueDetailsPage': './src/pages/venue-details',
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
