import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { WishlistItem } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get customer's wishlist
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetWishlist = (): PaginatedResponse<WishlistItem> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<WishlistItem>()
  const sendRequest = useCallback(
    (limit = 10): void => {
      handleRequest(`/api/v1/wishlist?limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useGetWishlist
