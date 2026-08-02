// Single-SPA integration for mosaic

import { registerApplication, start } from 'single-spa';
import { constructApplications, constructRoutes, constructLayoutEngine } from 'single-spa-layout';

export function registerMicroFrontends() {
  const applications = [
    {
      name: '@mosaic/auth',
      app: () => System.import('@mosaic/auth'),
      activeWhen: ['/auth', '/login', '/register'],
    },
    {
      name: '@mosaic/ecommerce',
      app: () => System.import('@mosaic/ecommerce'),
      activeWhen: ['/shop', '/products', '/cart'],
    },
    {
      name: '@mosaic/healthcare',
      app: () => System.import('@mosaic/healthcare'),
      activeWhen: ['/health', '/medical'],
    },
    {
      name: '@mosaic/learning',
      app: () => System.import('@mosaic/learning'),
      activeWhen: ['/learn', '/courses'],
    },
    {
      name: '@mosaic/lifestyle',
      app: () => System.import('@mosaic/lifestyle'),
      activeWhen: ['/lifestyle', '/fitness'],
    },
  ];

  applications.forEach(app => {
    registerApplication({
      ...app,
      customProps: {
        domElementGetter: () => document.getElementById('micro-frontend-container'),
      },
    });
  });

  start({
    urlRerouteOnly: true,
  });
}

export async function registerWithLayout() {
  const routes = constructRoutes({
    routes: [
      {
        type: 'route',
        path: '/auth',
        routes: [
          {
            type: 'application',
            name: '@mosaic/auth',
          },
        ],
      },
      {
        type: 'route',
        path: '/shop',
        routes: [
          {
            type: 'application',
            name: '@mosaic/ecommerce',
          },
        ],
      },
      {
        type: 'route',
        default: true,
        routes: [
          {
            type: 'application',
            name: '@mosaic/shell',
          },
        ],
      },
    ],
  });

  const applications = constructApplications({
    routes,
    loadApp: ({ name }) => System.import(name),
  });

  const layoutEngine = constructLayoutEngine({
    routes,
    applications,
    active: false,
  });

  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
}

export function navigateTo(url: string) {
  (window as any).history.pushState({}, '', url);
  (window as any).history.dispatchEvents();
}
