import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets country's city
 * @author Awesomity Lab
 * @version 1.0
 */
export const useSearchCity = (): MutationResponse<{
  country: string
  city: string
}> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async ({ country, city }) => {
      return await handleRequest({
        url: `/api/v1/shipping/cities?country_code=${country}&city=${city}`,
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

export default useSearchCity
