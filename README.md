# Universal Platform - Microfrontend Architecture

A production-ready microfrontend platform built with Next.js 15, Module Federation, and Turborepo.

## Architecture

```
Universal Platform
├── apps/
│   ├── shell/              # Container app (Port 3000)
│   ├── auth-mfe/           # Authentication (Port 3001)
│   ├── lifestyle-mfe/      # Lifestyle Services (Port 3002)
│   ├── ecommerce-mfe/      # E-Commerce (Port 3003)
│   ├── learning-mfe/       # Learning Platform (Port 3004)
│   └── health-mfe/         # Healthcare (Port 3005)
│
└── packages/
    ├── ui/                 # Shared UI components (shadcn/ui)
    ├── utils/              # Shared utilities
    ├── types/              # TypeScript types
    ├── api-client/         # API integration layer
    └── config/             # Shared configuration
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.3
- **Monorepo:** Turborepo + pnpm workspaces
- **UI:** shadcn/ui + Radix UI + Tailwind CSS
- **State:** Zustand + React Query (TanStack Query)
- **API:** REST (Axios) + WebSockets (Socket.io)
- **Forms:** React Hook Form + Zod
- **Payments:** Stripe Elements
- **Real-time:** Socket.io
- **Module Federation:** Webpack 5

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start all microfrontends
pnpm dev

# Or start specific app
pnpm dev --filter shell
pnpm dev --filter auth-mfe
pnpm dev --filter lifestyle-mfe
```

### Available Apps

| App | Port | URL | Description |
|-----|------|-----|-------------|
| Shell | 3000 | http://localhost:3000 | Container app |
| Auth MFE | 3001 | http://localhost:3001 | Authentication |
| Lifestyle MFE | 3002 | http://localhost:3002 | Events, Venues, Bookings |
| E-Commerce MFE | 3003 | http://localhost:3003 | Shopping, Cart, Orders |
| Learning MFE | 3004 | http://localhost:3004 | Courses, Lessons |
| Health MFE | 3005 | http://localhost:3005 | Healthcare, Appointments |

## Packages

### Shared UI (`packages/ui`)
shadcn/ui components and design system

### API Client (`packages/api-client`)
REST API and WebSocket integration

### Types (`packages/types`)
Shared TypeScript types and interfaces

### Utils (`packages/utils`)
Common utility functions

## Development

```bash
# Run all apps in dev mode
pnpm dev

# Build all apps
pnpm build

# Run production build
pnpm start

# Type check
pnpm type-check

# Lint
pnpm lint

# Clean build artifacts
pnpm clean
```

## 🎯 Features

### Authentication (auth-mfe)
- ✅ Login / Register
- ✅ Email Verification
- ✅ Password Reset
- ✅ Profile Management
- ✅ JWT Token Management

### Lifestyle Services (lifestyle-mfe)
- ✅ Event Planning
- ✅ Venue Marketplace
- ✅ Booking System
- ✅ Payment Processing
- ✅ Reviews & Ratings

### E-Commerce (ecommerce-mfe)
- ✅ Product Catalog
- ✅ Shopping Cart
- ✅ Checkout
- ✅ Order Management
- ✅ Payment Integration

### Learning Platform (learning-mfe)
- ✅ Course Catalog
- ✅ Video Lessons
- ✅ Progress Tracking
- ✅ Quizzes & Assignments
- ✅ Certificates

### Healthcare (health-mfe)
- ✅ Doctor Profiles
- ✅ Appointment Booking
- ✅ Medical Records
- ✅ Video Consultations
- ✅ Prescriptions

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Integration](./docs/API_INTEGRATION.md)
- [Module Federation](./docs/MODULE_FEDERATION.md)
- [Deployment](./docs/DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📄 License

Proprietary - All rights reserved.

---

**Built with ❤️ using cutting-edge 2026 technologies**
