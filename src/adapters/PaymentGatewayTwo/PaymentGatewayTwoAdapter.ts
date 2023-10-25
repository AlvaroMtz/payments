import { type Payment } from '../../domain/Payment'
import { type PaymentGatewayPort } from '../../ports/paymentGatewayPort'
import { type PaymentGatewayTwoConfig } from './PaymentGatewayTwoConfig'

export default class PaymentGatewayTwoAdapter implements PaymentGatewayPort {
  private readonly config: PaymentGatewayTwoConfig
  private enable: boolean

  constructor (config: PaymentGatewayTwoConfig) {
    this.config = config
    this.enable = true
  }

  async processPayment (payment: Payment): Promise<boolean> {
    try {
      // Lógica para procesar pagos en este proveedor
      console.log('pago 2')
      return true
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error al procesar el pago con PaymentGatewayOne', error)
      return false
    }
  }

  async refundPayment (payment: Payment): Promise<boolean> {
    try {
      // Lógica para reembolsar pagos en este proveedor
      return true
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error al reembolsar el pago con PaymentGatewayOne', error)
      return false
    }
  }

  isAvailable (): boolean {
    // Verifica la disponibilidad del proveedor genérico.
    return true
  }

  enabled (): void {
    this.enable = true
  }

  disable (): void {
    this.enable = false
  }

  getId (): string {
    return 'PaymentGatewayTwoID'
  }
}
