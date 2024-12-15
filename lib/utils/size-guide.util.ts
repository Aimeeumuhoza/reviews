import { MeasurementUnit } from '../../types'

export const convertToEUShoeSize = (size: number, unit: MeasurementUnit): number => {
  let mm = 0
  let inches = 0
  switch (unit) {
    case 'CM':
      mm = size * 10
      inches = mm / 25.4
      return parseFloat(Math.round(1.27 * (3 * inches - 23 + 23) + 2).toFixed(1))
    case 'IN':
      return parseFloat(Math.round(1.27 * (3 * size - 23 + 23) + 2).toFixed(1))
    default:
      throw new Error('Choose a unit')
  }
}
