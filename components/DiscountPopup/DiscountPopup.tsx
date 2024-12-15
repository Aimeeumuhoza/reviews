// import { Modal } from 'antd';
// import { useState, useEffect } from 'react';

// const DiscountModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
//   visible,
//   onClose,
// }) => {
//   return (
//     <Modal visible={visible} onOk={onClose} onCancel={onClose} footer={null}>
//       <div className="discount_modal_content">
//         <h2>20% Off for New Purchasers!</h2>
//         <p>
//           Welcome! As a new customer, you get 20% off your first purchase. Enjoy shopping with us!
//         </p>
//       </div>
//     </Modal>
//   )
// }

import React, { useState, useEffect, ReactNode } from 'react'
import style from '../../styles/DiscountPopup.module.css' // Assuming you have a CSS module for styles

interface DiscountPopupProps {
  onClose: () => void
  children?: ReactNode
}
const DiscountPopup: React.FC<DiscountPopupProps> = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(true)

  const closePopup = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false) // Auto-close the popup after 10 seconds
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={style.popupContainer}>
      <div className={style.popupContent}>
        <h2>20% Off for New Purchasers!</h2>
        {/* <p>Enjoy a 20% discount on your first purchase. Dont miss out!</p> */}
        <button className={style.closeButton} onClick={closePopup}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default DiscountPopup
