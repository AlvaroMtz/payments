import { type PaymentProvider } from '../PaymentProvider'

describe('PaymentProvider', () => {
  it('should have the correct name', () => {
    const provider: PaymentProvider = {
      id: 'test',
      name: 'Stripe',
      enable: true
    }
    expect(provider.name).toBe('Stripe')
  })

  it('should be active with isActive set to true', () => {
    const provider: PaymentProvider = {
      id: 'test',
      name: 'PayPal',
      enable: true
    }
    expect(provider.enable).toBe(true)
  })

  it('should be inactive with isActive set to false', () => {
    const provider: PaymentProvider = {
      id: 'test',
      name: 'MercadoPago',
      enable: false
    }
    expect(provider.enable).toBe(false)
  })
})
