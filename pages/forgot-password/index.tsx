import React, { useState } from 'react'
import { Formik } from 'formik'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import {
  forgotPasswordInitialValues,
  forgotPasswordValidationSchema,
} from '../../lib/validation/forgot-password.validation'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import useForgotPassword from '../../hooks/api/useForgotPassword'
import useHandleState from '../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../lib/utils/error.util'
import { message } from 'antd'
import RegistrationVerification from '../../components/RegistrationVerification'
import { MessageType } from '../../components/RegistrationVerification/RegistrationVerification'

const ForgotPassword = (): JSX.Element => {
  const forgotPasswordHook = useForgotPassword()
  const [showConfirmationView, setShowConfirmationView] = useState(false)

  useHandleState(forgotPasswordHook, {
    onSuccess: () => {
      setShowConfirmationView(true)
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  if (showConfirmationView)
    return (
      <RegistrationVerification
        messageType={MessageType.SUCCESS}
        title="PROCESS SUCCESSFUL"
        text={
          'An email with a link to reset your password has been sent. Check your mailbox to finalize the procedure'
        }
      />
    )

  return (
    <div className="container-fluid uzuri_section">
      <Row justify="center">
        <Col xs={24} sm={18} md={8} lg={6} xl={6} className="text-center">
          <Card style={{ border: 'none' }}>
            <p className="text24 black fowe700 text-center mabo32">Forgot password?</p>
            <Formik
              initialValues={forgotPasswordInitialValues}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={(data) => {
                forgotPasswordHook.sendRequest(data)
              }}>
              {(formikProps) => (
                <Form name="forgotPassword" id="forgot-form">
                  <Row className="mabo32" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'email')}
                        help={getHelp(formikProps, 'email')}>
                        <Input
                          className="my_input"
                          placeholder="Email adress"
                          value={formikProps.values.email}
                          onChange={formikProps.handleChange('email')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="loginBtn" className="mabo32">
                    <Button
                      loading={forgotPasswordHook.isLoading}
                      size="large"
                      onClick={() => formikProps.handleSubmit()}
                      className="btn_primary_large btn_full mabo32">
                      SUBMIT
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-center mabo64">
                <a
                  aria-disabled={forgotPasswordHook.isLoading}
                  className="btn_link"
                  href="/"
                  style={{ textDecoration: 'underline' }}>
                  Go back
                </a>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default ForgotPassword
