import { useCallback } from 'react'
import { useApi } from '../../contexts/Api'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that login user's through third party auth
 * @author Awesomity Lab
 * @version 1.0
 */
export const useThirdPartySignUp = (): MutationResponse<{ accessToken: string }> => {
  const { handleRequest, ...props } = useMutation({})
  const api = useApi()
  const sendRequest = useCallback(
    async ({ accessToken }) => {
      api.instance.defaults.headers.common['authorization'] = accessToken
      return await handleRequest({
        url: '/api/v1/auth/client/sign-up/third-party',
        requestType: ApiRequestType.POST,
      })
    },
    [api.instance.defaults.headers.common, handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useThirdPartySignUp
