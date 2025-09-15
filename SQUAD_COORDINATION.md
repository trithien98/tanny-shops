# Squad Coordination Guide

## Branch Strategy

Each squad has their own feature branch for parallel development:

- **Squad Atlas**: `atlas/storefront-implementation` - Storefront MFE
- **Squad Orion**: `orion/checkout-implementation` - Checkout & Payments MFE
- **Squad Nova**: `nova/account-implementation` - Account Management MFE
- **Squad Mercury**: `mercury/admin-implementation` - Admin Platform MFE
- **Squad Gateway**: `gateway/api-implementation` - Backend API

## Development Workflow

### 1. Phase 2 Coordination (Current)

Each squad should:

1. **Switch to their branch**: `git checkout [squad-branch]`
2. **Pull latest changes**: `git pull origin 001-e-commerce-application`
3. **Start with failing tests** (TDD approach)
4. **Implement to make tests pass**
5. **Commit frequently** with descriptive messages
6. **Push regularly** to share progress

### 2. Daily Sync Requirements

- **Daily standups** at 9:00 AM
- **Cross-squad blockers** discussed immediately
- **API changes** coordinated through Squad Gateway
- **Shared component updates** go through packages/

### 3. Dependencies & Coordination

#### Squad Gateway (API) - Must Complete First:

- Database models (T021-T025)
- API endpoints (T031-T035)
- Authentication middleware (T041)

#### Other Squads - Can Work in Parallel:

- Create failing tests for their domain
- Build UI components using @acme/ui
- Integrate with API once available

### 4. Integration Points

#### Shared Dependencies:

```bash
# All squads depend on:
@acme/ui          # Shared components
@acme/auth        # Authentication
@acme/api-client  # API communication
```

#### API Contracts:

- Products API: `/api/products`
- Customers API: `/api/customers`
- Orders API: `/api/orders`
- Cart API: `/api/cart`
- Payments API: `/api/payments`

### 5. Testing Strategy

#### Each Squad Must:

1. **Write failing tests first** (TDD)
2. **Integration tests** for their user flows
3. **Component tests** for UI pieces
4. **Contract tests** for API integration

#### Shared Testing:

- E2E tests run against integrated environment
- Performance tests on complete flows
- Security tests for auth and payments

### 6. Review Process

#### Before Merging:

1. All tests passing ✅
2. Code review by another squad member ✅
3. Integration with main branch tested ✅
4. No conflicts with other squads ✅

#### Merge Strategy:

1. Small, frequent merges preferred
2. Feature flags for incomplete features
3. Database migrations coordinated
4. Backward compatibility maintained

## Squad-Specific Guidelines

### Squad Atlas (Storefront)

- **Focus**: Product browsing, search, product detail pages
- **Key Tests**: T017 - browsing flow integration
- **Dependencies**: Products API, Categories API
- **Deliverables**: Homepage, PLP, PDP, Search results

### Squad Orion (Checkout)

- **Focus**: Cart, checkout flow, payments (CSR)
- **Key Tests**: T018 - checkout process integration
- **Dependencies**: Cart API, Orders API, Stripe integration
- **Deliverables**: Cart page, Checkout flow, Payment processing

### Squad Nova (Account)

- **Focus**: User profiles, order history, addresses
- **Key Tests**: T019 - account management integration
- **Dependencies**: Customers API, Orders API, Clerk auth
- **Deliverables**: Profile page, Order history, Address management

### Squad Mercury (Admin)

- **Focus**: Product management, order processing, analytics
- **Key Tests**: T020 - admin operations integration
- **Dependencies**: All APIs, Admin authentication
- **Deliverables**: Admin dashboard, Product CRUD, Order management

### Squad Gateway (API)

- **Focus**: Backend services, database, authentication
- **Key Tests**: T007-T016 - model and contract tests
- **Dependencies**: Database, external services
- **Deliverables**: REST API, Authentication, Data models

## Communication Channels

- **Slack**: #ecommerce-dev for general updates
- **GitHub**: PRs for code reviews and discussions
- **Meetings**: Daily standup + weekly squad sync
- **Documentation**: Keep README.md updated per app

## Emergency Procedures

### Blocking Issues:

1. **Post in #ecommerce-dev immediately**
2. **Tag relevant squad leads**
3. **Schedule emergency sync** if needed
4. **Document resolution** for future reference

### Breaking Changes:

1. **Notify all squads before implementation**
2. **Provide migration guide**
3. **Coordinate deployment timing**
4. **Monitor for issues post-deployment**
