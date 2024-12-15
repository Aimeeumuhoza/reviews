import * as yup from 'yup'
import { password } from './validators'

export const changePasswordInitialValues = {
  oldPassword: '',
  newPassword: '',
}

export const changePasswordValidationSchema = yup.object().shape({
  newPassword: password,
  oldPassword: password,
})
