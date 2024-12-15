import { useContext } from 'react'
import ApiContextData from '../../lib/interfaces/api-context-data.interface'

import ApiContext from './ApiContext'

/**
 * Context Hook holding api client instance
 */
const useApi = (): ApiContextData => {
  const context = useContext<ApiContextData>(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within an FarmerFormContext')
  }

  return context
}

export default useApi
