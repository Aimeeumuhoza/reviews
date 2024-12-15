import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { Product } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get products
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetProducts = (): PaginatedResponse<Product> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<Product>()

  const sendRequest = useCallback(
    (limit = 12): void => {
      handleRequest(`/api/v1/public/products?limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useGetProducts
