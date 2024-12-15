import { DiscountType } from '../enums/discount-type.enum'

export const getDiscountEquivalent = (
  originalAmount: number,
  discountAmount: number,
  discountType: DiscountType,
): number => {
  return discountType === DiscountType.AMOUNT
    ? originalAmount - discountAmount
    : originalAmount - (originalAmount * discountAmount) / 100
}
