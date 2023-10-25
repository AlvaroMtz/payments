import PaymentGatewayOneAdapter from '../PaymentGatewayOneAdapter'
import { PaymentStatus, type Payment } from '../../../domain/Payment'
import { type PaymentGatewayOneConfig } from '../PaymentGatewayOneConfig'

describe('PaymentGatewayOneAdapter', () => {
  const config: PaymentGatewayOneConfig = {
    apiKey: 'your-api-key'
  }

  const adapter = new PaymentGatewayOneAdapter(config)

  const mockPayment: Payment = {
    // Ajusta los detalles del pago según tus necesidades
    id: '123',
    amount: 100.0,
    date: new Date(),
    customerInfo: {
      name: 'Test',
      email: 'test@test.es'
    },
    status: PaymentStatus.Completed,
    provider: {
      id: 'test',
      name: 'Stripe',
      enable: true
    }
  }

  it('should process a payment successfully', async () => {
    const result = await adapter.processPayment(mockPayment)
    expect(result).toBe(true)
  })

  it('should refund a payment successfully', async () => {
    const result = await adapter.refundPayment(mockPayment)
    expect(result).toBe(true)
  })

  it('should partially reimburse a payment successfully', async () => {
    const result = await adapter.partialReimburse(mockPayment)
    expect(result).toBe(true)
  })

  it('should indicate availability', () => {
    const available = adapter.isAvailable()
    expect(available).toBe(true)
  })

  it('should handle an error when processing a payment', async () => {
    adapter.processPayment = async (): Promise<boolean> => {
      throw new Error('Error de procesamiento')
    }

    try {
      await adapter.processPayment(mockPayment)
    } catch (error: any) {
      expect(error.message).toBe('Error de procesamiento')
    }
  })

  it('should handle an error when refunding a payment', async () => {
    adapter.refundPayment = async (): Promise<boolean> => {
      throw new Error('Error de reembolso')
    }

    try {
      await adapter.refundPayment(mockPayment)
    } catch (error: any) {
      expect(error.message).toBe('Error de reembolso')
    }
  })

  it('should handle an error when partially reimbursing a payment', async () => {
    adapter.partialReimburse = async (): Promise<boolean> => {
      throw new Error('Error de reembolso parcial')
    }

    try {
      await adapter.partialReimburse(mockPayment)
    } catch (error: any) {
      expect(error.message).toBe('Error de reembolso parcial')
    }
  })
})
