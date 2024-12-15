import React, { Fragment } from 'react'
import { connect, FormikProps } from 'formik'

type OnSubmitValidationErrorProps = {
  formik: FormikProps<unknown>
  callback: (formik: FormikProps<unknown>) => void
}

const OnSubmitValidationError: React.FC<OnSubmitValidationErrorProps> = (props) => {
  const effect = (): void => {
    if (props?.formik.submitCount > 0 && !props?.formik.isSubmitting && !props?.formik.isValid) {
      props?.callback(props?.formik)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(effect, [props?.formik.submitCount, props?.formik.isSubmitting])

  return <Fragment></Fragment>
}

export default connect(OnSubmitValidationError)
