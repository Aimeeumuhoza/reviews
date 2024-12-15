import axios from 'axios'
import { token } from '../api/auth.api'

export const authenticatedFetcher = (url): Promise<any> =>
  axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data)
