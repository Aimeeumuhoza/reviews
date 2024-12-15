import { useCallback } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import MutationResponse from '../../lib/interfaces/mutation-response.interface'
import { ProfilePictureDto } from '../../types'
import useMutation from './useMutation'

/**
 * Hook that gets user's profile picture
 * @author Awesomity Lab
 * @version 1.0
 */
export const useChangeProfilePicture = (): MutationResponse<ProfilePictureDto> => {
  const { handleRequest, ...props } = useMutation({})
  const sendRequest = useCallback(
    async (profilePictureDto: ProfilePictureDto) => {
      return await handleRequest({
        url: '/api/v1/clients/profile-picture',
        requestType: ApiRequestType.PUT,
        data: profilePictureDto,
      })
    },
    [handleRequest],
  )
  return {
    sendRequest,
    ...props,
  }
}

export default useChangeProfilePicture
