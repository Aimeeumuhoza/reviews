import React, { useEffect, useRef, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import SocialLogin from '../../components/SocialLogin'
import { Formik, FormikProps } from 'formik'
import { initValues, validationSchema } from '../../lib/validation/registration'
import Link from 'next/link'
import message from 'antd/lib/message'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import useEmailAndPasswordSignUp from '../../hooks/api/useEmailAndPasswordSignUp'
import useHandleState from '../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../lib/utils/error.util'
import RegistrationVerification from '../../components/RegistrationVerification'
import useThirdPartySignUp from '../../hooks/api/useThirdPartySignUp'
import { MessageType } from '../../components/RegistrationVerification/RegistrationVerification'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/Auth'

const Register = (): JSX.Element => {
  const router = useRouter()
  const auth = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formikRef = useRef<FormikProps<any>>(null)
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [showConfirmAccountView, setShowConfirmAccountView] = useState(false)
  const emailAndPasswordSignUp = useEmailAndPasswordSignUp()
  const thirdPartySignUp = useThirdPartySignUp()

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn])

  useHandleState(emailAndPasswordSignUp, {
    onSuccess: () => {
      setConfirmationMessage(`Thank you. We have sent an email to ${formikRef.current?.values?.email}. <br />
          Please click the link in that message to activate your account.`)
      setShowConfirmAccountView(true)
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  useHandleState<{ accessToken: string; refreshToken: string }>(thirdPartySignUp, {
    onSuccess: (response) => {
      const { accessToken } = response.payload
      auth.setApiAccessToken(accessToken)
      localStorage.setItem('WAS_LOGGED_IN', JSON.stringify(true))
      router.push('/')
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  if (showConfirmAccountView)
    return (
      <RegistrationVerification
        messageType={MessageType.SUCCESS}
        title="PLEASE CHECK YOUR EMAIL AND ACTIVATE YOUR ACCOUNT"
        text={confirmationMessage}
      />
    )

  return (
    <div className="container-fluid uzuri_section">
      <Row justify="center">
        <Col xs={24} sm={18} md={8} lg={6} xl={6}>
          <Card style={{ border: 'none' }}>
            <p className="text24 black fowe700 text-center mabo32">REGISTER </p>
            <Formik
              innerRef={formikRef}
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={(data) => {
                emailAndPasswordSignUp.sendRequest({ ...data })
              }}>
              {(formikProps) => (
                <Form name="register" id="register-form">
                  <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'firstName')}
                        help={getHelp(formikProps, 'firstName')}>
                        <Input
                          className="my_input mabo16"
                          placeholder="First name"
                          value={formikProps.values.firstName}
                          onChange={formikProps.handleChange('firstName')}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'lastName')}
                        help={getHelp(formikProps, 'lastName')}>
                        <Input
                          className="my_input mabo16"
                          placeholder="Last names"
                          value={formikProps.values.lastName}
                          onChange={formikProps.handleChange('lastName')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'email')}
                        help={getHelp(formikProps, 'email')}>
                        <Input
                          className="my_input mabo16"
                          placeholder="Email address"
                          type="email"
                          value={formikProps.values.email}
                          onChange={formikProps.handleChange('email')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align="middle" className="mabo16">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'phoneNumber')}
                        help={getHelp(formikProps, 'phoneNumber')}>
                        <PhoneNumberInput
                          placeholder="Phone number"
                          onChange={(phoneNumber) => {
                            formikProps.setFieldValue('phoneNumber', `+${phoneNumber}`)
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        validateStatus={getValidationStatus(formikProps, 'password')}
                        help={getHelp(formikProps, 'password')}>
                        <Input.Password
                          className="my_input mabo8"
                          placeholder="Password"
                          value={formikProps.values.password}
                          onChange={formikProps.handleChange('password')}
                        />
                      </Form.Item>
                      <p className="text12 gray">
                        Password must be atleast 4 characters, with letters and numbers{' '}
                      </p>
                    </Col>
                  </Row>
                  <Form.Item name="loginBtn">
                    <Button
                      loading={emailAndPasswordSignUp.isLoading}
                      size="large"
                      onClick={() => formikProps.handleSubmit()}
                      className="btn_primary_large btn_full mabo32">
                      REGISTER
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-center ">
                <div className="mabo32">
                  <Link href="/login">
                    <a className="btn_link">
                      <span className="fowe400 gray">Have an account?</span>
                      <span style={{ textDecoration: 'underline', fontWeight: 900 }}>
                        {' Login'}
                      </span>
                    </a>
                  </Link>
                </div>
                <Divider></Divider>
                <p className="text12 fowe700">Or</p>

                <p className="text12 gray ">Continue with</p>
              </Col>
            </Row>
            <SocialLogin onGoogleAuth={(body) => thirdPartySignUp.sendRequest(body)} />
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-center mabo32">
              <Divider></Divider>
              <Link href="/login">
                <p className="btn_link" style={{ textDecoration: 'underline', fontWeight: 700 }}>
                  Go back
                </p>
              </Link>
            </Col>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Register
