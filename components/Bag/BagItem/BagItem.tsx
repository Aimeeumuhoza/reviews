import React, { Fragment } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Divider from 'antd/lib/divider'
import DeleteIcon from '@material-ui/icons/Delete'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import styles from '../../../styles/Products.module.css'
import { CartItem } from '../../../types'
import { mapDominantColorToClassName } from '../../../lib/utils/style.util'
import { useCart } from '../../../contexts/Cart'
import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'
import { isBetweenDates } from '../../../lib/utils/date.util'
import { getDiscountEquivalent } from '../../../lib/utils/number.util'
import { DiscountType } from '../../../lib/enums/discount-type.enum'

type BagItemProp = {
  cartItem: CartItem
  cartIdx: number
}

const BagItem: React.FC<BagItemProp> = (props) => {
  const cartHook = useCart()
  const convertCurrencyHook = useConvertCurrency()
  return (
    <Fragment>
      <Row gutter={24}>
        <Col span={6}>
          <img
            alt="item image"
            src={props.cartItem?.productOption?.imgUrls[0]}
            style={{
              width: '100%',
              borderRadius: '4px',

              border: '0.5px solid #D0D8E8',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
            }}
          />
        </Col>
        <Col span={14}>
          <p className="text12 black fowe700">{props.cartItem?.product?.name}</p>
          {/* {isBetweenDates(
            new Date(),
            new Date(props?.cartItem?.product?.discountActivationDate || ''),
            new Date(props?.cartItem?.product?.discountExpirationDate || ''),
          ) ? (
            <Fragment>
              <span>
                <s className="text12 gray" style={{ paddingRight: '4px' }}>
                  {props.cartItem?.product?.amount || 0} USD
                </s>
                <span className="text12 black fowe700">
                  {(
                    getDiscountEquivalent(
                      props.cartItem?.product?.amount || 0,
                      props.cartItem?.product?.discountAmount || 0,
                      props.cartItem?.product?.discountType || DiscountType.AMOUNT,
                    ) || 0
                  ).toFixed(0)}{' '}
                  USD
                </span>
              </span>
            </Fragment>
          ) : (
            <p className="text14 black fowe700">
              {props.cartItem?.orderedQuantity * (props.cartItem?.product?.amount || 1)} USD
            </p>
          )} */}
          {isBetweenDates(
            new Date(),
            new Date(props?.cartItem?.product?.discountActivationDate || ''),
            new Date(props?.cartItem?.product?.discountExpirationDate || ''),
          ) ? (
            <Fragment>
              <span>
                <s className="text12 gray" style={{ paddingRight: '4px' }}>
                  {convertCurrencyHook.convertTo(props.cartItem?.product?.amount || 0)}
                </s>
                <span className="text12 black fowe700">
                  {convertCurrencyHook.convertTo(
                    getDiscountEquivalent(
                      props.cartItem?.product?.amount || 0,
                      props.cartItem?.product?.discountAmount || 0,
                      props.cartItem?.product?.discountType || DiscountType.AMOUNT,
                    ) || 0,
                  )}
                </span>
              </span>
            </Fragment>
          ) : (
            <p className="text14 black fowe700">
              {convertCurrencyHook.convertTo(
                props.cartItem?.orderedQuantity * (props.cartItem?.product?.amount || 1),
              )}
            </p>
          )}
          <Row gutter={16}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <span className="text12 black fowe700">
                Color: {''}
                <Brightness1Icon
                  className={`${
                    styles[
                      mapDominantColorToClassName(props.cartItem?.productOption?.dominantColors[0])
                    ]
                  } color_picker_active`}
                />
              </span>
            </Col>
            {props.cartItem.product?.classification === 'SHOE' && (
              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <span className="text12 black fowe700">Size: </span>
                <span className="text12 gray fowe500"> {props.cartItem.orderedShoeSize}</span>
              </Col>
            )}
            {props.cartItem.product?.classification === 'SHIRT' && (
              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <span className="text12 black fowe700">Size: </span>
                <span className="text12 gray fowe500"> {props.cartItem.orderedShoeSize}</span>
              </Col>
            )}
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <span className="text12 black fowe700">Quantity: </span>
              <span className="text12 gray fowe500"> {props.cartItem.orderedQuantity}</span>
            </Col>
          </Row>
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <button
            onClick={() => {
              cartHook.removeFromCart(props.cartIdx)
            }}
            className="btn_link"
            style={{ border: '1px solid #D0D8E8' }}>
            <DeleteIcon />
          </button>
        </Col>
      </Row>
      <Divider></Divider>
    </Fragment>
  )
}

export default BagItem
