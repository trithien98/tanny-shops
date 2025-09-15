import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        slug: 'electronics',
        name: 'Electronics',
        description: 'Latest electronic devices and gadgets'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        slug: 'clothing',
        name: 'Clothing',
        description: 'Fashion and apparel for all occasions'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'books' },
      update: {},
      create: {
        slug: 'books',
        name: 'Books',
        description: 'Books across all genres and topics'
      }
    })
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Create products
  const products = []
  for (let i = 0; i < 50; i++) {
    const category = faker.helpers.arrayElement(categories)
    const product = await prisma.product.create({
      data: {
        slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        priceCents: Math.floor(faker.number.float({ min: 9.99, max: 999.99 }) * 100),
        currency: 'USD',
        categoryId: category.id,
        imageUrl: faker.image.url({ width: 400, height: 400 }),
        inStock: faker.datatype.boolean({ probability: 0.9 })
      }
    })
    products.push(product)
  }

  console.log(`✅ Created ${products.length} products`)

  // Create sample customer
  const customer = await prisma.customer.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      clerkUserId: 'demo_user_id',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      roles: ['customer']
    }
  })

  // Create sample address
  await prisma.address.upsert({
    where: { id: 'demo_address' },
    update: {},
    create: {
      id: 'demo_address',
      customerId: customer.id,
      type: 'shipping',
      firstName: 'Demo',
      lastName: 'User',
      line1: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'US',
      isDefault: true
    }
  })

  // Create sample cart
  const cart = await prisma.cart.upsert({
    where: { customerId: customer.id },
    update: {},
    create: {
      customerId: customer.id
    }
  })

  // Add items to cart
  const sampleProducts = faker.helpers.arrayElements(products, 3)
  for (const product of sampleProducts) {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: product.id
        }
      },
      update: {},
      create: {
        cartId: cart.id,
        productId: product.id,
        quantity: faker.number.int({ min: 1, max: 3 })
      }
    })
  }

  console.log('✅ Created demo customer with cart items')
  console.log('🎉 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })