import { type PaymentProvider } from '../PaymentProvider'

describe('PaymentProvider', () => {
  it('should have the correct name', () => {
    const provider: PaymentProvider = {
      name: 'Stripe',
      isActive: true
    }
    expect(provider.name).toBe('Stripe')
  })

  it('should be active with isActive set to true', () => {
    const provider: PaymentProvider = {
      name: 'PayPal',
      isActive: true
    }
    expect(provider.isActive).toBe(true)
  })

  it('should be inactive with isActive set to false', () => {
    const provider: PaymentProvider = {
      name: 'MercadoPago',
      isActive: false
    }
    expect(provider.isActive).toBe(false)
  })
})
