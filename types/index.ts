import { PaymentMedium } from '../lib/enums/payment-medium.enum'
import { OrderStatus } from '../lib/enums/order-status.enum'
import ProductColor from '../lib/enums/product-color.enum'
import Currency from '../lib/enums/currency.enum'
import { DiscountType } from '../lib/enums/discount-type.enum'
import { DeliveryInfo } from '../classes'

export type EmptyProp = { props?: never }

export type LoginDTO = {
  email: string
  password: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  gender: string
  dob: string
  email: string
  phoneNumber: string
  createdOn: string
  country?: string
  city?: string
  postalCode?: string
  address?: string
  profilePictureImgUrl?: string
}

export type Fabric = {
  id: number
  name: string
  type: string
  imgUrl: string
  stock: boolean
  visible: boolean
  lastUpdatedOn: string
  createdOn: string
}

export interface PaginationQeury {
  limit?: number
  page?: number
}

export interface SeachQuery extends PaginationQeury {
  queryStr: string
}

export interface ProductOption {
  id: number
  imgUrls: string[]
  dominantColors: ProductColor[]
  shoeSizes: string[]
  isInStock: boolean
  isVisible: boolean
}

export type Product = {
  id: number
  name: string
  productSection?: string
  amount: number
  description: string
  isDeleted?: string
  slug: string
  productOptions?: ProductOption[]
  productTypes?: ProductType[]
  averageRating: number
  totalReviews: number
  discountAmount: number
  discountType: DiscountType
  discountActivationDate: string
  discountExpirationDate: string
  isInStock: boolean
  isVisible: boolean
}

export type ProductClassification = 'BAG' | 'SHOE' | 'GIFT_CARD' | 'SHIRT'

export type ProductWithFullDetails = {
  id: number
  name: string
  classifiedRating: Record<number, { totalReviews: number; averageRating: number }>
  description: string
  discountActivationDate: string
  discountExpirationDate: string
  discountAmount: number
  discountType: DiscountType
  productSection?: string
  amount: number
  isDeleted: string
  slug: string
  productOptions?: ProductOption[]
  productType: ProductType
  averageRating: number
  totalReviews: number
  classification: ProductClassification
}

export interface ProductVariantSearchRes extends ProductOption {
  fabric: Fabric
  productParent: Product
  averageRating: number
  totalReviews: number
}

export type ProductType = {
  id: number
  name: string
  isInStock: boolean
  noVisibleProducts: number
}

export type Category = {
  id: number
  name: string
  noVisibleProducts: number
  productTypes: ProductType[]
}

export enum Color {
  RED = '#FF0000',
  BLUE = '#0000ff',
  YELLOW = '#ffff00',
  PURPLE = '#800080',
  BLACK = '#000000',
  WHITE = '#ffffff',
  GREEN = '#008000',
  ORANGE = '#ffa500',
  PINK = '#ffc0cb',
  GREY = '#808080',
  KAKI = '#f0e68c',
  BROWN = '#8b4513',
  RUST = '#ff4000',
  TAN = ' #bf8040',
  BRONZE = '#b36b00',
  AQUAMARINE = '#0080ff',
}

export type CartItem = {
  productOption?: ProductOption
  product?: ProductWithFullDetails
  productOptionId?: number
  orderedQuantity: number
  orderedShoeSize?: number | string | undefined
  giftRecipientEmail?: string
  giftRecipientPhoneNumber?: string
  giftEmailBody?: string
  giftBenefactorName?: string
}

export type PromoCode = {
  id: number
  uuid: number
  name: string
  code: string
  amount: number
  maxTotalUsageLimit: number
  maxPerCustomerUsageLimit: number
  activationDate: string
  expirationDate: string
  isActive: boolean
}

export type WishlistItem = {
  id: number
  isNotified: boolean
  productVariation: {
    createdOn: string
    lastUpdatedOn: string
    id: number
    imgUrls: string[]
    shoeSizes: number[]
    dominantColors: ProductColor[]
    isInStock: boolean
    isVisible: boolean
    productParent: {
      createdOn: string
      lastUpdatedOn: string
      id: number
      name: string
      productSection: string
      amount: number
      slug: string
      description: string
      discountAmount: number | undefined
      discountType: DiscountType | undefined
      discountActivationDate: Date | undefined
      discountExpirationDate: Date | undefined
      isFeatured: false
    }
  }
}

export type ReviewRatingItem = {
  id: number
  rating: string
  title: string
  description: string
  isVisible: boolean
  createdOn: string
  productVariation: {
    createdOn: Date
    lastUpdatedOn: Date
    id: number
    imgUrls: string[]
    shoeSizes: number[]
    dominantColors: ProductColor[]
    isInStock: boolean
    isVisible: boolean
  }
  client: {
    createdOn: Date
    lastUpdatedOn: Date
    id: number
    firstName: string
    lastName: string
    gender: string
    dob?: Date
    email: string
    phoneNumber?: string
    profilePictureImgUrl?: string
    country?: string
    city?: string
    address?: string
    postalCode?: string
    uuid?: string
  }
  product: {
    id: number
    name: string
    productSection: string
    amount: number
    slug: string
    description: string
    classification: string
    discountAmount: number | null
    discountType: string | null
    discountActivationDate: string | null
    discountExpirationDate: string | null
    isFeatured: boolean
  }
}

export enum ProductSortMethods {
  RATING = 'Rating (High To Low)',
  PRICE = 'Price (High to Low) ',
  NAME = 'Name (A-Z)',
}

export type Order = {
  id: number
  orderId: string
  deliveryPostalCode: string
  paymentMedium: PaymentMedium
  status: OrderStatus
  totalPaymentAmount: string
  shippingFees: string
  clientFirstName: string
  clientLastName: string
  clientEmail: string
  clientPhoneNumber: string
  totalPromoAmount: number
  staffComment: string
  clientNote: string
  lastUpdatedOn: string
  orderDetails: {
    name: string
    imgUrls: string[]
    orderedQuantity: number
    orderedUnitPrice: number
    orderedShoeSize: number | string
    dominantColors: ProductColor[]
  }[]
}

export type Banner = {
  id: number
  imgUrl: string
  title: string
  description: string
  priorityLevel: number
  callToActionText: string
  callToActionUrlQuery: string
}

export type ReviewDto = {
  rating: number
  title: string
  description: string
}

export type UserProfileDto = {
  firstName: string
  lastName: string
  gender?: string
  dob?: string
  email: string
  phoneNumber: string
  country: string
  city: string
  address: string
  postalCode: string
}

export type CreateOrderDto = {
  clientPhoneNo: string
  clientEmail: string
  deliveryCountry: string
  deliveryCity: string
  deliveryAddress: string
  deliveryPostalCode: string
  receiverName: string
  clientNote?: string
  shippingFees?: number | string
  orderDetailsDto: CreateOrderDetailsDto[]
  promoCodesUsed: string[]
  currency: Currency
}

export type CreateOrderDetailsDto = {
  productVariationId?: number
  orderedShoeSize?: number | string
  orderedQuantity: number
  giftRecipientEmail?: string
  giftBenefactorPhoneNumber?: string
  giftEmailBody?: string
  giftBenefactorName?: string
}

export type VerifyPaymentDto = {
  transactionToken: string
  transactionId: string
  ccdApproval: string
}

export type MeasurementUnit = 'CM' | 'IN'

export type IPGeoLocationResponse = {
  data: {
    currency: {
      code: string
    }
    time_zone: {
      name: string
    }
  }
  status: number
}

export type CheckoutDeliveryInformationAreaProps = {
  isLoading: boolean
  isAbove: boolean
  profileInfo?: DeliveryInfo
  onCalculateShippingFees: (country: string, city?: string) => void
  isCalculatingFees: boolean
  toggleShippingFeesVisibility: React.Dispatch<React.SetStateAction<boolean>>
  resetShippingFees: () => void
  showShippingFees: React.Dispatch<React.SetStateAction<string>>
  shippingFees: string | undefined
  onSubmit: (
    formValues:
      | DeliveryInfo
      | {
          country: string
          city: string
          postalCode: string
          address: string
          recipientName: string
          email: string
          phoneNumber: string
          clientNote: string
          shippingFees: string | undefined
          hasAgreedToTermsAndCondition: boolean
        },
  ) => void
}

export type DeliveryCity = {
  countryCode: string
  postalCode?: string
  cityName: string
  countyName?: string
  serviceArea: {
    code?: string
    description: string
    GMTOffset: string
  }
}

export type ProfilePictureDto = {
  profilePictureImgUrl: string
}
