import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import { LoginRequestBody } from '../../lib/interfaces/login-request-body.interface'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that login user's password
 * @author Awesomity Lab
 * @version 1.0
 */
export const useEmailAndPasswordLogin = (): MutationResponse<LoginRequestBody> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (requestBody: LoginRequestBody) => {
      return await handleRequest({
        url: '/api/v1/auth/client/login',
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

export default useEmailAndPasswordLogin
