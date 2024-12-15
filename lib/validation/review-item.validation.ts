import * as Yup from 'yup'
import { rating, reviewDescription, reviewTitle } from './validators'

export const reviewItemInitialValues = {
  rating: 1,
  title: '',
  description: '',
}

export const reviewItemValidationSchema = Yup.object().shape({
  rating,
  title: reviewTitle,
  description: reviewDescription,
})
