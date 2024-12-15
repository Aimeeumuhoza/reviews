import React, { useEffect, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import {
  resetPasswordInitialValues,
  resetPasswordValidationSchema,
} from '../../lib/validation/reset-password.validation'
import useResetPassword from '../../hooks/api/useResetPassword'
import useHandleState from '../../hooks/useHandleState'
import { message } from 'antd'
import { getErrorFromUnknown } from '../../lib/utils/error.util'

const ResetPassword = (): JSX.Element => {
  const router = useRouter()
  const resetPasswordHook = useResetPassword()
  const [token, setToken] = useState<string>((router.query?.token as string) || '')

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query?.token as string)
    }
  }, [router.query])

  useHandleState(resetPasswordHook, {
    onSuccess: () => {
      message.info('Password reset successful, you can now login')
      router.push('/login')
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  return (
    <div className="container-fluid uzuri_section">
      <Row justify="center">
        <Col xs={24} sm={18} md={8} lg={6} xl={6} className="text-center">
          <Card style={{ border: 'none' }}>
            <p className="text24 black fowe700 text-center mabo32">Reset Password</p>
            <Formik
              initialValues={resetPasswordInitialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={(data) => {
                resetPasswordHook.sendRequest({ newPassword: data.newPassword, token })
              }}>
              {(formikProps) => (
                <Form>
                  <Row align="middle" className="mabo32">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'newPassword')}
                        help={getHelp(formikProps, 'newPassword')}>
                        <Input.Password
                          className="my_input"
                          value={formikProps.values.newPassword}
                          onChange={formikProps.handleChange('newPassword')}
                          placeholder="Password"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="loginBtn" className="mabo64">
                    <Button
                      loading={resetPasswordHook.isLoading}
                      onClick={() => formikProps.handleSubmit()}
                      size="large"
                      htmlType="submit"
                      className="btn_primary_large btn_full">
                      RESET
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default ResetPassword
