import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Products API Contract', () => {
  describe('GET /api/products', () => {
    it('should return array of products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200)

      expect(response.body).toBeDefined()
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBeGreaterThanOrEqual(0)
      
      if (response.body.data.length > 0) {
        const product = response.body.data[0]
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('slug')
        expect(product).toHaveProperty('title')
        expect(product).toHaveProperty('priceCents')
        expect(product).toHaveProperty('currency')
        expect(product).toHaveProperty('inStock')
      }
    })

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/products?page=1&limit=10')
        .expect(200)

      expect(response.body.pagination).toBeDefined()
      expect(response.body.pagination.page).toBe(1)
      expect(response.body.pagination.limit).toBe(10)
      expect(typeof response.body.pagination.total).toBe('number')
    })

    it('should filter by category', async () => {
      const response = await request(app)
        .get('/api/products?categoryId=electronics')
        .expect(200)

      expect(response.body.data).toBeDefined()
      // Products should belong to electronics category
    })
  })

  describe('GET /api/products/:slug', () => {
    it('should return product by slug', async () => {
      const response = await request(app)
        .get('/api/products/test-product')
        .expect(200)

      expect(response.body.data).toBeDefined()
      expect(response.body.data.slug).toBe('test-product')
      expect(response.body.data).toHaveProperty('id')
      expect(response.body.data).toHaveProperty('title')
      expect(response.body.data).toHaveProperty('description')
      expect(response.body.data).toHaveProperty('priceCents')
      expect(response.body.data).toHaveProperty('category')
    })

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/non-existent-slug')
        .expect(404)

      expect(response.body.error).toBeDefined()
      expect(response.body.error.message).toContain('Product not found')
    })

    it('should include related products', async () => {
      const response = await request(app)
        .get('/api/products/test-product?include=related')
        .expect(200)

      expect(response.body.data.related).toBeDefined()
      expect(Array.isArray(response.body.data.related)).toBe(true)
    })
  })

  describe('POST /api/products', () => {
    it('should create new product (admin only)', async () => {
      const productData = {
        slug: 'new-test-product',
        title: 'New Test Product',
        description: 'A new test product',
        priceCents: 2999,
        currency: 'USD',
        categoryId: 'electronics'
      }

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', 'Bearer admin_token')
        .send(productData)
        .expect(201)

      expect(response.body.data).toBeDefined()
      expect(response.body.data.slug).toBe('new-test-product')
      expect(response.body.data.id).toBeDefined()
    })

    it('should require authentication for product creation', async () => {
      const productData = {
        slug: 'unauthorized-product',
        title: 'Unauthorized Product',
        priceCents: 1999
      }

      await request(app)
        .post('/api/products')
        .send(productData)
        .expect(401)
    })

    it('should validate required fields', async () => {
      const invalidData = {
        title: 'Missing slug and price'
      }

      await request(app)
        .post('/api/products')
        .set('Authorization', 'Bearer admin_token')
        .send(invalidData)
        .expect(400)
    })
  })
})