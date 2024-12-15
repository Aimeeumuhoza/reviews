import React from 'react'
import { ImpulseSpinner } from 'react-spinners-kit'

const LoadingComponent: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <ImpulseSpinner frontColor="#000" backColor="#fff" />
      <br />
      <span className="gray text14 fowe500">LOADING...</span>
    </div>
  )
}

export default LoadingComponent
