import { User } from '../types'

export class DeliveryInfo {
  email?: string
  phoneNumber?: string
  country?: string
  city?: string
  address?: string
  recipientName?: string
  postalCode?: string
  clientNote?: string
  shippingFees?: number
  hasAgreedToTermsAndCondition?: boolean

  fromUser(user: User | undefined): void {
    if (user) {
      this.email = user.email
      this.phoneNumber = user.phoneNumber
      this.country = user.country
      this.city = user.city
      this.address = user.address
      this.recipientName = `${user.firstName} ${user.lastName}`
      this.postalCode = user.postalCode
      this.hasAgreedToTermsAndCondition = false
    }
  }
}
