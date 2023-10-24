import { type PaymentProvider } from './PaymentProvider'

export interface Payment {
  id: string
  amount: number
  date: Date
  customerInfo: CustomerInfo
  status: PaymentStatus
  provider: PaymentProvider
}

export enum PaymentStatus {
  Pending = 'pending',
  Completed = 'completed',
  Refunded = 'refunded',
  // Other states
}

export interface CustomerInfo {
  name: string
  email: string
  // Other properties
}
