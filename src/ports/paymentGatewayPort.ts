import { type Payment } from '../domain/Payment'

export interface PaymentGatewayPort {
  enabled: () => void
  disable: () => void
  getId: () => string
  processPayment: (payment: Payment) => Promise<boolean>
  refundPayment: (payment: Payment) => Promise<boolean>
  partialReimburse?: (payment: Payment) => Promise<boolean>
  isAvailable: () => boolean
}
