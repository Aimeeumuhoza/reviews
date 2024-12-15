import React, { Fragment, useEffect, useRef, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Image from 'antd/lib/image'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import HTMLParser from 'html-react-parser'
import { CartItem, ProductOption, ProductWithFullDetails } from '../../types'
// import useConvertCurrency from '../../contexts/CurrencyConversion/useConvertCurrency'
import { Formik, FormikProps } from 'formik'
import {
  addToCartInitialValues,
  addToCartValidationSchema,
} from '../../lib/validation/add-to-cart.validation'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import PhoneNumberInput from '../PhoneNumberInput'
import useSaveItemToWishlist from '../../hooks/api/useSaveItemToWishlist'
import { useAuth } from '../../contexts/Auth'
import { useRouter } from 'next/router'
import { useCart } from '../../contexts/Cart'
import { message } from 'antd'
import useHandleState from '../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../lib/utils/error.util'

type GiftCardsViewProp = {
  product: ProductWithFullDetails | undefined
  selectedProductOption: ProductOption | undefined
}

const GiftCards: React.FC<GiftCardsViewProp> = (props) => {
  const router = useRouter()
  const authHook = useAuth()
  const cartHook = useCart()
  // const convertCurrencyHook = useConvertCurrency()
  const saveItemToWishlistHook = useSaveItemToWishlist()
  const [selectedProductOption, setSelectedProductOption] = useState(props.selectedProductOption)
  const formikRef = useRef<
    FormikProps<{
      orderedQuantity: number | undefined
      giftRecipientEmail?: string
      giftRecipientPhoneNumber?: string
      giftEmailBody?: string
      giftBenefactorName?: string
    }>
  >(null)

  useEffect(() => {
    if (props.selectedProductOption) {
      setSelectedProductOption(props.selectedProductOption)
    }
  }, [props.selectedProductOption])

  useHandleState(saveItemToWishlistHook, {
    onSuccess: (response) => {
      message.success(response.message)
    },
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
  })

  return (
    <Fragment>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Image
          src={selectedProductOption?.imgUrls[0]}
          style={{
            height: '536px',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '4px',
          }}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <p className="text24 fowe900 black mabo8">{props.product?.name}</p>
        <p className="text14 fowe900 black mabo32">{props.product?.amount || 0} USD</p>
        <p className="text12 fowe700 black mabo8">Description</p>
        <p className="text12 fowe500 gray mabo32">{HTMLParser(props.product?.description || '')}</p>
        <p className="text12 fowe700 black mabo8">Recipient details</p>
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={addToCartInitialValues(props.product?.classification)}
          validationSchema={addToCartValidationSchema(props.product?.classification)}
          onSubmit={(formikData) => {
            const cartItem: CartItem = {
              product: props.product as ProductWithFullDetails,
              productOption: selectedProductOption,
              productOptionId: selectedProductOption?.id,
              orderedQuantity: formikData.orderedQuantity || 0,
              giftBenefactorName: formikData.giftBenefactorName,
              giftEmailBody: formikData.giftEmailBody,
              giftRecipientEmail: formikData.giftRecipientEmail,
            }

            try {
              cartHook.addToCart(cartItem)
              formikRef.current?.resetForm()
              message.success('Item added to cart')
            } catch (error) {
              message.error(error.message)
            }
          }}>
          {(formikProps) => (
            <Fragment>
              {/* {console.log(formikProps.errors)} */}
              <Row gutter={16} className="mabo32">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'giftBenefactorName')}
                    help={getHelp(formikProps, 'giftBenefactorName')}>
                    <Input
                      value={formikProps.values.giftBenefactorName}
                      className="my_input"
                      placeholder="Name"
                      onChange={formikProps.handleChange('giftBenefactorName')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mabo32">
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'giftRecipientEmail')}
                    help={getHelp(formikProps, 'giftRecipientEmail')}>
                    <Input
                      value={formikProps.values.giftRecipientEmail}
                      className="my_input"
                      placeholder="Email"
                      onChange={formikProps.handleChange('giftRecipientEmail')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'giftRecipientPhoneNumber')}
                    help={getHelp(formikProps, 'giftRecipientPhoneNumber')}>
                    <PhoneNumberInput
                      defaultPhoneNumber={formikProps.values.giftRecipientPhoneNumber}
                      placeholder="Phone number"
                      onChange={(phoneNumber) => {
                        formikProps.setFieldValue('giftRecipientPhoneNumber', `+${phoneNumber}`)
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mabo32">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="text12 fowe700 mabo8">Message</p>
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'giftEmailBody')}
                    help={getHelp(formikProps, 'giftEmailBody')}>
                    <Input.TextArea
                      value={formikProps.values.giftEmailBody}
                      onChange={formikProps.handleChange('giftEmailBody')}
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={32}>
                <Col flex="none">
                  <Button
                    className="btn_primary_large"
                    disabled={!selectedProductOption?.isInStock}
                    onClick={() => {
                      formikProps.handleSubmit()
                    }}>
                    ADD TO CART
                  </Button>
                </Col>
                <Col flex="none">
                  <Button
                    className="btn_primary_outlined"
                    loading={saveItemToWishlistHook.isLoading}
                    onClick={() => {
                      if (authHook.isLoggedIn) {
                        const productVariationIds: number[] = []
                        if (props?.selectedProductOption?.id) {
                          productVariationIds.push(props?.selectedProductOption?.id)
                        }
                        saveItemToWishlistHook.sendRequest({
                          productVariationIds,
                        })
                      } else {
                        router.push('/login')
                      }
                    }}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Fragment>
          )}
        </Formik>
      </Col>
    </Fragment>
  )
}

export default GiftCards
