import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets product by slug
 * @author Awesomity Lab
 * @version 1.0
 */
export const useGetProductBySlug = (): MutationResponse<string> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (productSlug) => {
      return await handleRequest({
        url: `/api/v1/public/products/${productSlug}`,
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

export default useGetProductBySlug
