const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        const { isServer } = options;
        config.plugins.push(
            new NextFederationPlugin({
                name: 'auth',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './LoginPage': './src/pages/login',
                    './RegisterPage': './src/pages/register',
                    './ProfilePage': './src/pages/profile',
                    './ForgotPasswordPage': './src/pages/forgot-password',
                    './ResetPasswordPage': './src/pages/reset-password',
                    './AuthProvider': './src/providers/auth-provider',
                    './useAuth': './src/hooks/use-auth',
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

module.exports = nextConfig;
