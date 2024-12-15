import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useHandleState from '../../../hooks/useHandleState'
import { Alert } from 'antd'
import { getErrorFromUnknown } from '../../../lib/utils/error.util'
import useResendAccountConfirmation from '../../../hooks/api/useResendAccountConfirmation'
import { ImpulseSpinner } from 'react-spinners-kit'
import RegistrationVerification from '../../../components/RegistrationVerification'
import { MessageType } from '../../../components/RegistrationVerification/RegistrationVerification'

const ResendResetPasswordRequest = (): JSX.Element => {
  const router = useRouter()
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false)
  const [verificationSuccessMessage, setVerificationSuccessMessage] = useState<string>('')
  const [isVerificationError, setIsVerificationError] = useState(false)
  const [verificationErrorMessage, setVerificationErrorMessage] = useState<string>('')
  const resendAccountConfirmationHook = useResendAccountConfirmation()

  useEffect(() => {
    if (router.query.src) {
      resendAccountConfirmationHook.sendRequest({ email: router.query.src as string })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useHandleState(resendAccountConfirmationHook, {
    onError: (error) => {
      setVerificationErrorMessage(
        `Could not resend confirmation email. Cause: ${getErrorFromUnknown(error)}`,
      )
      setIsVerificationError(true)
    },
    onSuccess: () => {
      setIsVerificationSuccess(true)
      setVerificationSuccessMessage(
        'Another confirmation email has been successfully sent to your email.',
      )
    },
  })

  if (isVerificationSuccess)
    return (
      <RegistrationVerification
        title="Success"
        text={verificationSuccessMessage}
        messageType={MessageType.SUCCESS}
        actionText="Go Home"
        actionUrl="/"
      />
    )

  if (isVerificationError)
    return (
      <RegistrationVerification
        title="Could not make verification"
        text={
          <Fragment>
            <p>{verificationErrorMessage}</p>
            <span className="text14 fowe600 gray mabo64">For more info. contact us</span>
            <br />
            <span className="mato8 text14 fowe600 gray mabo64">
              Phone: +250 780 460 007 | Email: +250 780 460 007
            </span>
            <br />
            <br />
          </Fragment>
        }
        messageType={MessageType.ERROR}
        actionText="Go Home"
        actionUrl="/"
      />
    )

  return (
    <div
      style={{
        height: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <img
        src="/logo_dimmed.png"
        alt="Picture of the author"
        style={{ borderBottom: 'none', color: 'none', marginRight: '32px' }}
        height={32}
      />
      <br />
      <div style={{ marginRight: '32px' }}>
        <ImpulseSpinner size={20} frontColor="#adacac" backColor="#d5d4d4" />
      </div>
      <br />
      <span style={{ color: '#d5d4d4' }} className="text14 fowe500">
        Resend confirmation email...
      </span>
      <Alert style={{ marginTop: 80 }} message="Do not close this window" banner />
    </div>
  )
}
export default ResendResetPasswordRequest
