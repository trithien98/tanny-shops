import { describe, it, expect } from 'vitest'
import { Product } from '../src/models/Product'

describe('Product Model', () => {
  it('should create a product with valid data', async () => {
    const productData = {
      slug: 'test-product',
      title: 'Test Product',
      description: 'A test product',
      priceCents: 1999,
      currency: 'USD'
    }

    const product = await Product.create(productData)
    
    expect(product).toBeDefined()
    expect(product.id).toBeDefined()
    expect(product.slug).toBe('test-product')
    expect(product.title).toBe('Test Product')
    expect(product.priceCents).toBe(1999)
    expect(product.createdAt).toBeDefined()
  })

  it('should validate required fields', async () => {
    const invalidData = {
      title: 'Test Product'
      // missing slug and priceCents
    }

    await expect(Product.create(invalidData as any)).rejects.toThrow()
  })

  it('should enforce unique slug constraint', async () => {
    const productData = {
      slug: 'duplicate-slug',
      title: 'Product 1',
      priceCents: 1999
    }

    await Product.create(productData)
    
    // Should fail on duplicate slug
    await expect(Product.create({
      ...productData,
      title: 'Product 2'
    })).rejects.toThrow()
  })

  it('should find product by slug', async () => {
    const productData = {
      slug: 'findable-product',
      title: 'Findable Product',
      priceCents: 2999
    }

    const created = await Product.create(productData)
    const found = await Product.findBySlug('findable-product')
    
    expect(found).toBeDefined()
    expect(found?.id).toBe(created.id)
  })

  it('should return null for non-existent slug', async () => {
    const found = await Product.findBySlug('non-existent-slug')
    expect(found).toBeNull()
  })
})