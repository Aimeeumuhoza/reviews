import { AxiosRequestConfig } from 'axios'
import { useApi } from '../../contexts/Api'
import { useCallback, useState } from 'react'
import ApiRequestType from '../../lib/enums/api-request-type.enum'
import GenericMutationResponse from '../../lib/interfaces/generic-mutation-response.interface'

/**
 * Hook to process api mutations such as POST,DELETE, PUT requests
 * will handle state management of request while request is being made
 * @author Awesomity Lab
 * @version 1.0
 */
export const useMutation = ({
  defaultLoadingState = false,
}: {
  defaultLoadingState?: boolean
}): GenericMutationResponse => {
  /** Api request states */
  const api = useApi() // api context value
  const [isError, setIsError] = useState<boolean>(false) // on error hook
  const [error, setError] = useState<[] | unknown>() // on error hook
  const [isLoading, setIsLoading] = useState<boolean>(defaultLoadingState) // on loading hook
  const [isSuccess, setIsSuccess] = useState<boolean>(false) // on success hook
  const [successResponse, setSuccessResponse] = useState<unknown>(false) // on success hook

  /**
   * hook will process api action and
   * handle states according to response
   *
   */
  const handleRequest = useCallback(
    async ({
      url,
      requestType,
      data,
      config,
    }: {
      url: string
      requestType: ApiRequestType
      data?: unknown
      config?: AxiosRequestConfig
    }) => {
      // Set request state as started
      setIsLoading(true)
      setError(null)
      setIsError(false)
      setIsSuccess(false)

      try {
        const response = await api.instance[requestType](url, data, config) // process api request async
        // Set request state as ended and successful
        setIsLoading(false)
        setSuccessResponse(response.data || response)
        setIsSuccess(true)
        setIsSuccess(false)
      } catch (e) {
        // Set request state as ended and failed
        const error = e?.response?.data?.message || e?.message || e
        setError(error)
        setIsError(true)
        setIsLoading(false)
        setIsError(false)
      }
    },
    [api],
  )

  return {
    isLoading,
    error,
    isError,
    handleRequest,
    isSuccess,
    successResponse,
  }
}

export default useMutation
