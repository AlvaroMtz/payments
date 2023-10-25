import { Router, type Request, type Response } from 'express'
import { body } from 'express-validator'
import { enableProvider } from './ProviderEnableController'
import { disableProvider } from './ProviderDisableController'
import { createProvider } from './ProviderCreateController'
import { handleValidationErrors } from '../../middlewares/handleValidationErrors '

const providerRoutes = Router()

providerRoutes.post('/enable', [
  body('providerId').isString()
], handleValidationErrors, (req: Request, res: Response) => {
  enableProvider(req, res).catch((error) => {
    console.error('Error in /enable-provider', error)
    res.status(500).json({ message: 'Error in the request' })
  })
})

providerRoutes.post('/disable', [
  body('providerId').isString()
], handleValidationErrors, (req: Request, res: Response) => {
  disableProvider(req, res).catch((error) => {
    console.error('Error in /disable-provider', error)
    res.status(500).json({ message: 'Error in the request' })
  })
})

providerRoutes.post('/create', [
  body('name').isString(),
  body('id').isString(),
  body('enabled').isBoolean()
], handleValidationErrors, (req: Request, res: Response) => {
  createProvider(req, res).catch((error) => {
    console.error('Error in /create-provider', error)
    res.status(500).json({ message: 'Error in the request' })
  })
})

export default providerRoutes
