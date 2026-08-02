// Webpack Module Federation 2.0 integration for mosaic

import { FederatedTypeScriptModule } from '@module-federation/sdk';

export const moduleFederationConfig: FederatedTypeScriptModule = {
  name: 'shell',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
    './Header': './src/components/Header',
    './Footer': './src/components/Footer',
    './Layout': './src/components/Layout',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
    '@mosaic/types': { singleton: true },
    '@mosaic/utils': { singleton: true },
    '@mosaic/api-client': { singleton: true },
  },
  runtimePlugins: [],
};

export const authModuleConfig: FederatedTypeScriptModule = {
  name: 'auth',
  filename: 'remoteEntry.js',
  remotes: {
    shell: 'shell@http://localhost:3000/remoteEntry.js',
  },
  exposes: {
    './Login': './src/components/Login',
    './Register': './src/components/Register',
    './AuthProvider': './src/context/AuthContext',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
};

export const ecommerceModuleConfig: FederatedTypeScriptModule = {
  name: 'ecommerce',
  filename: 'remoteEntry.js',
  remotes: {
    shell: 'shell@http://localhost:3000/remoteEntry.js',
  },
  exposes: {
    './ProductList': './src/components/ProductList',
    './ProductCard': './src/components/ProductCard',
    './Cart': './src/components/Cart',
    './Checkout': './src/components/Checkout',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
};

export function loadRemoteComponent(remoteName: string, componentName: string) {
  return async () => {
    const scope = remoteName;
    const module = await (window as any)[scope].get(componentName);
    const Component = module().default;
    return Component;
  };
}

export function dynamicImport(remoteName: string, componentName: string) {
  return React.lazy(
    loadRemoteComponent(remoteName, componentName)
  );
}
