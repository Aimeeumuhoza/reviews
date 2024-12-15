import * as yup from 'yup'
import { email, password, firstName, lastName, phoneNumber } from './validators'

export const initValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
}

export const validationSchema = yup.object().shape({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
})
