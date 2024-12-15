export const isArray = (array: any[]): boolean => Array.isArray(array)
export const isEmpty = (array: any[]): boolean => array.length === 0

export const isValid = (array: any[], loading: boolean): boolean => isArray(array) && !loading
