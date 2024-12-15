import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { Order } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to get user's order history
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetOrderHistory = (): PaginatedResponse<Order> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<Order>()

  const sendRequest = useCallback(
    (limit = 10): void => {
      handleRequest(`/api/v1/orders/by-client?limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useGetOrderHistory
