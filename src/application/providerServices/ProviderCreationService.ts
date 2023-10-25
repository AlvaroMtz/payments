import { type PaymentProvider } from '../../domain/PaymentProvider'
import { type MongooseProviderRepository } from '../../infraestructure/repositories/providerRepository'

export class ProviderCreationService {
  private readonly providerRepository: MongooseProviderRepository

  constructor (providerRepository: MongooseProviderRepository) {
    this.providerRepository = providerRepository
  }

  async createProvider (name: string, id: string, enable: boolean): Promise<PaymentProvider | null> {
    try {
      const newProvider: PaymentProvider = {
        id,
        name,
        enable
      }

      const createdProvider = await this.providerRepository.create(newProvider)

      return createdProvider
    } catch (error) {
      console.error('Error al crear el proveedor', error)
      return null
    }
  }
}
