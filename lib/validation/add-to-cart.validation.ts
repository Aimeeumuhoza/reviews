import * as yup from 'yup'
import { RequiredNumberSchema } from 'yup/lib/number'
import { ProductClassification } from '../../types'
import {
  orderedQuantity,
  orderedShoeSize,
  email,
  names,
  giftEmailBody,
  phoneNumber,
} from './validators'

// export const addToCartInitialValues: {
//   orderedQuantity: number | undefined
//   orderedShoeSize: number | undefined
// } = { orderedShoeSize: undefined, orderedQuantity: undefined }

export const addToCartInitialValues = (
  productClassification?: ProductClassification,
): {
  orderedQuantity: number | undefined
  orderedShoeSize?: number | string | undefined
  giftRecipientEmail?: string
  giftRecipientPhoneNumber?: string
  giftEmailBody?: string
  giftBenefactorName?: string
} => {
  switch (productClassification) {
    case 'SHOE':
      return { orderedShoeSize: undefined, orderedQuantity: undefined }
    case 'GIFT_CARD':
      return {
        orderedQuantity: 1,
        giftRecipientEmail: undefined,
        giftRecipientPhoneNumber: undefined,
        giftEmailBody: undefined,
        giftBenefactorName: undefined,
      }
    default:
      return { orderedQuantity: undefined }
  }
}

export const addToCartValidationSchema = (
  productClassification?: ProductClassification,
): yup.ObjectSchema<{
  orderedQuantity: RequiredNumberSchema<number | undefined, Record<string, unknown>>
  orderedShoeSize?: RequiredNumberSchema<number | undefined, Record<string, unknown>>
}> => {
  switch (productClassification) {
    case 'SHOE':
      return yup.object().shape({
        orderedQuantity,
        orderedShoeSize,
      })
    case 'GIFT_CARD':
      return yup.object().shape({
        orderedQuantity,
        giftRecipientEmail: email,
        giftRecipientPhoneNumber: phoneNumber,
        giftEmailBody,
        giftBenefactorName: names,
      })
    default:
      return yup.object().shape({
        orderedQuantity,
      })
  }
}
