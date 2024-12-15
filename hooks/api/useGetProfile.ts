import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import useMutation from './useMutation'

/**
 * Hook that gets user's profile details
 * @author Awesomity Lab
 * @version 1.0
 */
export const useGetProfile = (): MutationResponse<void> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(async () => {
    return await handleRequest({
      url: '/api/v1/auth/me',
      requestType: ApiRequestType.GET,
    })
  }, [handleRequest])
  return {
    sendRequest,
    ...props,
  }
}

export default useGetProfile
