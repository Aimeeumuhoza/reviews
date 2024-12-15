import React from 'react'
import Currency from '../../lib/enums/currency.enum'

export type CurrencyConversionContextData = {
  currentRate: number
  currentCurrency: string
  changeCurrencyRate: (currency: Currency) => void
  convertTo: (amount: number) => string
  convertFrom: (amount: string) => number
  hasChangedCurrency: boolean | undefined
  shouldUpdateLocation: boolean | undefined
  currentLocation: string
  changeLocation: (location: string) => void
}

const CurrencyConversionContext = React.createContext<CurrencyConversionContextData>({
  changeCurrencyRate: () => {
    return
  },
  convertTo: () => {
    return ''
  },
  convertFrom: () => {
    return 0
  },
  currentRate: 1,
  currentCurrency: '',
  hasChangedCurrency: undefined,
  shouldUpdateLocation: false,
  currentLocation: '',
  changeLocation: () => {
    return
  },
})

export default CurrencyConversionContext
