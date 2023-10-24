import { type Payment, PaymentStatus, type CustomerInfo } from '../Payment'

describe('Payment', () => {
  const customer: CustomerInfo = {
    name: 'John Doe',
    email: 'john@example.com'
  }

  const payment: Payment = {
    id: '12345',
    amount: 100.0,
    date: new Date('2023-10-23'),
    customerInfo: customer,
    status: PaymentStatus.Completed,
    provider: {
      name: 'Stripe',
      isActive: true
    }
  }

  it('should have the correct customer name', () => {
    expect(payment.customerInfo.name).toBe('John Doe')
  })

  it('should have the correct payment status', () => {
    expect(payment.status).toBe(PaymentStatus.Completed)
  })

  it('should have the correct provider name', () => {
    expect(payment.provider.name).toBe('Stripe')
  })

  it('should be active with the isActive property set to true', () => {
    expect(payment.provider.isActive).toBe(true)
  })
})
