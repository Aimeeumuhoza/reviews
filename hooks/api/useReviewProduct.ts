import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import { ReviewDto } from '../../types'
import useMutation from './useMutation'

/**
 * Hook that sends a client's review of a product
 * @author Awesomity Lab
 * @version 1.0
 */
export const useReviewProduct = (): MutationResponse<{ id: number; data: ReviewDto }> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async ({ id, data }) => {
      return await handleRequest({
        url: `/api/v1/reviews?product_variation_id=${id}`,
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

export default useReviewProduct
