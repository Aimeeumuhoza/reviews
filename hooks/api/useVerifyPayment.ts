import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import { VerifyPaymentDto } from '../../types'
import useMutation from './useMutation'

/**
 * Hook that verifies successful payment
 * @author Awesomity Lab
 * @version 1.0
 */
export const useVerifyPayment = (): MutationResponse<VerifyPaymentDto> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (data) => {
      return await handleRequest({
        url: '/api/v1/orders/verify',
        requestType: ApiRequestType.POST,
        data,
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useVerifyPayment
