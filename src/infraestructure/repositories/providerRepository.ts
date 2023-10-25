import { type Model, type Document, Schema, connection } from 'mongoose'
import { type PaymentProvider } from '../../domain/PaymentProvider'

const providerSchema = new Schema<PaymentProvider & Document>({
  id: String,
  name: String,
  enable: Boolean
})

const ProviderModel: Model<PaymentProvider & Document> = connection.model('Provider', providerSchema)

export class MongooseProviderRepository {
  async findById (id: string): Promise<PaymentProvider | null> {
    try {
      const provider = await ProviderModel.findById(id).exec()
      return provider
    } catch (error) {
      console.error('Error al buscar el proveedor por ID', error)
      return null
    }
  }

  async find (id: string): Promise<PaymentProvider | null> {
    try {
      const provider = await ProviderModel.findOne({ id }).exec()
      return provider !== null ? provider : null
    } catch (error) {
      console.error('Error al buscar el proveedor por ID', error)
      return null
    }
  }

  async create (provider: PaymentProvider): Promise<PaymentProvider> {
    try {
      const newProvider = new ProviderModel(provider)
      await newProvider.save()
      return newProvider.toObject()
    } catch (error) {
      console.error('Error al crear un nuevo proveedor', error)
      throw error
    }
  }

  async update (provider: PaymentProvider): Promise<PaymentProvider | null> {
    try {
      const updatedProvider = await ProviderModel.findOneAndUpdate(
        { id: provider.id },
        provider,
        { new: true }
      ).exec()
      return updatedProvider
    } catch (error) {
      console.error('Error al actualizar el proveedor', error)
      return null
    }
  }

  async delete (id: string): Promise<boolean> {
    try {
      await ProviderModel.deleteOne({ _id: id }).exec()
      return true
    } catch (error) {
      console.error('Error al eliminar el proveedor por ID', error)
      return false
    }
  }

  async isProviderActive (providerId: string): Promise<boolean> {
    const provider = await ProviderModel.findOne({ id: providerId }).exec()
    if (provider != null) {
      return provider.enable === true
    } else {
      return false
    }
  }
}
