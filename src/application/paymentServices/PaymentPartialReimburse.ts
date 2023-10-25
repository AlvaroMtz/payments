import { type Payment } from '../../domain/Payment'
import { type PaymentGatewayPort } from '../../ports/paymentGatewayPort'
import { type MongooseProviderRepository } from '../../infraestructure/repositories/providerRepository'

export class PaymentPartialReimburse {
  private readonly paymentGateway: PaymentGatewayPort
  private readonly providerRepository: MongooseProviderRepository

  constructor (paymentGateway: PaymentGatewayPort, providerRepository: MongooseProviderRepository) {
    this.paymentGateway = paymentGateway
    this.providerRepository = providerRepository
  }

  async partialReimburse (payment: Payment, refundAmount: number): Promise<boolean> {
    try {
      const provider = await this.providerRepository.find(payment.provider.id)
      if (provider !== null && await this.providerRepository.isProviderActive(payment.provider.id)) {
        if (this.paymentGateway.partialReimburse != null) {
          const partialReimburseResult = await this.paymentGateway.partialReimburse(payment)
          return partialReimburseResult
        } else {
          console.warn('La pasarela de pago no admite reembolsos parciales.')
          return false
        }
      } else {
        console.warn('El proveedor no está habilitado')
        return false
      }
    } catch (error) {
      console.error('Error al realizar un reembolso parcial:')
      return false
    }
  }
}
