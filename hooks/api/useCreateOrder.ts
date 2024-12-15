import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import { CreateOrderDto } from '../../types'
import useMutation from './useMutation'

/**
 * Hook that creates an order
 * @author Awesomity Lab
 * @version 1.0
 */
export const useCreateOrder = (): MutationResponse<CreateOrderDto> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (data) => {
      return await handleRequest({
        url: '/api/v1/orders',
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

export default useCreateOrder
