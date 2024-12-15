import axios from 'axios'
import React from 'react'
import { API_ROOT_URL } from '../../config/constants'
import ApiContextData from '../../lib/interfaces/api-context-data.interface'

const ApiContext = React.createContext<ApiContextData>({
  instance: axios.create({
    baseURL: API_ROOT_URL,
  }),
})

export default ApiContext
