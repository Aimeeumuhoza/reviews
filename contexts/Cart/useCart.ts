import { useContext } from 'react'

import CartContext, { CartContextData } from './CartContext'

/**
 * Context Hook holding api client instance
 */
const useCart = (): CartContextData => {
  const context = useContext<CartContextData>(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within an FarmerFormContext')
  }

  return context
}

export default useCart
