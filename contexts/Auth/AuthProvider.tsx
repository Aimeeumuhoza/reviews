import React, { useEffect, useState } from 'react'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import jwtDecode from 'jwt-decode'
import AuthContext from './AuthContext'
import { useApi } from '../Api'
import { User } from '../../types'
import useGetProfile from '../../hooks/api/useGetProfile'
import useHandleState from '../../hooks/useHandleState'

/**
 * Context Hook holding api client instance as well some utils
 * @param props
 */
const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const api = useApi()
  const getProfileHook = useGetProfile()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refreshAuthLogic = async (failedRequest: Record<string, any>): Promise<void> => {
    return api.instance
      .get(`/api/v1/auth/refresh-token`)
      .then((res) => {
        const newAccessToken = res?.data.payload.accessToken
        failedRequest.response.config.headers.Authorization = 'Bearer ' + newAccessToken
        return Promise.resolve()
      })
      .catch(() => {
        setIsLoggedIn(false)
        localStorage.setItem('WAS_LOGGED_IN', JSON.stringify(false))
      })
  }

  createAuthRefreshInterceptor(api.instance, refreshAuthLogic)

  /**
   * Adds access token to api client's headers
   * @param accessToken api's access token
   */
  const setApiAccessToken = (accessToken: string): void => {
    const { user }: { user: User } = jwtDecode(accessToken)
    setLoggedInUser(user)
    setIsLoggedIn(true)
    api.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  }

  const wasUserLoggedBefore = (): boolean => {
    try {
      return JSON.parse(localStorage.getItem('WAS_LOGGED_IN') || 'false')
    } catch (error) {
      return false
    }
  }

  const logoutUserLocally = (): void => {
    setIsLoggedIn(false)
    setLoggedInUser(undefined)
    delete api.instance.defaults.headers.common['Authorization']
  }

  useEffect(() => {
    if (wasUserLoggedBefore()) {
      getProfileHook.sendRequest()
    } else {
      setHasLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useHandleState<User>(getProfileHook, {
    onSuccess: (response) => {
      setLoggedInUser(response.payload)
      setIsLoggedIn(true)
      setHasLoaded(true)
    },
    onError: () => {
      setHasLoaded(true)
    },
  })

  const data = {
    isLoggedIn,
    loggedInUser,
    setApiAccessToken,
    hasLoaded,
    logoutUserLocally,
    setLoggedInUser,
  }

  return <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
}

export default AuthProvider
