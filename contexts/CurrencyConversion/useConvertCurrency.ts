import { useContext } from 'react'

import CurrencyConversionContext, {
  CurrencyConversionContextData,
} from './CurrencyConversionContext'

/**
 * Context Hook holding api client instance
 */
const useConvertCurrency = (): CurrencyConversionContextData => {
  const context = useContext<CurrencyConversionContextData>(CurrencyConversionContext)
  if (context === undefined) {
    throw new Error('useConvertCurrency must be used within an CurrencyConversionContext')
  }

  return context
}

export default useConvertCurrency
