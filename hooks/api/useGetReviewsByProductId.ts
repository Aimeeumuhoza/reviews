import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { ReviewRatingItem } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get customer's wishlist
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetReviewsByProductId = (): PaginatedResponse<ReviewRatingItem> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<ReviewRatingItem>()
  const sendRequest = useCallback(
    (productId: number, limit = 4): void => {
      handleRequest(`/api/v1/reviews/product/${productId}?limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useGetReviewsByProductId
