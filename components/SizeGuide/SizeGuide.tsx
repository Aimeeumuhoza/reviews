import React, { Fragment, useRef, useState } from 'react'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import styles from '../../styles/SizeGuide.module.css'
import Radio from 'antd/lib/radio'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import { Formik, FormikProps } from 'formik'
import {
  sizeGuideInitialValues,
  sizeGuideValidationSchema,
} from '../../lib/validation/size-guide.validation'
import { Form } from 'antd'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import { convertToEUShoeSize } from '../../lib/utils/size-guide.util'
import { MeasurementUnit } from '../../types'

const { Option } = Select
const SizeGuide = ({ isModalVisible, handleOk, handleCancel, showModal }) => {
  const [footType, setFootType] = useState('Normal')
  const [recommendedSize, setRecommendedSize] = useState<number>()
  const formikRef =
    useRef<FormikProps<{ footSize: number | undefined; measurementUnit: MeasurementUnit }>>(null)
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false)
  const [isThirdModalVisible, setIsThirdModalVisible] = useState(false)

  const showSecondModal = () => {
    setIsSecondModalVisible(true)
  }

  const handleSecondModalOk = () => {
    setIsSecondModalVisible(false)
  }

  const handleSecondModalCancel = () => {
    setIsSecondModalVisible(false)
  }
  const showThirdModal = () => {
    setIsThirdModalVisible(true)
  }

  const handleThirdModalOk = () => {
    setIsThirdModalVisible(false)
  }

  const handleThirdModalCancel = () => {
    setIsThirdModalVisible(false)
  }

  return (
    <>
      <Modal
        title={
          <Row>
            <Col span={24} className="text-center mato16">
              <p className="text14 black fowe700  mabo0">FOOT TYPE</p>
              <p className="text12 gray fowe300 mabo0">Choose your foot type</p>
            </Col>
          </Row>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <div className="pad16">
          <Row justify="center" className="mabo32">
            <Col flex="none">
              <Radio.Group
                onChange={(e) => setFootType(e.target.value)}
                name="radiogroup"
                defaultValue={'Normal'}>
                <Row gutter={16} justify="center">
                  <Col flex="none">
                    <img alt="sss" src="/foot1.jpg" className={styles.footTypeImg} />
                    <br />
                    <Radio value="Narrow" className="text12 black fowe700">
                      Narrow
                    </Radio>
                  </Col>
                  <Col flex="none">
                    <img src="/foot2.png" alt="sss" className={styles.footTypeImg} />
                    <br />
                    <Radio value="Normal" className="text12 black fowe700">
                      Normal
                    </Radio>
                  </Col>
                  <Col flex="none">
                    <img src="/foot3.jpg" alt="sss" className={styles.footTypeImg} />
                    <br />
                    <Radio value="Wide" className="text12 black fowe700">
                      Wide
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
          </Row>
          <Row justify="center" className="mabo32">
            <Col flex="none">
              <button
                className="btn_primary_large"
                onClick={() => {
                  handleCancel()
                  showSecondModal()
                }}>
                NEXT
              </button>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal
        title={
          <Row className="mabo0">
            <Col span={24} className="text-center mato16">
              <p className="text14 black fowe700  mabo8">FOOT LENGTH</p>
              <p className="text12 gray fowe300 mabo0">
                Find a ruler and measure your foot length from the tip <br />
                of your long toe to the end of your foot.
              </p>
            </Col>
          </Row>
        }
        visible={isSecondModalVisible}
        onOk={handleSecondModalOk}
        onCancel={handleSecondModalCancel}
        footer={null}>
        <div className="pad16">
          <Formik
            innerRef={formikRef}
            initialValues={sizeGuideInitialValues}
            validationSchema={sizeGuideValidationSchema}
            onSubmit={({ footSize, measurementUnit }) => {
              const convertedSize = convertToEUShoeSize(footSize || 1, measurementUnit)
              if (footType === 'Normal') {
                setRecommendedSize(convertedSize - 0.5)
              } else if (footType === 'Narrow') {
                setRecommendedSize(convertedSize - 0.5)
              } else if (footType === 'Wide') {
                setRecommendedSize(convertedSize)
              }
              handleSecondModalCancel()
              showThirdModal()
            }}>
            {(formikProps) => (
              <Fragment>
                <Row className="mabo32">
                  <Col
                    flex="auto"
                    style={{
                      background: 'url(/measure.jpg)',
                      height: '180px',
                      backgroundPosition: 'bottom',
                      backgroundSize: 'cover',
                      borderRadius: '4px',
                    }}></Col>
                </Row>
                <Row className="mabo32">
                  <Col flex="auto">
                    <Form.Item
                      name="footSize"
                      validateStatus={getValidationStatus(formikProps, 'footSize')}
                      help={getHelp(formikProps, 'footSize')}>
                      <Input
                        value={formikProps.values.footSize}
                        onChange={formikProps.handleChange('footSize')}
                        className={styles.foot_length}
                        placeholder="Your foot length"
                        suffix={
                          <Select
                            value={formikProps.values.measurementUnit}
                            bordered={false}
                            className={styles.select_after}
                            showArrow={false}
                            onChange={(u) => formikProps.setFieldValue('measurementUnit', u)}>
                            <Option value="CM">cm</Option>
                            <Option value="IN">inch</Option>
                          </Select>
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center" className="mabo16">
                  <Col flex="none">
                    <button
                      className="btn_primary_large"
                      onClick={() => formikProps.handleSubmit()}>
                      NEXT
                    </button>
                  </Col>
                </Row>
              </Fragment>
            )}
          </Formik>
          <Row justify="center" className="mabo16">
            <Col flex="none">
              <button
                className="btn_link_dark"
                onClick={() => {
                  showModal()
                  handleSecondModalCancel()
                }}>
                Back
              </button>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal
        title={
          <Row className="mabo0">
            <Col span={24} className="text-center mato16">
              <p className="text14 black fowe700  mabo8">YOUR SHOE SIZE</p>
              <p className="text12 gray fowe300 mabo0">
                Below are the shoe size options we think
                <br /> might fit you
              </p>
            </Col>
          </Row>
        }
        visible={isThirdModalVisible}
        onOk={handleThirdModalOk}
        onCancel={handleThirdModalCancel}
        footer={null}>
        <div className="pad16">
          <Row gutter={16} justify="center" align="bottom" className="mabo32">
            <Col flex="none">
              <div
                style={{
                  border: '1px solid #D0D8E8',
                  textAlign: 'center',
                  padding: '16px 8px',
                  borderRadius: '4px',
                }}>
                <p className="text10 gray fowe500 mabo0">EU</p>
                <p className="text36 gray fowe700 mabo0">{(recommendedSize || 1) - 1}</p>
                <p className="text10 black fowe700 mabo0">Second Option</p>
              </div>
            </Col>
            <Col flex="none">
              <div
                style={{
                  border: '1px solid #D0D8E8',
                  textAlign: 'center',
                  padding: '16px 16px',
                  borderRadius: '4px',
                }}>
                <p className="text10 gray fowe500 mabo0">EU</p>
                <p className="text48 black fowe900 mabo0">{recommendedSize}</p>
                <p className="text10 black fowe700 mabo0">Best Option</p>
              </div>
            </Col>
            <Col flex="none">
              <div
                style={{
                  border: '1px solid #D0D8E8',
                  textAlign: 'center',
                  padding: '16px 8px',
                  borderRadius: '4px',
                }}>
                <p className="text10 gray fowe500 mabo0">EU</p>
                <p className="text36 gray fowe700 mabo0">{(recommendedSize || 1) + 0.5}</p>
                <p className="text10 black fowe700 mabo0">Third Option</p>
              </div>
            </Col>
          </Row>
          <Row justify="center" className="mabo16">
            <Col flex="none">
              <button
                className="btn_primary_large"
                onClick={() => {
                  handleThirdModalCancel()
                }}>
                CONTINUE SHOPPING
              </button>
            </Col>
          </Row>
          <Row justify="center" className="mabo16">
            <Col flex="none">
              <button
                className="btn_link_dark"
                onClick={() => {
                  showSecondModal()
                  handleThirdModalCancel()
                }}>
                Back
              </button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default SizeGuide
