/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const getHelp = (formikProps, fieldName) => {
  return (
    formikProps.touched[fieldName] && formikProps.errors[fieldName] && formikProps.errors[fieldName]
  )
}

export const getValidationStatus = (formikProps, fieldName) => {
  return formikProps.errors[fieldName] && formikProps.touched[fieldName] ? 'error' : ''
}
