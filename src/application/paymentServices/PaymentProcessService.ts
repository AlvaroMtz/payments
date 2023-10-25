import { type Payment } from '../../domain/Payment'
import { type PaymentGatewayPort } from '../../ports/paymentGatewayPort'
import { type MongooseProviderRepository } from '../../infraestructure/repositories/providerRepository'

export class PaymentProcessService {
  private readonly paymentGateway: PaymentGatewayPort
  private readonly providerRepository: MongooseProviderRepository

  constructor (paymentGateway: PaymentGatewayPort, providerRepository: MongooseProviderRepository) {
    this.paymentGateway = paymentGateway
    this.providerRepository = providerRepository
  }

  async processPayment (payment: Payment): Promise<boolean> {
    try {
      const provider = await this.providerRepository.find(payment.provider.id)
      if (provider !== null && await this.providerRepository.isProviderActive(payment.provider.id)) {
        const paymentResult = await this.paymentGateway.processPayment(payment)
        return paymentResult
      } else {
        console.warn('El proveedor no está habilitado')
        return false
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error)
      return false
    }
  }
}
