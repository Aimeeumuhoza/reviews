import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Space, Spin, Avatar, Button } from 'antd'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import styles from '../../../../styles/Products.module.css'
import useGetAllReviews from '../../../../hooks/api/useGetAllReviews'
import { ReviewRatingItem } from '../../../../types'
import { CloseOutlined } from '@ant-design/icons'

interface ProductRatingProps {
  totalReviews?: number
  averageRating?: number
  ProductName?: string
}

const ProductRating: React.FC<ProductRatingProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [overallAverageRating, setOverallAverageRating] = useState(0)
  const {
    items: reviews,
    isLoading,
    isLoadingMore,
    hasReachedEnd,
    goToNextPage,
    sendRequest,
    meta: Items,
  } = useGetAllReviews()

  useEffect(() => {
    if (reviews.length === 0) {
      sendRequest()
    }
  }, [reviews.length, isModalVisible, sendRequest])

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0)
      const averageRating = totalRating / reviews.length
      setOverallAverageRating(Math.round(averageRating * 10) / 10)
    }
  }, [reviews])

  const roundedOverallRating = Math.round(overallAverageRating)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleLoadMore = () => {
    goToNextPage()
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Space align="center" size="small">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, idx) =>
            idx < roundedOverallRating ? (
              <StarIcon key={idx} className={styles.starIconFilled} />
            ) : (
              <StarBorderIcon key={idx} className={styles.starIconFilled} />
            ),
          )}
        </span>
        <span
          className="text12 fowe700 ant-dropdown-link"
          onClick={showModal}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              showModal()
            }
          }}
          role="button"
          tabIndex={0}
          style={{
            cursor: 'pointer',
            marginLeft: '1px',
            marginRight: '6px',
            textDecoration: 'underline',
          }}>
          {Items.totalItems} Reviews
        </span>
      </Space>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
        closeIcon={<CloseOutlined style={{ fontSize: '20px', color: '#333' }} />}
        style={{ top: 40 }}
        bodyStyle={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto', padding: '0 24px 24px' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#fff',
            zIndex: 1,
            padding: '16px 0',
          }}>
          <h3 className="text32 black fowe700 mabo16" style={{ marginBottom: '16px' }}>
            Ratings and Reviews
          </h3>
          <Space align="center" size="small" style={{ marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(5)].map((_, idx) =>
                idx < roundedOverallRating ? (
                  <StarIcon key={idx} className={styles.starIconFilledLarge} />
                ) : (
                  <StarBorderIcon key={idx} className={styles.starIconOutlinedLarge} />
                ),
              )}
            </span>
            <span className="text21 fowe700 ant-dropdown-link">{Items.totalItems} Reviews</span>
          </Space>
        </div>

        {isLoading ? (
          <Spin />
        ) : reviews.length > 0 ? (
          <>
            {reviews.map((item: ReviewRatingItem, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '24px',
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: '24px',
                }}>
                <Row gutter={[16, 16]} align="top">
                  <Col span={24}>
                    <Space size="middle" align="start">
                      <Avatar
                        src={item.client?.profilePictureImgUrl || '/uzuri_avatar.png'}
                        size={38}
                      />
                      <div>
                        <h1
                          style={{
                            margin: 0,
                            fontSize: '12px',
                          }}>{`${item.client?.firstName} ${item.client?.lastName}`}</h1>
                        <Space size="small" style={{ marginTop: '4px' }}>
                          {[...Array(5)].map((_, idx) =>
                            idx < parseInt(item.rating) ? (
                              <StarIcon key={idx} className={styles.starIconOutlined} />
                            ) : (
                              <StarBorderIcon key={idx} className={styles.starIconOutlined} />
                            ),
                          )}
                        </Space>
                      </div>
                    </Space>
                  </Col>

                  <Col span={24}>
                    <Row gutter={[12, 8]} align="top">
                      {item.productVariation?.imgUrls && item.productVariation.imgUrls.length > 0 && (
                        <Col xs={24} sm={6}>
                          <img
                            src={item.productVariation.imgUrls[0]}
                            alt={item.client?.firstName || 'Product'}
                            className={styles.itemImageReview}
                          />
                          {/* <Col span={15}>{item.product.name}</Col> */}
                        </Col>
                      )}
                      <Col xs={24} sm={item.productVariation?.imgUrls ? 18 : 24}>
                        <h1 className="text14 fowe900 black mabo8">{item.product.name}</h1>
                        <p className="text12 fowe900 black mabo8">{item.title}</p>
                        <p className="text12 black fowe500 mabo16">{item.description}</p>
                        <p className="text10 gray fowe300">
                          {new Date(item.createdOn).toLocaleDateString()}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
            <Row className="mato16 mabo32">
              <Col flex="auto">
                {!hasReachedEnd && (
                  <button
                    disabled={isLoadingMore}
                    onClick={() => handleLoadMore()}
                    className="btn_primary_outlined btn_full">
                    {isLoadingMore ? 'LOADING...' : 'LOAD MORE REVIEWS'}
                  </button>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <p>No reviews available.</p>
        )}
      </Modal>
    </div>
  )
}

export default ProductRating
