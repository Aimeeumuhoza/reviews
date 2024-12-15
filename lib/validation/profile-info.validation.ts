import * as yup from 'yup'
import { UserProfileDto } from '../../types'
import { country, city, postalCode, address, email, firstName, lastName } from './validators'

export const profileInfoInitialValues: UserProfileDto = {
  firstName: '',
  lastName: '',
  country: '',
  phoneNumber: '',
  email: '',
  city: '',
  postalCode: '',
  address: '',
}

export const profileInfoValidationSchema = yup.object().shape({
  firstName,
  lastName,
  country,
  phoneNumber: yup.string(),
  email,
  city: city.optional(),
  postalCode: postalCode.optional(),
  address: address.optional(),
})
