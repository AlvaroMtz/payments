import { Router, type Request, type Response } from 'express'
import { body } from 'express-validator'
import { handleValidationErrors } from '../../middlewares/handleValidationErrors '
import { processPayment } from './PaymentProcessController'
import { refundPayment } from './PaymentRefundController'
import { partialReimbursePayment } from './PaymentPartialReimburseController'

const paymentRoutes = Router()

paymentRoutes.post('/process', [
  body('provider').isString()
], handleValidationErrors, (req: Request, res: Response) => {
  processPayment(req, res).catch((error) => {
    console.error('Error in /enable-provider', error)
    res.status(500).json({ message: 'Error in the request' })
  })
})

paymentRoutes.post('/refund', [
  body('provider').isString()
], handleValidationErrors, (req: Request, res: Response) => {
  refundPayment(req, res).catch((error) => {
    console.error('Error in /disable-provider', error)
    res.status(500).json({ message: 'Error in the request' })
  })
})

paymentRoutes.post('/partial-refund', [
  body('provider').isString(),
  body('paymentData').isObject(),
  body('refundAmount').isNumeric()
], handleValidationErrors, (req: Request, res: Response) => {
  partialReimbursePayment(req, res).catch((error) => {
    console.error('Error in /create-provider', error)
    res.status(500).json({ message: 'Error in the request' })
  })
})

export default paymentRoutes
