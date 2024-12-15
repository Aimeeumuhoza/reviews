import React from 'react'
import Checkout from '../../components/Checkout'
import AuthenticatedView from '../../components/AuthenticatedView'

const Index: React.FC = () => {
  return (
    <AuthenticatedView>
      <Checkout />
    </AuthenticatedView>
  )
}

export default Index
