const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'learning',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './CoursesPage': './src/pages/courses',
                    './LessonsPage': './src/pages/lessons',
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
