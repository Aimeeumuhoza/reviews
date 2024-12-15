import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import { ImpulseSpinner } from 'react-spinners-kit'
import { FaGooglePlusG } from 'react-icons/fa'
import { useHandleGoogleLogin } from '../../lib/firebase/firebase'
import message from 'antd/lib/message'

type SocialLoginProps = {
  isLoading?: boolean
  onGoogleAuth?: ({ accessToken: string }) => void
}

const SocialLogin: React.FC<SocialLoginProps> = (props) => {
  const handleGoogleLoginHook = useHandleGoogleLogin({
    onSuccess: (user) => {
      props?.onGoogleAuth && props?.onGoogleAuth({ accessToken: user.za || user._lat })
    },
    onFailure: (error) => message.error(error.message || message),
  })

  if (props.isLoading || handleGoogleLoginHook.isLoading)
    return (
      <Row className="text-center">
        <Col offset={11}>
          <ImpulseSpinner size={20} frontColor="#adacac" backColor="#d5d4d4" />
        </Col>
      </Row>
    )

  return (
    <Row className="text-center">
      <Col span={24}>
        <FaGooglePlusG
          onClick={() => handleGoogleLoginHook.sendRequest()}
          style={{ color: 'white', backgroundColor: 'black', cursor: 'pointer' }}
          className="social_login_icon_black btn_link"
        />
        {/* TODO: Add back socials once accounts are activated */}
        {/* <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            handleFacebookLoginHook.sendRequest()
          }}>
          <i className="fab fa-facebook-square white social_login_icon_black" />
        </a>
        <i className="fab fa-linkedin white social_login_icon_black"></i>
        <i className="fab fa-twitter white social_login_icon_black "></i> */}
      </Col>
    </Row>
  )
}

export default SocialLogin
