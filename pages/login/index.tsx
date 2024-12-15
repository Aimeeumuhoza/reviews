import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import message from 'antd/lib/message'
import Link from 'next/link'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import { useRouter } from 'next/router'
import SocialLogin from '../../components/SocialLogin'
import { initValues, validationSchema } from '../../lib/validation/login'
import useEmailAndPasswordLogin from '../../hooks/api/useEmailAndPasswordLogin'
import useHandleState from '../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../lib/utils/error.util'
import { useAuth } from '../../contexts/Auth'
import useThirdPartyLogin from '../../hooks/api/useThirdPartyLogin'
import { useEffect, useState } from 'react'

const Login = (): JSX.Element => {
  const auth = useAuth()
  const router = useRouter()
  const [redirectToRoute, setRedirectToRoute] = useState<string>()
  const thirdPartyLogin = useThirdPartyLogin()
  const emailAndPasswordLogin = useEmailAndPasswordLogin()

  useHandleState<{ accessToken: string; refreshToken: string }>(emailAndPasswordLogin, {
    onSuccess: (response) => {
      const { accessToken } = response.payload
      auth.setApiAccessToken(accessToken)
      localStorage.setItem('WAS_LOGGED_IN', JSON.stringify(true))
      router.push('/')
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  useEffect(() => {
    const { redirectTo } = router.query
    if (redirectTo && typeof redirectTo === 'string') {
      setRedirectToRoute(router.query.redirectTo as string)
    }
  }, [router.query])

  useHandleState<{ accessToken: string; refreshToken: string }>(thirdPartyLogin, {
    onSuccess: (response) => {
      const { accessToken } = response.payload
      auth.setApiAccessToken(accessToken)
      localStorage.setItem('WAS_LOGGED_IN', JSON.stringify(true))
      router.push(`${redirectToRoute || '/'}`)
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  return (
    <div className="container-fluid uzuri_section">
      <Row justify="center">
        <Col xs={24} sm={18} md={8} lg={6} xl={6} className="text-center">
          <Card style={{ border: 'none' }}>
            <p className="text24 black fowe700 text-center mabo32">LOG IN </p>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={(data) => emailAndPasswordLogin.sendRequest(data)}>
              {({ errors, touched }) => (
                <Form name="login" id="login-form">
                  <Form.Item
                    name="email"
                    validateStatus={errors.email && touched.email ? 'error' : ''}
                    help={touched.email && errors.email && errors.email}>
                    <Input
                      className="my_input mabo16"
                      placeholder="Email adress"
                      type="email"
                      name="email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    validateStatus={errors.password && touched.password ? 'error' : ''}
                    help={touched.password && errors.password && errors.password}>
                    <Input.Password
                      className="my_input mabo16"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item name="loginBtn">
                    <Button
                      loading={emailAndPasswordLogin.isLoading}
                      size="large"
                      htmlType="submit"
                      className="btn_primary_large btn_full mabo32">
                      LOG IN
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-center mabo16">
                <Link href="/forgot-password">
                  <a className="btn_link_dark mabo32 mb-4" style={{ textDecoration: 'underline' }}>
                    Forgot password?
                  </a>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-center mabo16">
                <Link href="/register">
                  <a className="btn_link mabo32">
                    <span className="fowe400 gray">New Cuctomer? </span>{' '}
                    <span className="" style={{ textDecoration: 'underline', fontWeight: 700 }}>
                      <a className="btn_link_dark mabo32">REGISTER</a>
                    </span>
                  </a>
                </Link>
                <Divider />
                <p className="text12 fowe700">Or</p>

                <p className="text12 gray ">Continue with</p>
              </Col>
            </Row>

            <SocialLogin
              isLoading={thirdPartyLogin.isLoading}
              onGoogleAuth={(body) => {
                thirdPartyLogin.sendRequest(body)
              }}
            />
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-center mabo64">
              <Divider></Divider>
              <Link href="/home">
                <a className="btn_link" style={{ textDecoration: 'underline', fontWeight: 700 }}>
                  Go back
                </a>
              </Link>
            </Col>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login
