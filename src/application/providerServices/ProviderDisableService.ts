import { type MongooseProviderRepository } from '../../infraestructure/repositories/providerRepository'

export class ProviderDisableService {
  private readonly providerRepository: MongooseProviderRepository

  constructor (providerRepository: MongooseProviderRepository) {
    this.providerRepository = providerRepository
  }

  async disableProvider (providerId: string): Promise<boolean> {
    try {
      const provider = await this.providerRepository.find(providerId)

      if (provider == null) {
        return false
      }

      if (!provider.enable) {
        return true
      }

      provider.enable = false
      await this.providerRepository.update(provider)

      return true
    } catch (error) {
      console.error('Error al deshabilitar el proveedor', error)
      return false
    }
  }
}
