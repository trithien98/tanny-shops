#!/bin/bash

# Phase 2 Squad Kickoff Script
# Run this to get your squad started with TDD development

set -e

SQUADS=("atlas" "orion" "nova" "mercury" "gateway")
BRANCHES=("atlas/storefront-implementation" "orion/checkout-implementation" "nova/account-implementation" "mercury/admin-implementation" "gateway/api-implementation")

echo "🚀 Phase 2: TDD Development Kickoff"
echo "=================================="

# Function to show squad options
show_squads() {
    echo "Available squads:"
    echo "  1) atlas    - Storefront (Product browsing, search, PDP)"
    echo "  2) orion    - Checkout (Cart, payments, order flow)"
    echo "  3) nova     - Account (Profile, orders, addresses)"  
    echo "  4) mercury  - Admin (Product management, analytics)"
    echo "  5) gateway  - API (Backend services, database)"
    echo ""
}

# Get squad selection
if [ -z "$1" ]; then
    show_squads
    read -p "Select your squad (1-5): " choice
    case $choice in
        1) SQUAD="atlas" ;;
        2) SQUAD="orion" ;;
        3) SQUAD="nova" ;;
        4) SQUAD="mercury" ;;
        5) SQUAD="gateway" ;;
        *) echo "Invalid choice"; exit 1 ;;
    esac
else
    SQUAD=$1
fi

# Validate squad
if [[ ! " ${SQUADS[@]} " =~ " ${SQUAD} " ]]; then
    echo "❌ Invalid squad: $SQUAD"
    show_squads
    exit 1
fi

echo "👥 Squad selected: ${SQUAD^^}"

# Get branch name
case $SQUAD in
    "atlas") BRANCH="atlas/storefront-implementation" ;;
    "orion") BRANCH="orion/checkout-implementation" ;;
    "nova") BRANCH="nova/account-implementation" ;;
    "mercury") BRANCH="mercury/admin-implementation" ;;
    "gateway") BRANCH="gateway/api-implementation" ;;
esac

echo "🌿 Switching to branch: $BRANCH"
git checkout $BRANCH

echo "📦 Installing dependencies for your squad..."
case $SQUAD in
    "atlas")
        pnpm install --filter=@acme/mfe-storefront
        echo "📍 Your app: apps/mfe-storefront/"
        echo "🧪 Your tests: apps/mfe-storefront/tests/"
        echo "🎯 Focus: Product browsing, search, product detail pages"
        ;;
    "orion")
        pnpm install --filter=@acme/mfe-checkout
        echo "📍 Your app: apps/mfe-checkout/"
        echo "🧪 Your tests: apps/mfe-checkout/tests/"
        echo "🎯 Focus: Shopping cart, checkout flow, payments"
        ;;
    "nova")
        pnpm install --filter=@acme/mfe-account  
        echo "📍 Your app: apps/mfe-account/"
        echo "🧪 Your tests: apps/mfe-account/tests/"
        echo "🎯 Focus: User profiles, order history, address management"
        ;;
    "mercury")
        pnpm install --filter=@acme/mfe-admin
        echo "📍 Your app: apps/mfe-admin/"
        echo "🧪 Your tests: apps/mfe-admin/tests/"
        echo "🎯 Focus: Product management, order processing, analytics"
        ;;
    "gateway")
        pnpm install --filter=@acme/api
        echo "📍 Your app: apps/api/"
        echo "🧪 Your tests: apps/api/tests/"
        echo "🎯 Focus: Database models, API endpoints, authentication"
        echo "⚠️  CRITICAL PATH: Other squads depend on your API!"
        ;;
esac

echo ""
echo "🧪 Running tests (these should FAIL initially - that's expected!)..."
case $SQUAD in
    "gateway")
        cd apps/api && pnpm test || echo "✅ Tests failing as expected (TDD approach)"
        ;;
    *)
        # For frontend squads, tests might not exist yet
        echo "⏭️  Create your failing tests first, then run 'pnpm test'"
        ;;
esac

echo ""
echo "📋 Phase 2 Tasks for Squad ${SQUAD^^}:"
case $SQUAD in
    "atlas")
        echo "  - T017: Create failing integration tests for browsing flow"
        echo "  - Focus on: Homepage, product listings, search, product details"
        ;;
    "orion") 
        echo "  - T018: Create failing integration tests for checkout process"
        echo "  - Focus on: Cart management, checkout flow, payment processing"
        ;;
    "nova")
        echo "  - T019: Create failing integration tests for account management" 
        echo "  - Focus on: User profiles, order history, address management"
        ;;
    "mercury")
        echo "  - T020: Create failing integration tests for admin operations"
        echo "  - Focus on: Product CRUD, order management, analytics"
        ;;
    "gateway")
        echo "  - T007-T011: Create failing model tests (Product, Customer, Order, Cart, Payment)"
        echo "  - T012-T016: Create failing API contract tests"
        echo "  - Focus on: Database models, API endpoints, business logic"
        ;;
esac

echo ""
echo "🎯 Next Steps:"
echo "  1. 📝 Write failing tests for your domain (TDD approach)"
echo "  2. 🏃‍♂️ Run tests to confirm they fail: pnpm test"
echo "  3. 💻 Implement features to make tests pass"
echo "  4. 🔄 Commit frequently with descriptive messages"
echo "  5. 📞 Daily standup at 9:00 AM to sync with other squads"
echo ""
echo "📚 Helpful Commands:"
echo "  pnpm test              # Run your squad's tests"
echo "  pnpm test --watch      # Run tests in watch mode" 
echo "  pnpm dev              # Start development server"
echo "  git status            # Check your changes"
echo "  git add . && git commit -m 'Add failing tests for [feature]'"
echo ""
echo "🆘 Need Help?"
echo "  - Check SQUAD_COORDINATION.md for guidelines"
echo "  - Check PHASE2_STATUS.md for progress tracking"
echo "  - Post in #ecommerce-dev Slack channel"
echo "  - Review tasks.md for detailed task descriptions"
echo ""
echo "🚀 Ready to start TDD development! Good luck, Squad ${SQUAD^^}!"