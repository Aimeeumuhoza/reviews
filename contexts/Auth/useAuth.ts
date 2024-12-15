import { useContext } from 'react'
import AuthContextData from '../../lib/interfaces/auth-context-data.interface'
import AuthContext from './AuthContext'

/**
 * Context Hook holding api client instance
 */
const useAuth = (): AuthContextData => {
  const context = useContext<AuthContextData>(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContext')
  }

  return context
}

export default useAuth
