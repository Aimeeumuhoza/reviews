import * as yup from 'yup'
import { promoCode } from './validators'

export const promoCodeInitialValues = {
  promoCode: '',
}

export const promoCodeValidationSchema = yup.object().shape({
  promoCode,
})
