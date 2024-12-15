import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets adds an item to a user's wishlist
 * @author Awesomity Lab
 * @version 1.0
 */
export const useSaveItemToWishlist = (): MutationResponse<{ productVariationIds: number[] }> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (data: { productVariationIds: number[] }) => {
      return await handleRequest({
        url: '/api/v1/wishlist',
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

export default useSaveItemToWishlist
