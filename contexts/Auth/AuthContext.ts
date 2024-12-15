import React from 'react'
import AuthContextData from '../../lib/interfaces/auth-context-data.interface'

const AuthContext = React.createContext<AuthContextData>({
  isLoggedIn: false,
  loggedInUser: undefined,
  hasLoaded: false,
  setApiAccessToken: (accessToken) => {
    return accessToken
  },
  logoutUserLocally: () => {
    return
  },
})

export default AuthContext
