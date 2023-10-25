import { type Request, type Response } from 'express'
import { MongooseProviderRepository } from '../../repositories/providerRepository'
import { ProviderCreationService } from '../../../application/providerServices/ProviderCreationService'

export const createProvider = async (req: Request, res: Response): Promise<void> => {
  const { name, id, enabled } = req.body
  const providerRepository = new MongooseProviderRepository()
  const service = new ProviderCreationService(providerRepository)

  try {
    const newProvider = await service.createProvider(name, id, enabled)

    if (newProvider != null) {
      res.status(201).json(newProvider)
    } else {
      res.status(500).json({ message: 'Error al crear el proveedor' })
    }
  } catch (error) {
    console.error('Error en la ruta /create-provider', error)
    res.status(500).json({ message: 'Error en la solicitud' })
  }
}
