import * as yup from 'yup'
import {
  country,
  city,
  postalCode,
  recipientName,
  address,
  email,
  phoneNumber,
  hasAgreedToTermsAndCondition,
} from './validators'

export const deliveryInfoInitialValues = {
  country: '',
  city: '',
  postalCode: '',
  address: '',
  recipientName: '',
  email: '',
  phoneNumber: '',
  clientNote: '',
  hasAgreedToTermsAndCondition: false,
}

export const deliveryInfoValidationSchema = yup.object().shape({
  country,
  city,
  postalCode,
  address,
  recipientName,
  email,
  phoneNumber,
  hasAgreedToTermsAndCondition,
})
