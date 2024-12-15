import { useRouter } from 'next/router'
import React, { Fragment, useEffect } from 'react'
import { useAuth } from '../../contexts/Auth'
import LoadingComponent from '../LoadingComponent'

const UnAuthenticatedView: React.FC = (props) => {
  const router = useRouter()
  const authHook = useAuth()

  useEffect(() => {
    if (authHook.isLoggedIn && authHook.hasLoaded) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHook.isLoggedIn, authHook.hasLoaded])

  if (!authHook.hasLoaded) return <LoadingComponent />

  if (authHook.isLoggedIn) return null

  return <Fragment>{props.children}</Fragment>
}

export default UnAuthenticatedView
