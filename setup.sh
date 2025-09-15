#!/bin/bash

# E-commerce Platform Setup Script
# Run this after Phase 1 completion to get started with development

set -e

echo "🚀 Setting up E-commerce Platform..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ PNPM is not installed. Installing..."
    corepack enable
    corepack prepare pnpm@9.0.0 --activate
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🗄️ Setting up environment..."
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your actual values:"
    echo "   - Neon database connection string"
    echo "   - Clerk authentication keys"
    echo "   - Stripe payment keys"
fi

echo "🏗️ Building shared packages..."
pnpm build --filter=@acme/ui
pnpm build --filter=@acme/auth
pnpm build --filter=@acme/api-client

echo "🗃️ Setting up database..."
if [ -n "$DATABASE_URL" ]; then
    pnpm --filter=@acme/db db:generate
    pnpm --filter=@acme/db db:push
    echo "🌱 Seeding database with sample data..."
    pnpm --filter=@acme/db db:seed
else
    echo "⚠️  Skipping database setup - DATABASE_URL not configured"
    echo "   Please configure your Neon database connection in .env.local"
fi

echo "✅ Phase 1 setup complete!"
echo ""
echo "🎯 Next steps for development teams:"
echo "   1. Configure environment variables in .env.local"
echo "   2. Each squad can start Phase 2 (Tests First):"
echo "      - Squad Atlas: Storefront tests"
echo "      - Squad Orion: Checkout tests"
echo "      - Squad Nova: Account tests"
echo "      - Squad Mercury: Admin tests"
echo "      - Squad Gateway: API tests"
echo ""
echo "🏃‍♂️ To start development:"
echo "   pnpm dev  # Start all applications in development mode"
echo ""
echo "📚 See README.md for detailed information"