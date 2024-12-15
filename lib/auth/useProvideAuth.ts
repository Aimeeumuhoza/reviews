import { useEffect, useState } from 'react'
// import useSWR from 'swr'
// import { API_ENDPOINT } from '../../config/constants'

type AuthContextRes = {
  token: string | undefined
  login: (token: string) => void
  logout: () => void
  isLogin: boolean
  isLoading: boolean
}

export const useProvideAuth = (): AuthContextRes => {
  const [token, setToken] = useState<string>()
  const [isLogin, setIsLogin] = useState(!!JSON.parse(localStorage.getItem('isLogin') || ''))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true)

  const login = (token): void => {
    localStorage.setItem('isLogin', 'true')
    setToken(token)
    setIsLogin(true)
  }

  const logout = (): void => {
    localStorage.removeItem('isLogin')
    setToken(undefined)
    setIsLogin(false)
  }

  // //Refresh token for persisting session
  // const { data, error, isValidating } = useSWR(
  //   isLogin ? `${API_ENDPOINT}/refresh-token` : null,
  //   (url) =>
  //     fetch(url, {
  //       credentials: 'include',
  //     }).then((res) => res.json()),
  //   {
  //     // Silently refresh token every expiry time
  //     //TODO sync token expiry with backend
  //     refreshInterval: 1000 * 60 * 15,
  //     revalidateOnFocus: false,
  //   },
  // )

  // useEffect(() => {
  //   if (data) {
  //     login(data.accessToken)
  //   }
  //   if (error) {
  //     logout()
  //   }
  //   setIsLoading(isValidating)
  // }, [data, error, isValidating])

  useEffect(() => {
    // Sync all tabs on login or logout
    window.addEventListener('storage', (e) => {
      if (e.key === 'isLogin') {
        setIsLogin(Boolean(e.newValue))
      }
    })
  })

  return { token: token || '', login, logout, isLogin, isLoading }
}

export default useProvideAuth
