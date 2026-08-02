// Qiankun integration for mosaic

import { registerMicroApps, start, initGlobalState } from 'qiankun';

export function registerQiankunApps() {
  const apps = [
    {
      name: 'auth',
      entry: '//localhost:3001',
      container: '#subapp-container',
      activeRule: '/auth',
    },
    {
      name: 'ecommerce',
      entry: '//localhost:3002',
      container: '#subapp-container',
      activeRule: '/shop',
    },
    {
      name: 'healthcare',
      entry: '//localhost:3003',
      container: '#subapp-container',
      activeRule: '/health',
    },
    {
      name: 'learning',
      entry: '//localhost:3004',
      container: '#subapp-container',
      activeRule: '/learn',
    },
    {
      name: 'lifestyle',
      entry: '//localhost:3005',
      container: '#subapp-container',
      activeRule: '/lifestyle',
    },
  ];

  registerMicroApps(apps, {
    beforeLoad: [
      (app: any) => {
        console.log('[qiankun] before load', app.name);
        return Promise.resolve(app);
      },
    ],
    beforeMount: [
      (app: any) => {
        console.log('[qiankun] before mount', app.name);
        return Promise.resolve(app);
      },
    ],
    afterMount: [
      (app: any) => {
        console.log('[qiankun] after mount', app.name);
        return Promise.resolve(app);
      },
    ],
    afterUnmount: [
      (app: any) => {
        console.log('[qiankun] after unload', app.name);
        return Promise.resolve(app);
      },
    ],
  });

  start({
    sandbox: {
      strictStyleIsolation: true,
      experimentalStyleIsolation: true,
    },
    singular: false,
    prefetch: true,
  });
}

export function initGlobalStateStore() {
  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: null,
    theme: 'light',
    language: 'en',
  });

  onGlobalStateChange((state: any, prev: any) => {
    console.log('[qiankun] global state change', state, prev);
  });

  return { onGlobalStateChange, setGlobalState };
}

export function updateGlobalState(state: any) {
  const { setGlobalState } = initGlobalStateStore();
  setGlobalState(state);
}
