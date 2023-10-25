import { type Request, type Response } from 'express'
import { MongooseProviderRepository } from '../../repositories/providerRepository'
import { ProviderDisableService } from '../../../application/providerServices/ProviderDisableService'

export const disableProvider = async (req: Request, res: Response): Promise<void> => {
  const providerId = req.body.providerId
  const providerRepository = new MongooseProviderRepository()
  const service = new ProviderDisableService(providerRepository)

  try {
    const result = await service.disableProvider(providerId)

    if (result) {
      res.status(200).json({ message: 'Proveedor deshabilitado con éxito' })
    } else {
      res.status(500).json({ message: 'Error al deshabilitar el proveedor' })
    }
  } catch (error) {
    console.error('Error en la ruta /disable-provider', error)
    res.status(500).json({ message: 'Error en la solicitud' })
  }
}
