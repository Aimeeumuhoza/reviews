import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that confirms a shopper's account creation
 * @author Awesomity Lab
 * @version 1.0
 */
export const useConfirmAccountCreation = (): MutationResponse<{ token: string }> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async ({ token }) => {
      return await handleRequest({
        url: `/api/v1/auth/client/confirm-account/${token}`,
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

export default useConfirmAccountCreation
