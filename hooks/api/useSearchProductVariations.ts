import { useCallback } from 'react'
import PaginatedResponse from '../../lib/interfaces/paginated-response.interface'
import { ProductVariantSearchRes } from '../../types'
import usePaginatedQuery from './usePaginatedQuery'

/**
 * Hook to search product variations
 * @author Lynda
 * @version 1.0
 */
const useSearchProductVariations = (): PaginatedResponse<ProductVariantSearchRes> => {
  const { handleRequest, ...paginatedQueryBHook } = usePaginatedQuery<ProductVariantSearchRes>()

  const sendRequest = useCallback(
    ({ limit = 12, q }: { limit: number; q: string }): void => {
      handleRequest(`/api/v1/public/products/variations/search${q}&limit=${limit}`)
    },
    [handleRequest],
  )

  return {
    ...paginatedQueryBHook,
    sendRequest,
  }
}

export default useSearchProductVariations
