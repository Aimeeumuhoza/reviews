import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import { UserProfileDto } from '../../types'
import useMutation from './useMutation'

/**
 * Hook that modify shopper's profile details
 * @author Awesomity Lab
 * @version 1.0
 */
export const useModifyProfile = (): MutationResponse<UserProfileDto> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (requestBody) => {
      return await handleRequest({
        url: '/api/v1/clients/profile',
        requestType: ApiRequestType.PUT,
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

export default useModifyProfile
