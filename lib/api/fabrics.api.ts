import axios from 'axios'
import { err, ok } from 'neverthrow'
import { BASE_API_URL } from '../../config/constants'
import { getApiErrorMessage } from './helper'

export const addFabric = async (fabric) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/fabrics`, fabric)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    console.error('err', error)
    const msg = getApiErrorMessage(error)
    return err({
      errorMsg: msg ? msg : 'an unexpected error happened',
    })
  }
}
export const editFabric = async (fabric, id) => {
  try {
    const res = await axios.put(`${BASE_API_URL}/fabrics/${id}`, fabric)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    const msg = getApiErrorMessage(error)
    return err({
      errorMsg: msg ? msg : 'an unexpected error happened',
    })
  }
}
export const updateFabricStockStatus = async (fabric, isInStock) => {
  try {
    const res = await axios.put(
      `${BASE_API_URL}/fabrics/${fabric.id}/stock-status?isInStock=${isInStock}`,
    )

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    const msg = getApiErrorMessage(error)
    return err({
      errorMsg: msg ? msg : 'an unexpected error happened',
    })
  }
}
export const updateFabricVisibility = async (fabric, isVisible) => {
  try {
    const res = await axios.put(
      `${BASE_API_URL}/fabrics/${fabric.id}/visibility-status?isVisible=${isVisible}`,
    )

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    const msg = getApiErrorMessage(error)
    return err({
      errorMsg: msg ? msg : 'an unexpected error happened',
    })
  }
}

export const deleteFabric = async (fabricId: number) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/fabrics/${fabricId}`)

    const { message, results } = res.data

    return ok({
      results,
      message,
    })
  } catch (error) {
    return err({
      errorMsg: error ? getApiErrorMessage(error) : 'an unexpected error happened',
    })
  }
}
