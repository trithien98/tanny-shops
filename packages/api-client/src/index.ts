import ky from 'ky'
import { z } from 'zod'

// Base API client configuration
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace']
  }
})

// Zod schemas for API responses
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priceCents: z.number(),
  currency: z.string().default('USD'),
  categoryId: z.string().optional(),
  imageUrl: z.string().optional(),
  inStock: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const CustomerSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  roles: z.array(z.enum(['customer', 'support', 'merchandiser', 'admin'])),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const OrderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  totalCents: z.number(),
  currency: z.string().default('USD'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number(),
    priceCents: z.number()
  })),
  createdAt: z.string(),
  updatedAt: z.string()
})

// Type exports
export type Product = z.infer<typeof ProductSchema>
export type Customer = z.infer<typeof CustomerSchema>
export type Order = z.infer<typeof OrderSchema>

// API client methods
export const apiClient = {
  // Products
  getProducts: () => api.get('products').json<Product[]>(),
  getProduct: (slug: string) => api.get(`products/${slug}`).json<Product>(),
  
  // Customers
  getCustomer: (id: string) => api.get(`customers/${id}`).json<Customer>(),
  
  // Orders
  getOrders: (customerId?: string) => 
    api.get('orders', { searchParams: customerId ? { customerId } : {} }).json<Order[]>(),
  getOrder: (id: string) => api.get(`orders/${id}`).json<Order>(),
  createOrder: (data: Partial<Order>) => api.post('orders', { json: data }).json<Order>()
}