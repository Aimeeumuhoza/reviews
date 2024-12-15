import React, { Fragment } from 'react'
import { mapDominantColorToClassName } from '../../../lib/utils/style.util'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import DeleteIcon from '@material-ui/icons/Delete'
import Img from 'antd/lib/image'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import styles from '../../../styles/Products.module.css'
import Divider from 'antd/lib/divider'
import { Card, message } from 'antd'
import { useCart } from '../../../contexts/Cart'
import { isBetweenDates } from '../../../lib/utils/date.util'
import { useRouter } from 'next/router'
import { useAuth } from '../../../contexts/Auth'
import useSaveItemToWishlist from '../../../hooks/api/useSaveItemToWishlist'
import useHandleState from '../../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../../lib/utils/error.util'
import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'
import { DiscountType } from '../../../lib/enums/discount-type.enum'
import { getDiscountEquivalent } from '../../../lib/utils/number.util'

const BagPage: React.FC = () => {
  const cartHook = useCart()
  const authHook = useAuth()
  const router = useRouter()
  const convertCurrencyHook = useConvertCurrency()
  const saveItemToWishlistHook = useSaveItemToWishlist()

  useHandleState(saveItemToWishlistHook, {
    onSuccess: (response) => {
      message.success(response.message)
    },
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
  })

  return (
    <>
      <div className="container-fluid checkout_header">
        <div className="container">
          <Row align="middle">
            <Col flex="auto">
              <p className="white text18 fowe700 mabo8">MY CART ({cartHook.cartItems.length})</p>
              <p className="white text12 fowe300">Items in the bag are reserved for 60 minutes</p>
            </Col>
            <Col flex="none">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/products')
                }}>
                <span className="white text12 fowe700">CONTINUE SHOPPING</span>
              </a>

              <span style={{ verticalAlign: 'middle' }}>
                <img src="/chevron-right.svg" alt="icon_chevron" style={{ width: '16px' }} />
              </span>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container-fluid uzuri_section">
        <div className="container mato32 mabo32">
          <Row gutter={32}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              {cartHook.cartItems.map((cartItem, idx) => (
                <Fragment key={idx.toString()}>
                  <Row gutter={16} className="mabo32">
                    <Col
                      xs={8}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ backgroundImage: '/uzuri_avatar.png' }}>
                      <Img
                        src={cartItem.productOption?.imgUrls[0]}
                        style={{
                          borderRadius: '4px',
                          marginRight: '8px',
                          border: '0.5px solid #D0D8E8',
                          height: '164px',
                          objectFit: 'cover',
                          objectPosition: 'bottom',
                        }}
                      />
                    </Col>
                    <Col xs={16} sm={12} md={18} lg={18} xl={18}>
                      <p className="text16 black fowe400">{cartItem.product?.name}</p>
                      {/* <p className="text12 gray ">
                        {isBetweenDates(
                          new Date(),
                          new Date(cartItem.product?.discountActivationDate || ''),
                          new Date(cartItem.product?.discountExpirationDate || ''),
                        ) ? (
                          <Fragment>
                            <s style={{ paddingRight: '4px' }}>
                              {cartItem.product?.amount || 0} USD
                            </s>
                            <span className="text14 black fowe700">
                              {(
                                getDiscountEquivalent(
                                  cartItem.product?.amount || 0,
                                  cartItem.product?.discountAmount || 0,
                                  cartItem.product?.discountType || DiscountType.AMOUNT,
                                ) || 0
                              ).toFixed(0)}
                            </span>
                          </Fragment>
                        ) : (
                          <span className="text14 black fowe700">
                            {(cartItem.product?.amount || 0).toFixed(0)} USD
                          </span>
                        )}
                      </p> */}
                      <p className="text12 gray ">
                        {isBetweenDates(
                          new Date(),
                          new Date(cartItem.product?.discountActivationDate || ''),
                          new Date(cartItem.product?.discountExpirationDate || ''),
                        ) ? (
                          <Fragment>
                            <s style={{ paddingRight: '4px' }}>
                              {convertCurrencyHook.convertTo(cartItem.product?.amount || 0)}
                            </s>
                            <span className="text14 black fowe700">
                              {convertCurrencyHook.convertTo(
                                getDiscountEquivalent(
                                  cartItem.product?.amount || 0,
                                  cartItem.product?.discountAmount || 0,
                                  cartItem.product?.discountType || DiscountType.AMOUNT,
                                ) || 0,
                              )}
                            </span>
                          </Fragment>
                        ) : (
                          <span className="text14 black fowe700">
                            {convertCurrencyHook.convertTo(cartItem.product?.amount || 0)}
                          </span>
                        )}
                      </p>
                      <Row gutter={16} className="mabo16">
                        <Col flex="none">
                          <span className="text12 black fowe700">
                            Color :{' '}
                            <Brightness1Icon
                              className={`${
                                styles[
                                  mapDominantColorToClassName(
                                    cartItem.productOption?.dominantColors[0],
                                  )
                                ]
                              }  bulletIcon`}
                            />
                          </span>
                        </Col>
                        {cartItem.product?.classification === 'SHOE' ||
                          (cartItem.product?.classification === 'SHIRT' && (
                            <Col flex="none">
                              <span className="text12 black fowe700">Size : </span>
                              <span className="text12 gray fowe500">
                                {' '}
                                {cartItem.orderedShoeSize}
                              </span>
                            </Col>
                          ))}

                        <Col flex="none">
                          <span className="text12 black fowe700">Quantity : </span>
                          <span className="text12 gray fowe500"> {cartItem.orderedQuantity}</span>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col flex="none">
                          {authHook.isLoggedIn && (
                            <button
                              disabled={saveItemToWishlistHook.isLoading}
                              onClick={() => {
                                const productVariationIds: number[] = []
                                if (cartItem?.productOption?.id) {
                                  productVariationIds.push(cartItem?.productOption?.id)
                                }
                                saveItemToWishlistHook.sendRequest({
                                  productVariationIds,
                                })
                              }}
                              className="btn_secondary_large">
                              {saveItemToWishlistHook.isLoading ? 'SAVING...' : 'SAVE TO WISHLIST'}
                            </button>
                          )}
                        </Col>
                        <Col flex="none">
                          <button
                            onClick={() => {
                              cartHook.removeFromCart(idx)
                            }}
                            className="btn_link"
                            style={{ border: '1px solid #D0D8E8' }}>
                            <DeleteIcon />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {idx < cartHook.cartItems.length && <Divider></Divider>}
                </Fragment>
              ))}
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              {/* <Row className="mabo32">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ backgroundColor: '#F4F6F9' }}>
                  <p className="text12 black fowe500 mabo0 pad16">
                    Orders might take longer than usual due to the covid-19 restrictions.
                  </p>
                </Col>
              </Row> */}
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Card>
                    <p className="text24 black fowe700">TOTAL</p>
                    <Divider></Divider>
                    <Row className="mabo8">
                      <Col flex="auto">
                        <p className="text12 gray fowe500">Sub-Total</p>
                      </Col>
                      <Col flex="none">
                        {/* <p className="text12 black fowe700">{cartHook.getCartTotal()} USD</p> */}
                        {convertCurrencyHook.convertTo(cartHook.getCartTotal())}
                      </Col>
                    </Row>
                    <Row className="mabo8">
                      <Col flex="auto">
                        <p className="text12 gray fowe500">Customizations</p>
                      </Col>
                      <Col flex="none">
                        <p className="text12 black fowe700">0</p>
                      </Col>
                    </Row>

                    <Row className="mabo32">
                      <Col flex="auto">
                        <button
                          onClick={() => {
                            // console.log(cartHook.cartItems, 'cart')

                            if (authHook.isLoggedIn) {
                              router.push(
                                {
                                  pathname: '/checkout',
                                  query: { data: `${cartHook.cartItems}` },
                                },
                                '/checkout', // "as" argument
                              )
                            } else {
                              router.push('/login?redirectTo=checkout')
                            }
                          }}
                          className="btn_primary_large btn_full">
                          CHECKOUT
                        </button>
                      </Col>
                    </Row>
                    <Row className="mabo32" gutter={16} align="middle">
                      <Col flex="none">
                        <p className="text12 black text-uppercase fowe700 mabo0">WE ACCEPT</p>
                      </Col>

                      <Col flex="none">
                        <img src="/MTN-MoMo.png" alt="sss" height={16} />
                      </Col>
                      <Col flex="none">
                        <img src="/mastercard.png" alt="sss" height={16} />
                      </Col>
                      <Col flex="none">
                        <img src="/visa.png" alt="sss" height={16} />
                      </Col>
                      <Col flex="none">
                        <img
                          src="/mpesa.png"
                          alt="sss"
                          height={16}
                          style={{ borderRadius: '2px' }}
                        />
                      </Col>
                      <Col flex="none">
                        <img
                          src="/americanExpress.png"
                          alt="sss"
                          height={16}
                          style={{ borderRadius: '2px' }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col flex="auto">
                        <p className="text12 black fowe500 mabo0">
                          A discount code and delivery fee details are on the next step.
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default BagPage
