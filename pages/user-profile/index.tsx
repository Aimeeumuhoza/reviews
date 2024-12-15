import React from 'react'
import AuthenticatedView from '../../components/AuthenticatedView'
import UserProfile from '../../components/UserProfile'

const index: React.FC = () => {
  return (
    <AuthenticatedView>
      <UserProfile />
    </AuthenticatedView>
  )
}

export default index
