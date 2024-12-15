/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import useSWR from 'swr'
import { BASE_API_URL } from '../../config/constants'
import { Fabric, PaginationQeury } from '../../types'
import { token } from '../api/auth.api'

const authenticatedFetcher = (url): Promise<any> =>
  axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data)

const all = (query: PaginationQeury) => {
  const limit = query.limit ? query.limit : 20
  const page = query.page ? query.page : 1
  const { data, error, mutate } = useSWR(
    `${BASE_API_URL}/fabrics?limit=${limit}&page=${page}`,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      initialData: { fabrics: [], totalItems: 0, isLoading: false, isError: false },
    },
  )

  return {
    fabrics: data?.payload?.data as Fabric[],
    totalItems: data?.payload?.meta?.totalItems,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default { all }
