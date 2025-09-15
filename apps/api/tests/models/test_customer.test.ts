import { describe, it, expect } from 'vitest'
import { Customer } from '../src/models/Customer'

describe('Customer Model', () => {
  it('should create a customer with valid data', async () => {
    const customerData = {
      clerkUserId: 'user_test123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['customer']
    }

    const customer = await Customer.create(customerData)
    
    expect(customer).toBeDefined()
    expect(customer.id).toBeDefined()
    expect(customer.clerkUserId).toBe('user_test123')
    expect(customer.email).toBe('test@example.com')
    expect(customer.roles).toContain('customer')
    expect(customer.createdAt).toBeDefined()
  })

  it('should enforce unique email constraint', async () => {
    const customerData = {
      clerkUserId: 'user_test456',
      email: 'duplicate@example.com',
      roles: ['customer']
    }

    await Customer.create(customerData)
    
    // Should fail on duplicate email
    await expect(Customer.create({
      ...customerData,
      clerkUserId: 'user_test789'
    })).rejects.toThrow()
  })

  it('should find customer by clerk user ID', async () => {
    const customerData = {
      clerkUserId: 'user_findme',
      email: 'findme@example.com',
      roles: ['customer']
    }

    const created = await Customer.create(customerData)
    const found = await Customer.findByClerkId('user_findme')
    
    expect(found).toBeDefined()
    expect(found?.id).toBe(created.id)
  })

  it('should validate role values', async () => {
    const invalidData = {
      clerkUserId: 'user_invalid',
      email: 'invalid@example.com',
      roles: ['invalid-role']
    }

    await expect(Customer.create(invalidData as any)).rejects.toThrow()
  })

  it('should default to customer role if none provided', async () => {
    const customerData = {
      clerkUserId: 'user_default',
      email: 'default@example.com'
    }

    const customer = await Customer.create(customerData)
    expect(customer.roles).toEqual(['customer'])
  })
})