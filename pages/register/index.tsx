import React from 'react'
import Register from '../../components/Register'
import UnAuthenticatedView from '../../components/UnAuthenticatedView'

const index: React.FC = () => {
  return (
    <UnAuthenticatedView>
      <Register />
    </UnAuthenticatedView>
  )
}

export default index
