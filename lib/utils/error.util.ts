/**
 * Checks if error variable is an array or a string
 * if variable is array, will return first index of array
 * if variable is string, will return that string
 * @param error error object
 * @returns
 */
export const getErrorFromUnknown = (error: Array<string> | string): string => {
  return Array.isArray(error) ? error[0] : error
}
