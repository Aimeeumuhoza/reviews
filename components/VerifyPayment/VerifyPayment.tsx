import Alert from 'antd/lib/alert/index'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { ImpulseSpinner } from 'react-spinners-kit'
import useVerifyPayment from '../../hooks/api/useVerifyPayment'
import useHandleState from '../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../lib/utils/error.util'
import RegistrationVerification from '../RegistrationVerification'
import { MessageType } from '../RegistrationVerification/RegistrationVerification'

const VerifyPayment: React.FC = () => {
  const router = useRouter()
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false)
  const [verificationSuccessMessage, setVerificationSuccessMessage] = useState<string>('')
  const [isVerificationError, setIsVerificationError] = useState(false)
  const [verificationErrorMessage, setVerificationErrorMessage] = useState<string>('')
  const [isLoadedQueries, setIsLoadedQueries] = useState(false)
  const [transactionId, setTransactionId] = useState<string | undefined>()
  const [ccdApproval, setCcdApproval] = useState<string | undefined>()
  const [transactionToken, setTransactionToken] = useState<string | undefined>()
  const verifyPayment = useVerifyPayment()

  useEffect(() => {
    if (router.query) {
      if (typeof router.query.TransID === 'string') {
        setTransactionId(router.query.TransID)
      }
      if (typeof router.query.CCDapproval === 'string') {
        setCcdApproval(router.query.CCDapproval)
      }
      if (typeof router.query.TransactionToken === 'string') {
        setTransactionToken(router.query.TransactionToken)
      }
      setIsLoadedQueries(true)
    }
  }, [router.query])

  useEffect(() => {
    if (isLoadedQueries) {
      if (transactionId && ccdApproval && transactionToken) {
        verifyPayment.sendRequest({ transactionId, ccdApproval, transactionToken })
      } else {
        setIsVerificationError(true)
        setVerificationErrorMessage('Could not make payment verification. Cause: MISSING_INFO ')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadedQueries, transactionId, ccdApproval, transactionToken])

  useHandleState(verifyPayment, {
    onError: (error) => {
      setVerificationErrorMessage(
        `Could not make payment verification. Cause: ${getErrorFromUnknown(error)}`,
      )
      setIsVerificationError(true)
    },
    onSuccess: () => {
      setIsVerificationSuccess(true)
      setVerificationSuccessMessage(
        'Your order has been successfully requested.  <br /> You will shortly receive an email with your order summary. <br /> <br />Thank you for shopping with us ',
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
              Phone: +250 780 460 007 | Email: contact@uzuriky.com
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
        Finalizing payment...
      </span>
      <Alert style={{ marginTop: 80 }} message="Do not close this window" banner />
    </div>
  )
}

export default VerifyPayment
