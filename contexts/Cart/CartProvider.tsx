import React, { useEffect, useState } from 'react'
import { DiscountType } from '../../lib/enums/discount-type.enum'
import { getHourDiff, isBetweenDates } from '../../lib/utils/date.util'
import { getDiscountEquivalent } from '../../lib/utils/number.util'
import { CartItem } from '../../types'
import CartContext from './CartContext'

const CART_LOCAL_STORAGE_KEY = 'UZURI_CART_ITEMS'
const CART_UPDATED_DATE_LOCAL_STORAGE_KEY = 'CART_UPDATED_DATE'

/**
 * Context Hook holding api client instance as well some utils
 * @param props
 */
const CartProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [hasLoadedItemFromCache, setHasLoadedItemFromCache] = useState<boolean>(false)

  useEffect(() => {
    if (!hasLoadedItemFromCache) {
      try {
        const parsedCartItems = JSON.parse(localStorage?.getItem(CART_LOCAL_STORAGE_KEY) || '[]')
        const cartLastUpdatedAt = JSON.parse(
          localStorage?.getItem(CART_UPDATED_DATE_LOCAL_STORAGE_KEY) || '[]',
        )
        const hourDiff = getHourDiff(new Date(cartLastUpdatedAt), new Date())

        if (hourDiff < 1) {
          setCartItems(parsedCartItems)
        } else {
          setCartItems([])
        }
        setHasLoadedItemFromCache(true)
      } catch (error) {
        setCartItems([])
        setHasLoadedItemFromCache(true)
      }
    }
  }, [hasLoadedItemFromCache])

  const addToCart = (item: CartItem): void => {
    if (cartItems.length > 9) {
      throw new Error('Cart has reached limit')
    }
    const newCartItemsArr = [...cartItems, item]
    setCartItems(newCartItemsArr)
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCartItemsArr))
    localStorage.setItem(CART_UPDATED_DATE_LOCAL_STORAGE_KEY, JSON.stringify(new Date()))
  }

  const removeFromCart = (idxToRemove: number): void => {
    const newCartItemsArr = cartItems.filter((_, idx) => idx !== idxToRemove)
    setCartItems(newCartItemsArr)
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCartItemsArr))
    localStorage.setItem(CART_UPDATED_DATE_LOCAL_STORAGE_KEY, JSON.stringify(new Date()))
  }

  const removeAllFromCart = (): void => {
    setCartItems([])
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify([]))
    localStorage.setItem(CART_UPDATED_DATE_LOCAL_STORAGE_KEY, JSON.stringify(new Date()))
  }

  const getCartTotal = (): number => {
    let sum = 0
    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i]

      const orderAmount = isBetweenDates(
        new Date(),
        new Date(cartItem.product?.discountActivationDate || ''),
        new Date(cartItem.product?.discountExpirationDate || ''),
      )
        ? getDiscountEquivalent(
            cartItem.product?.amount || 0,
            cartItem.product?.discountAmount || 0,
            cartItem.product?.discountType || DiscountType.AMOUNT,
          ) || 0
        : cartItem.product?.amount

      sum += cartItem.orderedQuantity * (orderAmount || 1)
    }

    return +sum.toFixed(0)
  }

  const getCartWeight = (): number => {
    let totalWeight = 0
    cartItems.forEach((cartItem) => {
      if (
        cartItem.product?.classification === 'BAG' ||
        cartItem.product?.classification === 'SHOE'
      ) {
        totalWeight += cartItem.orderedQuantity * 0.5
      } else if (
        cartItem.product?.classification === 'GIFT_CARD' ||
        cartItem.product?.classification === 'SHIRT'
      ) {
        totalWeight += 0
      } else {
        throw new Error('Could not find classification of product')
      }
    })

    return totalWeight
  }

  const data = {
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    getCartTotal,
    getCartWeight,
  }

  return <CartContext.Provider value={data}>{props.children}</CartContext.Provider>
}

export default CartProvider
