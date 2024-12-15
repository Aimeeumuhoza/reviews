import * as yup from 'yup'
import { email, password } from './validators'
export const initValues = {
  email: '',
  password: '',
}

export const validationSchema = yup.object().shape({
  email,
  password,
})
