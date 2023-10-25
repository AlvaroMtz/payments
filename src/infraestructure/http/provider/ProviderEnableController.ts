import { type Request, type Response } from 'express'
import { MongooseProviderRepository } from '../../repositories/providerRepository'
import { ProviderEnableService } from '../../../application/providerServices/ProviderEnableService'

export const enableProvider = async (req: Request, res: Response): Promise<void> => {
  const providerId = req.body.providerId
  const providerRepository = new MongooseProviderRepository()
  const service = new ProviderEnableService(providerRepository)

  try {
    const result = await service.enableProvider(providerId)

    if (result) {
      res.status(200).json({ message: 'Proveedor habilitado con éxito' })
    } else {
      res.status(500).json({ message: 'Error al habilitar el proveedor' })
    }
  } catch (error) {
    console.error('Error en la ruta /enable-provider', error)
    res.status(500).json({ message: 'Error en la solicitud' })
  }
}
