import { type MongooseProviderRepository } from '../../infraestructure/repositories/providerRepository'

export class ProviderEnableService {
  private readonly providerRepository: MongooseProviderRepository

  constructor (providerRepository: MongooseProviderRepository) {
    this.providerRepository = providerRepository
  }

  async enableProvider (providerId: string): Promise<boolean> {
    try {
      const provider = await this.providerRepository.find(providerId)

      if (provider == null) {
        return false
      }

      if (provider.enable) {
        return true
      }

      provider.enable = true
      await this.providerRepository.update(provider)

      return true
    } catch (error) {
      console.error('Error al habilitar el proveedor', error)
      return false
    }
  }
}
