import { type Payment } from '../../domain/Payment'
import { type PaymentGatewayPort } from '../../ports/paymentGatewayPort'
import { type PaymentGatewayOneConfig } from './PaymentGatewayOneConfig'

export default class PaymentGatewayOneAdapter implements PaymentGatewayPort {
  private readonly config: PaymentGatewayOneConfig
  private enable: boolean

  constructor (config: PaymentGatewayOneConfig) {
    this.config = config
    this.enable = true
  }

  async processPayment (payment: Payment): Promise<boolean> {
    try {
      // Lógica para procesar pagos en este proveedor
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
      console.error('Error al reembolsar el pago en el proveedor genérico:', error)
      return false
    }
  }

  async partialReimburse (payment: Payment): Promise<boolean> {
    try {
      // Lógica para reembolso parcial en este proveedor
      return true
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error alhacer un reembolso parcial en el proveedor genérico:', error)
      return false
    }
  }

  isAvailable (): boolean {
    return this.enable
  }

  enabled (): void {
    this.enable = true
  }

  disable (): void {
    this.enable = false
  }

  getId (): string {
    return 'PaymentGatewayOneID'
  }
}
