import React, { useEffect, useState } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import styles from '../../../styles/Products.module.css'
// import ReviewHistogram from '../ReviewHistogram'
import ReviewRatingItem from './ReviewRatingItem'
import { ProductOption, ProductWithFullDetails } from '../../../types'
import useGetReviewsByProductId from '../../../hooks/api/useGetReviewsByProductId'
import PostReview from '../../PostReview'
import { useAuth } from '../../../contexts/Auth'
import { message } from 'antd'
import useGetProductReviewStatus from '../../../hooks/api/useGetProductReviewStatus'
import useHandleState from '../../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../../lib/utils/error.util'
import { Spin } from 'antd'

type ReviewsProps = {
  product?: ProductWithFullDetails
  productOption: ProductOption | undefined
}

const Reviews: React.FC<ReviewsProps> = (props) => {
  const auth = useAuth()
  const [roundedAverageRating, setRoundedAverageRating] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCheckingReviewStatus, setIsCheckingReviewStatus] = useState(false)
  const getReviewsByProductIdHook = useGetReviewsByProductId()
  const getProductReviewStatusHook = useGetProductReviewStatus()
  const [loadingReviews, setLoadReviews] = useState(false)

  useEffect(() => {
    setLoadReviews(false)
    if (props.product?.id || loadingReviews) {
      getReviewsByProductIdHook.sendRequest(props.product?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.product?.id, loadingReviews])

  useEffect(() => {
    if (props?.product?.averageRating) {
      setRoundedAverageRating(Math.round(props?.product?.averageRating))
    }
  }, [props.product?.averageRating])

  useHandleState<{ canReviewProduct: boolean }>(getProductReviewStatusHook, {
    onSuccess: (response) => {
      const { canReviewProduct } = response.payload
      if (canReviewProduct) {
        setIsModalVisible(true)
      } else {
        message.error(
          "You can not review this item, either because you have already reviewed it, or because you haven't purchased it before",
          8,
        )
      }

      setIsCheckingReviewStatus(false)
    },
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
      setIsCheckingReviewStatus(false)
    },
  })

  const showModal = (): void => {
    if (!auth.isLoggedIn) {
      message.error('You need to be logged in & must have purchased this item before')
      return
    }
    if (props.product?.slug) {
      getProductReviewStatusHook.sendRequest({ slug: props.product?.slug })
      setIsCheckingReviewStatus(true)
    }
  }

  const handleOk = (): void => {
    setIsModalVisible(false)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mabo64">
        <p className="text24 black fowe700 mabo16">REVIEWS</p>
        <Row className="mabo32" align="middle">
          <Col flex="auto">
            {[...Array(5).keys()].map((idx) => {
              if (idx < roundedAverageRating) {
                return <StarIcon className={styles.starIconFilledLarge} />
              } else {
                return <StarBorderIcon className={styles.starIconOutlinedLarge} />
              }
            })}
          </Col>
          <Col flex="none">
            <p className="text12 black fowe700 mabo0">{props?.product?.totalReviews} Reviews</p>
          </Col>
        </Row>

        {/* <ReviewHistogram
          totalReviews={props.product?.totalReviews}
          classifiedRating={props.product?.classifiedRating}
        /> */}
        <button className="btn_primary btn_full mato32" onClick={showModal}>
          {isCheckingReviewStatus ? 'HOLD ON...' : 'REVIEW THIS ITEM'}
        </button>
        <PostReview
          productOption={props.productOption}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setLoading={setLoadReviews}
        />
      </Col>
      <Col xs={24} sm={24} md={2} lg={2} xl={2}></Col>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        {getReviewsByProductIdHook.isLoading || loadingReviews ? (
          <Spin />
        ) : (
          <Row gutter={48}>
            {getReviewsByProductIdHook.items.map((item, idx) => {
              return <ReviewRatingItem key={idx.toString()} item={item} />
            })}
          </Row>
        )}
        <Row className="mato16 mabo32">
          <Col flex="auto">
            {!getReviewsByProductIdHook.hasReachedEnd && (
              <button
                disabled={getReviewsByProductIdHook.isLoading}
                onClick={() => getReviewsByProductIdHook.goToNextPage()}
                className="btn_primary_outlined btn_full">
                {getReviewsByProductIdHook.isLoadingMore ? 'LOADING...' : 'LOAD MORE REVIEWS'}
              </button>
            )}
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Reviews
