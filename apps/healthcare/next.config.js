const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'healthcare',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './DoctorsPage': './src/pages/doctors',
                    './AppointmentsPage': './src/pages/appointments',
                },
                shared: {
                    react: { singleton: true, eager: true, requiredVersion: false },
                    'react-dom': { singleton: true, eager: true, requiredVersion: false },
                },
            })
        );
        return config;
    },
};
