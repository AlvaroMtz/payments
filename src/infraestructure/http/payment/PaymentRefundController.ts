import { type Request, type Response } from 'express'
import { PaymentRefundService } from '../../../application/paymentServices/PaymentRefundService'
import { MongooseProviderRepository } from '../../repositories/providerRepository'
import selectPaymentGateway from '../utils/selectPaymentGateway'

export const refundPayment = async (req: Request, res: Response): Promise<Response> => {
  const selectedProvider = req.body.provider
  const paymentData = req.body.paymentData

  const paymentGateway = await selectPaymentGateway(selectedProvider)
  if (paymentGateway === null || paymentGateway === undefined) {
    return res.status(400).json({ message: 'Proveedor no válido' })
  }
  const providerRepository = new MongooseProviderRepository()
  const paymentRefund = new PaymentRefundService(paymentGateway, providerRepository)
  try {
    const result = await paymentRefund.refundPaymen(paymentData)
    if (!result) {
      throw new Error('La pasarela de pago no admite reembolsos')
    }
    return res.status(200).json({ message: 'Reembolso exitoso' })
  } catch (error) {
    console.error('Error al procesar el reembolso:', error)
    return res.status(500).json({ message: 'Error al procesar el reembolso' })
  }
}
