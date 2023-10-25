import { type Request, type Response } from 'express'
import { PaymentProcessService } from '../../../application/paymentServices/PaymentProcessService'
import { MongooseProviderRepository } from '../../repositories/providerRepository'
import selectPaymentGateway from '../utils/selectPaymentGateway'

export const processPayment = async (req: Request, res: Response): Promise<Response> => {
  const selectedProvider = req.body.provider
  const paymentData = req.body.paymentData

  const paymentGateway = await selectPaymentGateway(selectedProvider)
  if (paymentGateway === null || paymentGateway === undefined) {
    return res.status(400).json({ message: 'Proveedor no válido' })
  }
  const providerRepository = new MongooseProviderRepository()
  const paymentProcess = new PaymentProcessService(paymentGateway, providerRepository)
  try {
    const result = await paymentProcess.processPayment(paymentData)
    if (!result) {
      throw new Error('La pasarela de pago no admite pagos')
    }
    return res.status(200).json({ message: 'Pago exitoso' })
  } catch (error) {
    console.error('Error al procesar el pago:', error)
    return res.status(500).json({ message: 'Error al procesar el pago' })
  }
}
