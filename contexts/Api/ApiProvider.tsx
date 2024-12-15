import Axios from 'axios'
import React from 'react'
import { API_ROOT_URL } from '../../config/constants'
import ApiContext from './ApiContext'

/**
 * Context Hook holding api client instance as well some utils
 * @param props
 */
const ApiProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const instance = Axios.create({
    baseURL: API_ROOT_URL,
    withCredentials: true,
  })

  const data = { instance }

  return <ApiContext.Provider value={data}>{props.children}</ApiContext.Provider>
}

export default ApiProvider
