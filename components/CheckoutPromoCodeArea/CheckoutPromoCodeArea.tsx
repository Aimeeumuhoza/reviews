import React, { Fragment } from 'react'
import { Formik } from 'formik'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import {
  promoCodeInitialValues,
  promoCodeValidationSchema,
} from '../../lib/validation/promo-code.validation'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import useCheckPromoCodeValidity from '../../hooks/api/useCheckPromoCodeValidity'
import { PromoCode } from '../../types'
import useHandleState from '../../hooks/useHandleState'
import { message } from 'antd'

type CheckoutPromoCodeAreaProps = {
  onPromoFound: (promoCode: PromoCode) => void
}

const CheckoutPromoCodeArea: React.FC<CheckoutPromoCodeAreaProps> = (props) => {
  const checkPromoCodeValidityHook = useCheckPromoCodeValidity()

  useHandleState<PromoCode>(checkPromoCodeValidityHook, {
    onSuccess: (response) => {
      props.onPromoFound(response.payload)
    },
    onError: (error) => {
      message.error(error)
    },
  })

  return (
    <Formik
      initialValues={promoCodeInitialValues}
      validationSchema={promoCodeValidationSchema}
      onSubmit={({ promoCode }) => {
        checkPromoCodeValidityHook.sendRequest(promoCode)
      }}>
      {(formikProps) => (
        <Fragment>
          <p className="text14 black fowe700 text-uppercase mabo32">
            PROMO CODES and voucher codes
          </p>
          <Form.Item
            name="email"
            validateStatus={getValidationStatus(formikProps, 'promoCode')}
            help={getHelp(formikProps, 'promoCode')}>
            <Row gutter={16} align="middle" wrap={false}>
              <Col flex="none">
                <span className="text12 black fowe700">Voucher Code : </span>
              </Col>
              <Col flex="auto">
                <Input
                  value={formikProps.values.promoCode}
                  className="my_input"
                  placeholder="Enter Code here"
                  size="small"
                  onChange={formikProps.handleChange('promoCode')}
                />
              </Col>
              <Col flex="none">
                <button
                  disabled={checkPromoCodeValidityHook.isLoading}
                  onClick={() => {
                    formikProps.handleSubmit()
                  }}
                  className="btn_primary_large btn_small">
                  {checkPromoCodeValidityHook.isLoading ? 'CHECKING...' : 'APPLY'}
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Fragment>
      )}
    </Formik>
  )
}

export default CheckoutPromoCodeArea
