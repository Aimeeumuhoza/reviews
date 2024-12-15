import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TopNavBar = () => {
  const [showNewPurchaserMessage, setShowNewPurchaserMessage] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNewPurchaserMessage((prev) => !prev)
    }, 3000) // Switch message every 5 seconds

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="topheader">
      <Row className="justify-content-center header_top">
        <Col xs={12} sm={6} md={6} lg={6} xl={6} className="text-center">
          <div className="fowee700">
            <p className="mx-auto">
              {showNewPurchaserMessage ? (
                <span>🎉10% off on first order</span>
              ) : (
                <span className="animatedText">Free delivery on orders over $100!</span>
              )}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TopNavBar
