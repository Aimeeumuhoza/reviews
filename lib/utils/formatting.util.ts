import { Product, ProductVariantSearchRes, ProductWithFullDetails } from '../../types'

export const isProductDiscounted = (p: Product | ProductWithFullDetails | undefined): boolean => {
  try {
    if (p === undefined) {
      return false
    } else {
      const currentDate = new Date()
      return (
        new Date(p?.discountExpirationDate) > currentDate &&
        new Date(p?.discountActivationDate) < currentDate
      )
    }
  } catch (error) {
    return false
  }
}

/**
 * Adds a comma after  each instance of 3 digits in string
 * @param numberVal
 */
export const numberWithCommas = (numberVal?: string | number | undefined): string => {
  if (typeof numberVal === 'number') {
    return numberVal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return numberVal?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
  }
}

export const mapIsoCodeToFlag = (isoCode: string): string => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode
}

export const capitalizeFirstLetter = (str?: string): string => {
  return str ? str?.charAt(0).toUpperCase() + str?.slice(1) : ''
}

export const rounded = (numb: number): number => Math.round((numb + Number.EPSILON) * 10) / 10

export const mapToProductType = (variants: ProductVariantSearchRes[] | undefined): Product[] =>
  variants
    ? variants.map((v) => ({
        productOptions: [
          {
            id: v.id,
            imgUrls: v.imgUrls,
            dominantColors: v.dominantColors,
            shoeSizes: v.shoeSizes,
            isInStock: v.isInStock,
            isVisible: v.isVisible,
          },
        ],
        ...v.productParent,
      }))
    : []

export const capitalize = (str?: string): string =>
  str
    ? str
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    : ''
