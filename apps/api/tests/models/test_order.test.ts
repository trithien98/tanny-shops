import { describe, it, expect } from 'vitest'
import { Order } from '../src/models/Order'

describe('Order Model', () => {
  it('should create an order with valid data', async () => {
    const orderData = {
      customerId: 'customer_123',
      status: 'PENDING',
      totalCents: 2999,
      currency: 'USD',
      items: [
        {
          productId: 'product_456',
          quantity: 2,
          priceCents: 1499
        }
      ]
    }

    const order = await Order.create(orderData)
    
    expect(order).toBeDefined()
    expect(order.id).toBeDefined()
    expect(order.customerId).toBe('customer_123')
    expect(order.status).toBe('PENDING')
    expect(order.totalCents).toBe(2999)
    expect(order.items).toHaveLength(1)
  })

  it('should validate order status values', async () => {
    const invalidData = {
      customerId: 'customer_123',
      status: 'INVALID_STATUS',
      totalCents: 1999
    }

    await expect(Order.create(invalidData as any)).rejects.toThrow()
  })

  it('should calculate total from items', async () => {
    const orderData = {
      customerId: 'customer_123',
      items: [
        { productId: 'product_1', quantity: 2, priceCents: 1000 },
        { productId: 'product_2', quantity: 1, priceCents: 500 }
      ]
    }

    const order = await Order.create(orderData)
    const calculatedTotal = order.calculateTotal()
    
    expect(calculatedTotal).toBe(2500) // (2 * 1000) + (1 * 500)
  })

  it('should update order status', async () => {
    const orderData = {
      customerId: 'customer_123',
      status: 'PENDING',
      totalCents: 1999
    }

    const order = await Order.create(orderData)
    await order.updateStatus('CONFIRMED')
    
    expect(order.status).toBe('CONFIRMED')
    expect(order.updatedAt).toBeDefined()
  })

  it('should find orders by customer', async () => {
    const customerId = 'customer_find_test'
    
    await Order.create({
      customerId,
      status: 'PENDING',
      totalCents: 1999
    })
    
    await Order.create({
      customerId,
      status: 'CONFIRMED',
      totalCents: 2999
    })

    const orders = await Order.findByCustomer(customerId)
    expect(orders).toHaveLength(2)
    expect(orders.every(order => order.customerId === customerId)).toBe(true)
  })
})