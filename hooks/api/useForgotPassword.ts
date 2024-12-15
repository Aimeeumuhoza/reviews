import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that makes a request to reset a user's password
 * @author Awesomity Lab
 * @version 1.0
 */
export const useForgotPassword = (): MutationResponse<{ email: string }> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (requestBody) => {
      return await handleRequest({
        url: '/api/v1/auth/password/reset',
        requestType: ApiRequestType.POST,
        data: requestBody,
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useForgotPassword
