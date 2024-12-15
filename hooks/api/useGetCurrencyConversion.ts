import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets currency conversion from rwf to usd
 * @author Awesomity Lab
 * @version 1.0
 */
export const useGetCurrencyConversion = (): MutationResponse<string> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (currency: string) => {
      return await handleRequest({
        url: `/api/v1/public/currency/conversion-rate?from=${currency}&to=RWF`,
        requestType: ApiRequestType.GET,
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useGetCurrencyConversion
