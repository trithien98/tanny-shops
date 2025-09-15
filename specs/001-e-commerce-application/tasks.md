# Tasks: E-commerce Application Platform

**Input**: Feature specification from `/specs/001-e-commerce-application/spec.md`
**Prerequisites**: spec.md (available), plan.md (needed), data-model.md, contracts/

## Execution Flow (main)

```
1. Load spec.md from feature directory
   → ✅ LOADED: E-commerce platform with microfrontend architecture
   → Extracted: 8 key entities, 20 functional requirements, 8 user scenarios
2. Infer technical structure from original description:
   → Tech stack: Next.js + Microfrontends + Turborepo + PNPM
   → Architecture: Route-based federation, Docker, Neon Postgres
3. Generate tasks by category:
   → Setup: Turborepo init, dependencies, microfrontend config
   → Tests: Entity tests, API contract tests, integration tests
   → Core: Models, services, microfrontend apps
   → Integration: Database, payments, authentication
   → Polish: Performance, monitoring, documentation
4. Apply task rules:
   → Microfrontend apps = mark [P] for parallel
   → Shared packages = sequential dependencies
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph for monorepo structure
7. Create parallel execution examples for team ownership
8. Validate task completeness for e-commerce requirements
9. Return: SUCCESS (tasks ready for squad execution)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different microfrontends, no dependencies)
- Include exact file paths in monorepo structure

## Path Conventions

- **Turborepo structure**: `apps/`, `packages/`, `infra/`
- **Microfrontend apps**: `apps/mfe-storefront/`, `apps/mfe-checkout/`, `apps/mfe-account/`, `apps/mfe-admin/`
- **Backend API**: `apps/api/`
- **Shared packages**: `packages/ui/`, `packages/auth/`, `packages/api-client/`

## Phase 3.1: Setup

- [ ] T001 Initialize Turborepo monorepo with PNPM workspaces in root directory
- [ ] T002 Create microfrontend project structure (apps/, packages/, infra/)
- [ ] T003 [P] Configure shared packages: packages/ui, packages/auth, packages/api-client
- [ ] T004 [P] Setup development tooling: ESLint, Prettier, TypeScript config
- [ ] T005 Configure Docker setup for API in infra/docker/
- [ ] T006 Setup Neon Postgres connection and Prisma schema in infra/db/

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Entity Tests

- [ ] T007 [P] Product model test in apps/api/tests/models/test_product.test.ts
- [ ] T008 [P] Customer model test in apps/api/tests/models/test_customer.test.ts
- [ ] T009 [P] Order model test in apps/api/tests/models/test_order.test.ts
- [ ] T010 [P] Cart model test in apps/api/tests/models/test_cart.test.ts
- [ ] T011 [P] Payment model test in apps/api/tests/models/test_payment.test.ts

### API Contract Tests

- [ ] T012 [P] Products API contract tests in apps/api/tests/contracts/test_products.test.ts
- [ ] T013 [P] Customers API contract tests in apps/api/tests/contracts/test_customers.test.ts
- [ ] T014 [P] Orders API contract tests in apps/api/tests/contracts/test_orders.test.ts
- [ ] T015 [P] Cart API contract tests in apps/api/tests/contracts/test_cart.test.ts
- [ ] T016 [P] Payments API contract tests in apps/api/tests/contracts/test_payments.test.ts

### Integration Tests

- [ ] T017 [P] Customer browsing flow test in apps/mfe-storefront/tests/integration/test_browsing.test.ts
- [ ] T018 [P] Checkout process test in apps/mfe-checkout/tests/integration/test_checkout.test.ts
- [ ] T019 [P] Account management test in apps/mfe-account/tests/integration/test_account.test.ts
- [ ] T020 [P] Admin operations test in apps/mfe-admin/tests/integration/test_admin.test.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Database Models

- [ ] T021 [P] Product model in apps/api/src/models/Product.ts
- [ ] T022 [P] Customer model in apps/api/src/models/Customer.ts
- [ ] T023 [P] Order model in apps/api/src/models/Order.ts
- [ ] T024 [P] Cart model in apps/api/src/models/Cart.ts
- [ ] T025 [P] Payment model in apps/api/src/models/Payment.ts

### API Services

- [ ] T026 ProductService CRUD operations in apps/api/src/services/ProductService.ts
- [ ] T027 CustomerService authentication and profile in apps/api/src/services/CustomerService.ts
- [ ] T028 OrderService processing and tracking in apps/api/src/services/OrderService.ts
- [ ] T029 CartService session management in apps/api/src/services/CartService.ts
- [ ] T030 PaymentService Stripe integration in apps/api/src/services/PaymentService.ts

### API Endpoints

- [ ] T031 Products API endpoints in apps/api/src/routes/products.ts
- [ ] T032 Customers API endpoints in apps/api/src/routes/customers.ts
- [ ] T033 Orders API endpoints in apps/api/src/routes/orders.ts
- [ ] T034 Cart API endpoints in apps/api/src/routes/cart.ts
- [ ] T035 Payments API endpoints in apps/api/src/routes/payments.ts

### Microfrontend Applications

- [ ] T036 [P] Storefront MFE (browse, search, PDP) in apps/mfe-storefront/
- [ ] T037 [P] Checkout MFE (CSR payment flow) in apps/mfe-checkout/
- [ ] T038 [P] Account MFE (profile, orders, addresses) in apps/mfe-account/
- [ ] T039 [P] Admin MFE (catalog, orders, analytics) in apps/mfe-admin/

## Phase 3.4: Integration

### Authentication & Authorization

- [ ] T040 Clerk authentication integration in packages/auth/
- [ ] T041 Role-based access control middleware in apps/api/src/middleware/auth.ts
- [ ] T042 Session management across microfrontends in packages/auth/

### Payment Integration

- [ ] T043 Stripe Elements integration in apps/mfe-checkout/src/components/PaymentForm.tsx
- [ ] T044 Payment webhooks handling in apps/api/src/webhooks/stripe.ts
- [ ] T045 Order confirmation flow between checkout and API

### Database Connections

- [ ] T046 Prisma client setup and migrations in apps/api/src/db/
- [ ] T047 Database connection pooling and error handling
- [ ] T048 Data consistency validation across services

### Module Federation

- [ ] T049 Configure webpack module federation for checkout MFE
- [ ] T050 Setup microfrontend routing and composition
- [ ] T051 Cross-MFE communication and state sharing

## Phase 3.5: Polish

### Performance & Monitoring

- [ ] T052 [P] API response time optimization (<200ms target)
- [ ] T053 [P] Frontend performance monitoring and analytics
- [ ] T054 [P] Database query optimization and indexing
- [ ] T055 [P] CDN and caching strategy implementation

### Testing & Quality

- [ ] T056 [P] Unit tests for shared packages in packages/\*/tests/
- [ ] T057 [P] E2E tests for complete user journeys
- [ ] T058 [P] Load testing for concurrent user scenarios
- [ ] T059 [P] Security testing for payment and auth flows

### Documentation & Deployment

- [ ] T060 [P] API documentation in docs/api.md
- [ ] T061 [P] Microfrontend architecture documentation
- [ ] T062 [P] CI/CD pipeline setup for GitHub Actions
- [ ] T063 [P] Deployment configuration for Vercel and Docker

## Dependencies

### Sequential Dependencies

- T001-T006 (Setup) before all other phases
- T007-T020 (Tests) before T021-T039 (Implementation)
- T021-T025 (Models) before T026-T030 (Services)
- T026-T030 (Services) before T031-T035 (Endpoints)
- T040-T042 (Auth) before T036-T039 (MFEs)
- T043-T045 (Payments) before T037 (Checkout MFE completion)
- T046-T048 (Database) before T026-T035 (Services/Endpoints)
- All core implementation before T052-T063 (Polish)

### Parallel Opportunities

- Models (T021-T025) can run in parallel
- Contract tests (T012-T016) can run in parallel
- Integration tests (T017-T020) can run in parallel
- MFE development (T036-T039) can run in parallel by different squads
- Polish tasks (T052-T063) can run in parallel

## Squad Ownership & Parallel Execution

### Squad Atlas (Storefront)

```bash
# Can work in parallel on:
Task: "Storefront MFE (browse, search, PDP) in apps/mfe-storefront/"
Task: "Customer browsing flow test in apps/mfe-storefront/tests/integration/test_browsing.test.ts"
```

### Squad Orion (Checkout)

```bash
# Can work in parallel on:
Task: "Checkout MFE (CSR payment flow) in apps/mfe-checkout/"
Task: "Stripe Elements integration in apps/mfe-checkout/src/components/PaymentForm.tsx"
```

### Squad Nova (Account)

```bash
# Can work in parallel on:
Task: "Account MFE (profile, orders, addresses) in apps/mfe-account/"
Task: "Account management test in apps/mfe-account/tests/integration/test_account.test.ts"
```

### Squad Mercury (Admin)

```bash
# Can work in parallel on:
Task: "Admin MFE (catalog, orders, analytics) in apps/mfe-admin/"
Task: "Admin operations test in apps/mfe-admin/tests/integration/test_admin.test.ts"
```

### Squad Gateway (API)

```bash
# Sequential work required for shared API:
Task: "Product model in apps/api/src/models/Product.ts"
Task: "ProductService CRUD operations in apps/api/src/services/ProductService.ts"
Task: "Products API endpoints in apps/api/src/routes/products.ts"
```

## Notes

- [P] tasks target different files/microfrontends with no shared dependencies
- Each squad owns their microfrontend and can develop independently
- API development requires sequential execution due to shared service dependencies
- Verify all tests fail before implementing corresponding functionality
- Use feature branches per squad: `atlas/storefront-implementation`, `orion/checkout-flow`
- Commit after each completed task for atomic changes

## Validation Checklist

_GATE: Checked during execution_

- [x] All key entities have corresponding model tasks
- [x] All functional requirements covered by integration tests
- [x] All user scenarios have corresponding test tasks
- [x] Tests come before implementation in dependency order
- [x] Parallel tasks truly independent (different apps/files)
- [x] Each task specifies exact file path in monorepo
- [x] No task modifies same file as another [P] task
- [x] Squad ownership clearly defined for microfrontend architecture
