export const getApiErrorMessage = (errorObj) => {
  const errorMsgs = errorObj.response.data.message
  return errorMsgs && Array.isArray(errorMsgs) ? errorMsgs : ['an unexpected error occured']
}
