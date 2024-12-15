import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { Product } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get products
 * @author Awesomity Lab
 * @version 1.0
 */
const useSearchProducts = (): PaginatedResponse<Product> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<Product>()

  const sendRequest = useCallback(
    ({ limit = 10, q }: { limit: number; q: string }): void => {
      handleRequest(`/api/v1/public/products?limit=${limit}&${q}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useSearchProducts
