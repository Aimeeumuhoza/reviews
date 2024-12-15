import React, { Fragment, useEffect, useRef, useState } from 'react'
import HTMLParser from 'html-react-parser'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import InputNumber from 'antd/lib/input-number'
import Form from 'antd/lib/form'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import Select from 'antd/lib/select'
import message from 'antd/lib/message'
import Avatar from 'antd/lib/avatar'
import { Formik, FormikProps } from 'formik'
import ReactImageMagnify from 'react-image-magnify'
import styles from '../../../../styles/Products.module.css'
import { CartItem, ProductOption, ProductWithFullDetails } from '../../../../types'
import { isBetweenDates } from '../../../../lib/utils/date.util'
import { mapDominantColorToClassName } from '../../../../lib/utils/style.util'
import { useCart } from '../../../../contexts/Cart'
import { getValidationStatus, getHelp } from '../../../../lib/utils/formik.util'
import {
  addToCartInitialValues,
  addToCartValidationSchema,
} from '../../../../lib/validation/add-to-cart.validation'
import useSaveItemToWishlist from '../../../../hooks/api/useSaveItemToWishlist'
import { useAuth } from '../../../../contexts/Auth'
import useHandleState from '../../../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../../../lib/utils/error.util'
import SizeGuide from '../../../SizeGuide'
import { useRouter } from 'next/router'
import useConvertCurrency from '../../../../contexts/CurrencyConversion/useConvertCurrency'
import ItemAddedModal from '../ItemAddedModal'
import { getDiscountEquivalent } from '../../../../lib/utils/number.util'
import { DiscountType } from '../../../../lib/enums/discount-type.enum'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { RiWhatsappFill } from 'react-icons/ri'

type ProductDetailsDescriptionViewProp = {
  product: ProductWithFullDetails | undefined
  selectedProductOption: ProductOption | undefined
}

const { Option } = Select

const ProductDetailsDescriptionView: React.FC<ProductDetailsDescriptionViewProp> = (props) => {
  const router = useRouter()
  const cartHook = useCart()
  const authHook = useAuth()
  const convertCurrencyHook = useConvertCurrency()
  const [selectedProductOptionIdx, setSelectedProductOptionIdx] = useState(0)
  const [selectedProductOption, setSelectedProductOption] = useState(props.selectedProductOption)
  const [selectLargeViewImageIdx, setSelectLargeViewImageIdx] = useState('0')
  const [copySuccess, setCopySuccess] = useState(false)
  const saveItemToWishlistHook = useSaveItemToWishlist()
  const formikRef = useRef<
    FormikProps<{
      orderedQuantity: number | undefined
      orderedShoeSize: number | string | undefined
    }>
  >(null)

  useEffect(() => {
    if (props.selectedProductOption) {
      setSelectedProductOption(props.selectedProductOption)
    }
    let timeoutId
    if (copySuccess) {
      timeoutId = setTimeout(() => {
        setCopySuccess(false)
      }, 1500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [props.selectedProductOption, copySuccess])

  useHandleState(saveItemToWishlistHook, {
    onSuccess: (response) => {
      message.success(response.message)
    },
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isItemAddedModalVisible, setIsItemAddedModalVisible] = useState(false)

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleOk = (): void => {
    setIsModalVisible(false)
  }

  const sizeGuideHandleCancel = (): void => {
    setIsModalVisible(false)
  }

  const showItemAddedModal = (): void => {
    setIsItemAddedModalVisible(true)
  }
  const itemAddedHandleOk = (): void => {
    setIsItemAddedModalVisible(false)
    router.push('/bag')
  }
  const itemAddedHandleCancel = (): void => {
    setIsItemAddedModalVisible(false)
  }

  const onDisplayColorChanged = (idx: number): void => {
    if (props.product?.productOptions && props.product?.productOptions.length > idx) {
      setSelectedProductOptionIdx(idx)
      setSelectedProductOption(props?.product?.productOptions[idx])
    }
  }

  const handleShareOnWhatsApp = (id): void => {
    const message = `Check out this awesome product: https://uzuriky.com/products/details/${id}`
    const url = `https://wa.me/?text=${message}`
    window.open(url, '_blank')
  }

  const handleShareOnTwitter = (id): void => {
    const tweet = `Check out this awesome product: https://uzuriky.com/products/details/${id}`
    const url = `https://twitter.com/intent/tweet?text=${tweet}`
    window.open(url, '_blank')
  }

  const handleShareOnFacebook = (id): void => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=https://uzuriky.com/products/details/${id}`
    window.open(url, '_blank')
  }

  const handleCopyLink = (id, setCopySuccess): void => {
    const url = `https://uzuriky.com/products/details/${id}`

    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true)
    })
  }

  return (
    <Fragment>
      <Col
        xs={{ span: 24, order: 3 }}
        sm={{ span: 24, order: 3 }}
        md={{ span: 2, order: 1 }}
        lg={{ span: 2, order: 1 }}
        xl={{ span: 2, order: 1 }}>
        {selectedProductOption?.imgUrls.map((imgUrl, idx) => (
          <a
            href="/"
            key={idx.toString()}
            onClick={(e) => {
              e.preventDefault()
              setSelectLargeViewImageIdx(idx.toString())
            }}>
            <Avatar src={imgUrl} className={styles.zoomItemImage} size={68} shape="square" />
          </a>
        ))}
      </Col>
      <Col
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={{ span: 10, order: 2 }}
        lg={{ span: 10, order: 2 }}
        xl={{ span: 10, order: 2 }}>
        {selectLargeViewImageIdx && (
          <Fragment>
            <div>
              <ReactImageMagnify
                className={styles.mainItemImage}
                {...{
                  style: {
                    zIndex: 1,
                  },
                  smallImage: {
                    alt: props.product?.name,
                    isFluidWidth: true,
                    src: `${
                      props?.product?.productOptions
                        ? props?.product?.productOptions[selectedProductOptionIdx]?.imgUrls[
                            selectLargeViewImageIdx
                          ]
                        : ''
                    }`,
                  },
                  largeImage: {
                    src: `${
                      props?.product?.productOptions
                        ? props?.product?.productOptions[selectedProductOptionIdx]?.imgUrls[
                            selectLargeViewImageIdx
                          ]
                        : ''
                    }`,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
              {!selectedProductOption?.isInStock && (
                <span className={styles.outOfStock}>Sold Out</span>
              )}{' '}
              {/* {(props.product?.discountAmount ?? 0) > 0 && props.product && (
                <span className={styles.discountBadg}>{props.product.discountAmount}% OFF</span>
              )} */}
              {isBetweenDates(
                new Date(),
                new Date(props.product?.discountActivationDate || ''),
                new Date(props.product?.discountExpirationDate || ''),
              ) &&
                (props.product?.discountAmount ?? 0) > 0 && (
                  <span className={styles.discountBadg}>{props.product?.discountAmount}% OFF</span>
                )}
            </div>
          </Fragment>
        )}
      </Col>
      <Col
        xs={{ span: 1, order: 4 }}
        sm={{ span: 1, order: 4 }}
        md={{ span: 1, order: 3 }}
        lg={{ span: 1, order: 3 }}
        xl={{ span: 1, order: 3 }}></Col>
      <Col
        xs={{ span: 24, order: 1 }}
        sm={{ span: 24, order: 1 }}
        md={{ span: 11, order: 4 }}
        lg={{ span: 11, order: 4 }}
        xl={{ span: 11, order: 4 }}>
        <p className="text36 black fowe700 mabo16">{props.product?.name}</p>

        {/* <p className="text18 black fowe900 mabo32">
          {isBetweenDates(
            new Date(),
            new Date(props.product?.discountActivationDate || ''),
            new Date(props.product?.discountExpirationDate || ''),
          ) ? (
            <Fragment>
              <s className="text14 gray fowe400 mr-2">{props.product?.amount || 0} USD</s>
              {(
                getDiscountEquivalent(
                  props.product?.amount || 0,
                  props.product?.discountAmount || 0,
                  props.product?.discountType || DiscountType.AMOUNT,
                ) || 0
              ).toFixed(0)}{' '}
              USD
            </Fragment>
          ) : (
            <Fragment>{props.product?.amount || 0} USD</Fragment>
          )}
        </p> */}
        <p className="text18 black fowe900 mabo32">
          {isBetweenDates(
            new Date(),
            new Date(props.product?.discountActivationDate || ''),
            new Date(props.product?.discountExpirationDate || ''),
          ) ? (
            <Fragment>
              <s className="text14 gray fowe400 mr-2">
                {convertCurrencyHook.convertTo(props.product?.amount || 0)}
              </s>
              {convertCurrencyHook.convertTo(
                getDiscountEquivalent(
                  props.product?.amount || 0,
                  props.product?.discountAmount || 0,
                  props.product?.discountType || DiscountType.AMOUNT,
                ) || 0,
              )}
            </Fragment>
          ) : (
            <Fragment>{convertCurrencyHook.convertTo(props.product?.amount || 0)}</Fragment>
          )}
        </p>
        <p className="text14 black fowe900">Description</p>
        <p className="text12 gray mabo32">{HTMLParser(props.product?.description || '')}</p>
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={addToCartInitialValues(props.product?.classification)}
          validationSchema={addToCartValidationSchema(props.product?.classification)}
          onSubmit={(formikVals) => {
            const cartItem: CartItem = {
              product: props.product as ProductWithFullDetails,
              productOption: selectedProductOption,
              productOptionId: selectedProductOption?.id,
              orderedQuantity: formikVals.orderedQuantity || 0,
              orderedShoeSize: formikVals?.orderedShoeSize,
            }
            try {
              // console.log(cartItem,'cart items data')
              cartHook.addToCart(cartItem)
              formikRef.current?.resetForm()
              showItemAddedModal()
            } catch (error) {
              message.error(error.message)
            }
          }}>
          {(formikProps) => {
            return (
              <Fragment>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <p className="text12 black fowe700 mabo16">Color </p>

                    {props.product?.productOptions?.map((productOption, idx) => {
                      const { dominantColors } = productOption
                      const colorClassName = mapDominantColorToClassName(dominantColors[0])
                      return (
                        <Brightness1Icon
                          onClick={() => {
                            onDisplayColorChanged(idx)
                          }}
                          key={idx.toString()}
                          className={`${styles[colorClassName]} color_picker ${
                            selectedProductOptionIdx === idx ? 'color_picker_active' : ''
                          } ${!selectedProductOption?.isInStock ? 'color_picker_unavailable' : ''}`}
                        />
                      )
                    })}
                    {/* {props.product?.classification === 'SHOE' && (
                      <Row className="mato8">
                        <button className="btn_link_dark">
                          CUSTOMIZE <img src="/chevron-right-black.svg" height="20px" alt="icon" />
                        </button>
                      </Row>
                    )} */}
                  </Col>

                  {props.product?.classification === 'SHOE' && (
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        name="orderedShoeSize"
                        validateStatus={getValidationStatus(formikProps, 'orderedShoeSize')}
                        help={getHelp(formikProps, 'orderedShoeSize')}>
                        <p className="text12 black fowe700 mabo8">Size </p>
                        <Select
                          value={formikProps.values.orderedShoeSize}
                          placeholder={<span className="text12 gray ">Select size</span>}
                          onChange={(selectedShoeSize) => {
                            formikProps.setFieldValue('orderedShoeSize', selectedShoeSize)
                          }}
                          style={{ width: '100%' }}>
                          {selectedProductOption?.shoeSizes.sort().map((shoeSize, idx) => (
                            <Option key={idx} value={shoeSize} className="text12 gray">
                              {shoeSize}
                            </Option>
                          ))}
                        </Select>
                        <button className="btn_link_dark" onClick={showModal}>
                          SIZE GUIDE <img src="/chevron-right-black.svg" height="20px" alt="icon" />
                        </button>
                      </Form.Item>

                      <SizeGuide
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={sizeGuideHandleCancel}
                        showModal={showModal}
                      />
                    </Col>
                  )}

                  {props.product?.classification === 'SHIRT' && (
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        name="orderedShoeSize"
                        validateStatus={getValidationStatus(formikProps, 'orderedShoeSize')}
                        help={getHelp(formikProps, 'orderedShoeSize')}>
                        <p className="text12 black fowe700 mabo8">Size </p>
                        <Select
                          value={formikProps.values.orderedShoeSize}
                          placeholder={<span className="text12 gray ">Select size</span>}
                          onChange={(selectedShoeSize) => {
                            formikProps.setFieldValue('orderedShoeSize', selectedShoeSize)
                          }}
                          style={{ width: '100%' }}>
                          {selectedProductOption?.shoeSizes.sort().map((shoeSize, idx) => (
                            <Option key={idx} value={shoeSize} className="text12 gray">
                              {shoeSize}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}

                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item
                      name="orderedQuantity"
                      validateStatus={getValidationStatus(formikProps, 'orderedQuantity')}
                      help={getHelp(formikProps, 'orderedQuantity')}>
                      <p className="text12 black fowe700 mabo8">Quantity </p>
                      <InputNumber
                        className="my_input"
                        value={formikProps.values.orderedQuantity}
                        placeholder="Specify a quantity"
                        onChange={(quantity) => {
                          formikProps.setFieldValue('orderedQuantity', quantity)
                        }}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="mato32 mabo32">
                  <Col flex="none">
                    <Button
                      disabled={!selectedProductOption?.isInStock}
                      onClick={() => {
                        formikProps.handleSubmit()
                      }}
                      className="btn_primary_large">
                      ADD TO CART
                    </Button>
                    <ItemAddedModal
                      isModalVisible={isItemAddedModalVisible}
                      handleOk={itemAddedHandleOk}
                      handleCancel={itemAddedHandleCancel}
                    />
                  </Col>
                  <Col flex="auto">
                    <Button
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
                      }}
                      style={{ height: '55px' }}
                      className="btn_primary_outlined">
                      SAVE TO WISHLIST
                    </Button>
                  </Col>
                </Row>
                <Row gutter={16} className="mato32 mabo32">
                  <Col flex="none">
                    <p className="text18">Share via:</p>
                  </Col>

                  <Col flex="auto">
                    <a
                      style={{ marginLeft: '5px' }}
                      target="blank"
                      onClick={() => handleShareOnTwitter(props?.product?.slug)}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') handleShareOnTwitter(props?.product?.slug)
                      }}
                      tabIndex={0}
                      role="button">
                      <AiFillTwitterCircle style={{ color: '#2977ff', fontSize: '25px' }} />
                      {/* <i
                        className="fab fa-twitter blue socio_icon "
                        style={{ color: '#2977ff' }}></i> */}
                      {/* <i class="fabfa-brands fa-twitter"></i> */}
                    </a>
                    <a
                      style={{ marginLeft: '20px' }}
                      target="blank"
                      onClick={() => handleShareOnFacebook(props?.product?.slug)}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') handleShareOnFacebook(props?.product?.slug)
                      }}
                      tabIndex={0}
                      role="button">
                      <BsFacebook style={{ color: '#083177', fontSize: '20px' }} />
                    </a>
                    <a
                      style={{ marginLeft: '20px' }}
                      target="blank"
                      onClick={() => handleShareOnWhatsApp(props?.product?.slug)}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') handleShareOnWhatsApp(props?.product?.slug)
                      }}
                      tabIndex={0}
                      role="button">
                      <RiWhatsappFill style={{ color: '#085e1e', fontSize: '25px' }} />
                    </a>
                    <a
                      onClick={(event) => {
                        event.preventDefault()
                        handleCopyLink(props?.product?.slug, setCopySuccess)
                      }}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          handleCopyLink(props?.product?.slug, setCopySuccess)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      style={{
                        marginLeft: '30px',
                        display: 'inline-block',
                        transition: 'transform 0.3s',
                        position: 'relative',
                      }}>
                      <i className="fa-regular fa-copy" style={{ color: '#000000' }}></i>
                      <span style={{ marginLeft: '5px' }}>Copy link</span>
                    </a>
                    {copySuccess && (
                      <div
                        className="popup-message"
                        style={{
                          position: 'absolute',
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          top: 'calc(100% + 5px)',
                          left: 'calc(45%)',
                          transform: 'translateX(-50%)',
                        }}>
                        Link copied
                      </div>
                    )}
                  </Col>
                </Row>
              </Fragment>
            )
          }}
        </Formik>
      </Col>
    </Fragment>
  )
}

export default ProductDetailsDescriptionView
