import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Formik, FormikProps } from 'formik'
import styles from '../../styles/Products.module.css'
import Input from 'antd/lib/input'
import { ProductOption, ReviewDto } from '../../types'
import {
  reviewItemInitialValues,
  // reviewItemValidationSchema,
} from '../../lib/validation/review-item.validation'
import { Form, message } from 'antd'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import useReviewProduct from '../../hooks/api/useReviewProduct'
import useHandleState from '../../hooks/useHandleState'

type PostReviewProps = {
  isModalVisible: boolean
  handleOk: () => void
  handleCancel: () => void
  productOption: ProductOption | undefined
  setLoading: Dispatch<SetStateAction<boolean>>
}
const { TextArea } = Input

const PostReview: React.FC<PostReviewProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  productOption,
  setLoading,
}) => {
  const reviewProductHook = useReviewProduct()
  const formikRef = useRef<FormikProps<ReviewDto>>(null)

  useEffect(() => {
    return () => setLoading(true)
  }, [])

  useHandleState(reviewProductHook, {
    onSuccess: () => {
      message.success('Item reviewed successfully')
      setLoading(true)
      handleOk()
      formikRef.current?.resetForm()
    },
    onError: (error) => {
      message.error(error)
    },
  })

  return (
    <>
      <Modal
        title={
          <Row>
            <Col span={24} className="text-left mato16">
              <p className="text16 black fowe700  mabo0">ADD REVIEW</p>
            </Col>
          </Row>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <Formik
          innerRef={formikRef}
          initialValues={reviewItemInitialValues}
          // validationSchema={reviewItemValidationSchema}
          onSubmit={(formData) => {
            if (productOption?.id) {
              reviewProductHook.sendRequest({ id: productOption?.id, data: formData })
            } else {
              message.error("Oops, looks like we can't find the product you are trying to review")
            }
          }}>
          {(formikProps) => (
            <div className="pad16">
              <Row className="mabo16">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'rating')}
                    help={getHelp(formikProps, 'rating')}>
                    <p className="text12 black fowe700 mabo8">Ratings</p>
                    {[...Array(5).keys()].map((idx) => {
                      if (idx < formikProps.values?.rating) {
                        return (
                          <StarIcon
                            onClick={() => {
                              formikProps.setFieldValue('rating', idx + 1)
                            }}
                            style={{ cursor: 'pointer' }}
                            className={styles.starIconFilledLarge}
                          />
                        )
                      } else {
                        return (
                          <StarBorderIcon
                            onClick={() => {
                              formikProps.setFieldValue('rating', idx + 1)
                            }}
                            style={{ cursor: 'pointer' }}
                            className={styles.starIconOutlinedLarge}
                          />
                        )
                      }
                    })}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mabo16">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="text12 black fowe700 mabo8">Title</p>
                  <Form.Item
                    // validateStatus={getValidationStatus(formikProps, 'title')}
                    help={getHelp(formikProps, 'title')}>
                    <Input
                      value={formikProps.values.title}
                      onChange={formikProps.handleChange('title')}
                      placeholder="Title"
                      className="my_input"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mabo32">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="text12 black fowe700 mabo8">Review</p>
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'description')}
                    help={getHelp(formikProps, 'description')}>
                    <TextArea
                      value={formikProps.values.description}
                      onChange={formikProps.handleChange('description')}
                      placeholder="Review"
                      className="my_input"
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center" className="mabo16">
                <Col flex="none">
                  <button
                    disabled={reviewProductHook.isLoading}
                    className="btn_primary_large"
                    onClick={() => {
                      formikProps.handleSubmit()
                    }}>
                    {reviewProductHook.isLoading ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </Col>
              </Row>
              <Row justify="center" className="mabo16">
                <Col flex="none">
                  <button
                    className="btn_link_dark"
                    onClick={() => {
                      handleCancel()
                    }}>
                    Discard
                  </button>
                </Col>
              </Row>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default PostReview
