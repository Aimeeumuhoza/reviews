import React from 'react'
import AuthenticatedView from '../../components/AuthenticatedView'
import VerifyPayment from '../../components/VerifyPayment'

const index: React.FC = () => {
  return (
    <AuthenticatedView>
      <VerifyPayment />
    </AuthenticatedView>
  )
}

export default index
