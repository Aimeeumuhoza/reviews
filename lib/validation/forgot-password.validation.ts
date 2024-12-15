import * as yup from 'yup'
import { email } from './validators'

export const forgotPasswordInitialValues = {
  email: '',
}

export const forgotPasswordValidationSchema = yup.object().shape({
  email,
})
