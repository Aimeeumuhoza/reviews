export default interface MutationResponse<T> {
  isLoading: boolean
  error: unknown
  isError: boolean
  isSuccess: boolean
  successResponse: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendRequest: (record: T) => any
}
