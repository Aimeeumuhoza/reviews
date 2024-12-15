import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that removes an item from a user's wishlist
 * @author Awesomity Lab
 * @version 1.0
 */
export const useRemoveItemFromWishlist = (): MutationResponse<{ wishlistItemId: number }> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async ({ wishlistItemId }) => {
      return await handleRequest({
        url: `/api/v1/wishlist/${wishlistItemId}`,
        requestType: ApiRequestType.DELETE,
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useRemoveItemFromWishlist
