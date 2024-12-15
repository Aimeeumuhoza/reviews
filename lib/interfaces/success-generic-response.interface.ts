export class SuccessGenericResponse<T> {
  statusCode?: number
  message: string
  payload: T
}
