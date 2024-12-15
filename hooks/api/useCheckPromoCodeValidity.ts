import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets user's profile details
 * @version 1.0
 */
export const useCheckPromoCodeValidity = (): MutationResponse<string> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (promoCode: string) => {
      return await handleRequest({
        url: `/api/v1/public/promos/${promoCode}`,
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

export default useCheckPromoCodeValidity
