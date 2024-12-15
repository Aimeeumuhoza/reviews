import React from 'react'
import { Alert } from 'antd'

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
  console.log(e, 'I was closed.')
}
const CheckoutInfo: React.FC = () => {
  return (
    <div className="mabo32">
      <Alert
        message="Information note"
        description="Dear customer, kindly be informed that your orders will be available within 20 to 30 days"
        type="warning"
        showIcon
        closable
        onClose={onClose}
      />
    </div>
  )
}

export default CheckoutInfo
