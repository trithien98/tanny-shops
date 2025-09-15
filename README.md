# E-commerce Platform - Microfrontend Architecture

A modern e-commerce platform built with microfrontend architecture using Turborepo, Next.js, and PNPM workspaces.

## Project Structure

```
/
├── apps/                          # Applications
│   ├── mfe-storefront/           # Storefront MFE (Squad Atlas)
│   ├── mfe-checkout/             # Checkout MFE (Squad Orion)
│   ├── mfe-account/              # Account MFE (Squad Nova)
│   ├── mfe-admin/                # Admin MFE (Squad Mercury)
│   └── api/                      # Backend API (Squad Gateway)
├── packages/                     # Shared packages
│   ├── ui/                       # Shared UI components
│   ├── auth/                     # Authentication utilities
│   └── api-client/               # API client and types
├── infra/                        # Infrastructure
│   ├── docker/                   # Docker configurations
│   └── db/                       # Database schema and migrations
└── specs/                        # Feature specifications
```

## Tech Stack

- **Monorepo**: Turborepo + PNPM workspaces
- **Frontend**: Next.js App Router with microfrontends
- **Backend**: Node.js/Express API
- **Database**: Neon Postgres with Prisma
- **Authentication**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel (MFEs) + Docker (API)

## Squad Ownership

- **Squad Atlas**: Storefront (browse, search, product pages)
- **Squad Orion**: Checkout & Payments (cart, checkout flow)
- **Squad Nova**: Account Management (profile, orders, addresses)
- **Squad Mercury**: Admin Platform (catalog, analytics, operations)
- **Squad Gateway**: API Backend (shared services, database)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all applications
pnpm build

# Run tests
pnpm test
```

## Development Workflow

1. Each squad works in their dedicated app directory
2. Shared components and utilities go in `/packages`
3. Follow TDD approach: write tests first, then implement
4. Use feature branches per squad for parallel development
5. API changes require coordination through Squad Gateway

## Environment Setup

Copy `.env.example` to `.env.local` and configure:

- Database connection (Neon)
- Authentication (Clerk)
- Payment processing (Stripe)
- External APIs and services