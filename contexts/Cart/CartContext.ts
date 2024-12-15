import React from 'react'
import { CartItem } from '../../types'

export type CartContextData = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (idx: number) => void
  removeAllFromCart: () => void
  getCartTotal: () => number
  getCartWeight: () => number
}

const CartContext = React.createContext<CartContextData>({
  cartItems: [],
  addToCart: (item) => {
    // console.log(item,'dataas')
    return item
  },
  removeFromCart: (item) => {
    return item
  },
  removeAllFromCart: () => {
    return
  },
  getCartTotal: () => {
    return 0
  },
  getCartWeight: () => {
    return 0
  },
})

export default CartContext
