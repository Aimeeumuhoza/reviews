/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { SuccessGenericResponse } from '../lib/interfaces/success-generic-response.interface'
import MutationResponse from '../lib/interfaces/mutation-response.interface'

interface HandleStateEventListeners<T> {
  onSuccess?: (response: SuccessGenericResponse<T>) => unknown
  onError?: (response: any) => unknown
  onLoading?: () => unknown
}

function useHandleState<T>(
  res: MutationResponse<unknown>,
  { onSuccess, onError, onLoading }: HandleStateEventListeners<T>,
): void {
  useEffect(() => {
    if (res.isSuccess && onSuccess) {
      onSuccess(res.successResponse as SuccessGenericResponse<T>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.isSuccess])

  useEffect(() => {
    if (res.isError && onError) {
      onError(res.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.isError])

  useEffect(() => {
    if (res.isLoading && onLoading) {
      onLoading()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.isLoading])
}

export default useHandleState
