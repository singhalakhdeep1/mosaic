# Mosaic - Implementation

## Overview
This document describes the micro-frontend framework integrations added to Mosaic.

## Technologies Added

### 1. Single-SPA
- Single-SPA registration
- Micro-frontend application registration
- Active route configuration
- Layout engine integration
- Custom props handling
- URL routing
- Navigation utilities

### 2. Qiankun
- Qiankun micro-app registration
- Entry point configuration
- Container mounting
- Active rule matching
- Lifecycle hooks (beforeLoad, beforeMount, afterMount, afterUnmount)
- Global state management
- State change listeners
- Sandbox configuration
- Style isolation

### 3. Webpack Module Federation 2.0
- Module Federation SDK integration
- Shell configuration
- Remote module configurations
- Component exposure
- Shared dependencies
- Singleton management
- Remote component loading
- Dynamic imports
- Runtime plugins

### 4. Bit
- Bit workspace management
- Component listing
- Component creation
- Export/import operations
- Tagging and versioning
- Build and test execution
- Dependency management
- Environment configuration
- Scope management
- Component ejection/removal

## Files Created

### Shared State
- `packages/shared-state/single-spa.ts` - Single-SPA integration
- `packages/shared-state/qiankun.ts` - Qiankun integration
- `packages/shared-state/module-federation.ts` - Webpack Module Federation
- `packages/shared-state/bit.ts` - Bit component management

## Installation Required

Add to `package.json`:
```json
{
  "dependencies": {
    "single-spa": "^6.0.0",
    "single-spa-layout": "^2.0.0",
    "qiankun": "^2.10.0",
    "@module-federation/sdk": "^2.0.0",
    "@teambit/workspace": "^1.0.0"
  }
}
```

Run:
```bash
npm install
```

## Environment Variables

```env
# Single-SPA
SINGLE_SPA_DEV_SERVER=http://localhost:3000

# Qiankun
QIANKUN_AUTH_ENTRY=http://localhost:3001
QIANKUN_ECOMMERCE_ENTRY=http://localhost:3002
QIANKUN_HEALTHCARE_ENTRY=http://localhost:3003
QIANKUN_LEARNING_ENTRY=http://localhost:3004
QIANKUN_LIFESTYLE_ENTRY=http://localhost:3005

# Module Federation
SHELL_REMOTE_ENTRY=http://localhost:3000/remoteEntry.js

# Bit
BIT_WORKSPACE_PATH=.
BIT_SCOPE=mosaic
```

## Notes
- All code is written but packages are not installed (per user request)
- Single-SPA requires SystemJS for dynamic imports
- Qiankun requires micro-apps to be built with proper entry points
- Module Federation requires Webpack 5
- Bit requires Bit CLI and workspace setup
- All frameworks support independent deployment
- Global state sharing varies by framework
