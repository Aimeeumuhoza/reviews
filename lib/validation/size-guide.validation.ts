import * as yup from 'yup'
import { MeasurementUnit } from '../../types'
import { footSize, measurementUnit } from './validators'

export const sizeGuideInitialValues: {
  footSize: number | undefined
  measurementUnit: MeasurementUnit
} = {
  footSize: undefined,
  measurementUnit: 'CM',
}

export const sizeGuideValidationSchema = yup.object().shape({
  footSize,
  measurementUnit,
})
