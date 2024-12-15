import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { ReviewRatingItem } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get all reviews
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetAllReviews = (): PaginatedResponse<ReviewRatingItem> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<ReviewRatingItem>()

  const sendRequest = useCallback(
    (limit = 6): void => {
      handleRequest(`/api/v1/reviews?limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useGetAllReviews
