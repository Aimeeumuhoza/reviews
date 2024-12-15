import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { Banner } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get products
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetBanners = (): PaginatedResponse<Banner> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<Banner>()

  const sendRequest = useCallback(
    (limit = 10): void => {
      handleRequest(`/api/v1/public/banners?limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useGetBanners
