import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import { ClientSignUpWithEmailPasswordDto } from '../../lib/interfaces/client-signup-with-email-password.dto'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that signs up user
 * @author Awesomity Lab
 * @version 1.0
 */
export const useEmailAndPasswordSignUp = (): MutationResponse<ClientSignUpWithEmailPasswordDto> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (requestBody: ClientSignUpWithEmailPasswordDto) => {
      return await handleRequest({
        url: '/api/v1/auth/client/sign-up',
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

export default useEmailAndPasswordSignUp
