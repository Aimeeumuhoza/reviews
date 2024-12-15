import axios from 'axios'
import { err, ok } from 'neverthrow'
import { BASE_API_URL } from '../../config/constants'
import { LoginDTO, User } from '../../types'
import { getApiErrorMessage } from './helper'

export let token = undefined

export const isAuth = (): boolean => token !== undefined

export const logout = (): void => {
  token = undefined
}

export const handleAdminLogin = async (loginData: LoginDTO) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/administrator/login`, loginData)

    const { user, message, payload } = res.data

    token = payload

    return ok({
      user: user as User,
      message,
      token,
    })
  } catch (error) {
    return err({
      errorMsg: getApiErrorMessage(error),
    })
  }
}

export const handlePasswordReset = async (email: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/password/reset`, { email })

    const { user, message, payload } = res.data

    token = payload

    return ok({
      user: user as User,
      message,
    })
  } catch (error) {
    return err({
      errorMsg: getApiErrorMessage(error),
    })
  }
}
