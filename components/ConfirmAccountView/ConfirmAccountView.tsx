import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useConfirmAccountCreation from '../../hooks/api/useConfirmAccountCreation'
import useHandleState from '../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../lib/utils/error.util'
import LoadingComponent from '../LoadingComponent'
import RegistrationVerification from '../RegistrationVerification'
import { MessageType } from '../RegistrationVerification/RegistrationVerification'

const ConfirmAccountView: React.FC = () => {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [token, setToken] = useState<string>((router.query?.slug as string) || '')
  const confirmAccountCreationHook = useConfirmAccountCreation()

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query?.token as string)
    }
  }, [router.query])

  useEffect(() => {
    if (token) {
      confirmAccountCreationHook.sendRequest({ token })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useHandleState(confirmAccountCreationHook, {
    onSuccess: () => {
      router.replace('/login')
    },
    onError: () => {
      setIsError(true)
    },
  })

  if (!token || confirmAccountCreationHook.isLoading) return <LoadingComponent />

  if (isError)
    return (
      <RegistrationVerification
        messageType={MessageType.ERROR}
        title="ERROR"
        text={`Could not finish process, Something wrong happened. <br /> <b>${getErrorFromUnknown(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          confirmAccountCreationHook.error as any,
        )}</b>`}
      />
    )
  return (
    <RegistrationVerification
      messageType={MessageType.SUCCESS}
      title="SUCCESS"
      text="You can now login with no issues"
    />
  )
}

export default ConfirmAccountView
