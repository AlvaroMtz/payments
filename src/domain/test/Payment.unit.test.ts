import { type Payment, PaymentStatus, type CustomerInfo } from '../Payment'

describe('Payment', () => {
  const customer: CustomerInfo = {
    name: 'Test',
    email: 'test@test.com'
  }

  const payment: Payment = {
    id: '12345',
    amount: 100.0,
    date: new Date('2023-10-23'),
    customerInfo: customer,
    status: PaymentStatus.Completed,
    provider: {
      id: 'test',
      name: 'PaymentGatewayOne',
      enable: true
    }
  }

  it('should have the correct customer name', () => {
    expect(payment.customerInfo.name).toBe('Test')
  })

  it('should have the correct payment status', () => {
    expect(payment.status).toBe(PaymentStatus.Completed)
  })

  it('should have the correct provider name', () => {
    expect(payment.provider.name).toBe('PaymentGatewayOne')
  })

  it('should be active with the isActive property set to true', () => {
    expect(payment.provider.enable).toBe(true)
  })
})
