/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'
import { BASE_API_URL } from '../../config/constants'
import { PaginationQeury, Product, ProductVariantSearchRes, SeachQuery } from '../../types'
import { authenticatedFetcher } from './helper'

//TODO generic type hook return
const all = (query: PaginationQeury) => {
  const limit = query.limit ? query.limit : 20
  const page = query.page ? query.page : 1
  const { data, error, mutate, isValidating } = useSWR(
    `${BASE_API_URL}/products?limit=${limit}&page=${page}`,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      initialData: { products: [], isLoading: false, isError: false },
    },
  )

  return {
    products: data?.payload?.data as Product[],
    totalItems: data?.payload?.meta?.totalItems,
    isLoading: isValidating || (!error && !data),
    isError: error,
    mutate,
  }
}

const withID = (slug: string) => {
  const { data, error, mutate, isValidating } = useSWR(
    `${BASE_API_URL}/products/${slug}`,
    authenticatedFetcher,
    {
      revalidateOnFocus: true,
      initialData: { product: {}, isLoading: true },
    },
  )

  return {
    product: data?.payload as Product,
    isLoading: isValidating || (!error && !data),
    isError: error,
    mutate,
  }
}

const search = (query: SeachQuery) => {
  // const limit = query.limit ? query.limit : 20
  // const page = query.page ? query.page : 1
  const { data, error, mutate, isValidating } = useSWR(
    `${BASE_API_URL}/products/variations/search${query.queryStr}`,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      initialData: { products: [], isLoading: false, isError: false },
    },
  )

  return {
    products: data?.payload?.data as ProductVariantSearchRes[],
    totalItems: data?.payload?.meta?.totalItems,
    isLoading: isValidating || (!error && !data),
    isError: error,
    mutate,
  }
}

export default { all, withID, search }
