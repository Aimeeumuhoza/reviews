/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'
import { BASE_API_URL } from '../../config/constants'
import { Category, PaginationQeury } from '../../types'
import { authenticatedFetcher } from './helper'

//TODO generic type hook return
const all = (query: PaginationQeury) => {
  const limit = query.limit ? query.limit : 20
  const page = query.page ? query.page : 1
  const { data, error, mutate } = useSWR(
    `${BASE_API_URL}/categories?limit=${limit}&page=${page}`,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      initialData: { categories: [], totalItems: 0, isLoading: false, isError: false },
    },
  )

  return {
    categories: data?.payload?.data as Category[],
    totalItems: data?.payload?.meta?.totalItems,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default { all }
