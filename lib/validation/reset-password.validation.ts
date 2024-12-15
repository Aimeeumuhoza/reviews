import * as yup from 'yup'
import { password } from './validators'

export const resetPasswordInitialValues = {
  newPassword: '',
}

export const resetPasswordValidationSchema = yup.object().shape({
  newPassword: password,
})
