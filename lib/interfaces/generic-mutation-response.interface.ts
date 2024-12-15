export default interface GenericMutationResponse {
  isLoading: boolean
  error: unknown
  isError: boolean
  handleRequest: (v: unknown) => unknown
  isSuccess: boolean
  successResponse: unknown
}
