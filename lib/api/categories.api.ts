import axios from 'axios'
import { err, ok } from 'neverthrow'
import { BASE_API_URL } from '../../config/constants'
import { getApiErrorMessage } from './helper'

export const addProductType = async (productType) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/product-types`, productType)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    return err({
      errorMsg: error ? error : 'an unexpected error happened',
    })
  }
}
export const addCategory = async (category) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/categories`, category)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    return err({
      errorMsg: error ? error : 'an unexpected error happened',
    })
  }
}
export const editCategory = async (category, id) => {
  try {
    const res = await axios.put(`${BASE_API_URL}/categories/${id}`, category)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    return err({
      errorMsg: error ? error : 'an unexpected error happened',
    })
  }
}

export const updateProductTypeVisibility = async (typeIds: number[], visibility: boolean) => {
  try {
    if (Array.isArray(typeIds) && !(typeIds.length > 0))
      throw new Error('the provided product ids are')

    const idQuery = typeIds.reduceRight((acc, curr) => `ids=${curr}&${acc}`, '')

    const res = await axios.put(
      `${BASE_API_URL}/product-types/visibility-status?${idQuery}isVisible=${visibility}`,
    )

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    return err({
      errorMsg: error ? error : 'an unexpected error happened',
    })
  }
}

export const deleteProductTypes = async (typeIds: number[]) => {
  try {
    if (Array.isArray(typeIds) && !(typeIds.length > 0))
      throw new Error('the provided product ids are')

    const idQuery = typeIds.reduceRight((acc, curr) => `ids=${curr}&${acc}`, '')

    const idQueryTrimmed = idQuery.substring(0, idQuery.length - 1)

    const res = await axios.delete(`${BASE_API_URL}/product-types?${idQueryTrimmed}`)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    return err({
      errorMsg: error ? getApiErrorMessage(error) : 'an unexpected error happened',
    })
  }
}

export const editProductType = async (productType, id) => {
  try {
    const res = await axios.put(`${BASE_API_URL}/product-types/${id}`, productType)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    return err({
      errorMsg: error ? error : 'an unexpected error happened',
    })
  }
}
