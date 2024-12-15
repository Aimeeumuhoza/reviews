import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that calculates shipping fees based on country & amount
 * @author Awesomity Lab
 * @version 1.0
 */
export const useCalculateShippingFees = (): MutationResponse<{
  country: string
  city: string
  kilos: string
}> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async ({ country, city, kilos }) => {
      return await handleRequest({
        url: `/api/v1/shipping/dhl`,
        requestType: ApiRequestType.POST,
        data: {
          destinationCountryCode: country,
          destinationCityName: city,
          weight: kilos,
        },
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useCalculateShippingFees
