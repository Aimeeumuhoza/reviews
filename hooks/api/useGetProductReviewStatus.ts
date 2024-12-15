import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets user's profile details
 * @author Awesomity Lab
 * @version 1.0
 */
export const useGetProductReviewStatus = (): MutationResponse<{ slug: string }> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async ({ slug }) => {
      return await handleRequest({
        url: `/api/v1/reviews/product/${slug}/client-review-status`,
        requestType: ApiRequestType.GET,
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useGetProductReviewStatus
