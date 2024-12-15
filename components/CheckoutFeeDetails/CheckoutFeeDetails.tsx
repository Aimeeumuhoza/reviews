import React, { Fragment } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Card from 'antd/lib/card'
import Divider from 'antd/lib/divider'
import useConvertCurrency from '../../contexts/CurrencyConversion/useConvertCurrency'
type CheckoutFeeDetailsProps = {
  subTotal?: number
  customizationsPrice?: number
  discountPrice?: number
  shippingFees: number
  canShowShippingFees: boolean
  newPurchaseDiscount: number
  baseSubTotal: number
}

/**
 * Gets total sum of sub-total, customization price & discount price
 * If price is less than 0, default will be 0
 * @param subTotal
 * @param customizationsPrice
 * @param discountPrice
 * @param newPurchaseDiscount
 * @returns
 */
const getTotalFees = (
  subTotal: number | undefined,
  customizationsPrice: number | undefined,
  discountPrice: number | undefined,
): number => {
  const total = (subTotal || 0) + (customizationsPrice || 0) - (discountPrice || 0)
  return +total < 0 ? 0 : +total.toFixed(0)
}

const CheckoutFeeDetails: React.FC<CheckoutFeeDetailsProps> = (props) => {
  const convertCurrencyHook = useConvertCurrency()

  return (
    <Card className="mabo64 bg_grey">
      <p className="text16 text-uppercase black fowe700">TOTAL</p>
      <Divider></Divider>
      <Row className="mabo8">
        <Col flex="auto">
          <p className="text12 gray fowe500">Sub-Total</p>
        </Col>
        {/* <Col flex="none">
          <p className="text12 black fowe700">{props.subTotal || 0} USD</p>
        </Col> */}

        {props.newPurchaseDiscount > 0 ? (
          <>
            <Fragment>
              <s className="text14 gray fowe400">
                {convertCurrencyHook.convertTo(props.baseSubTotal)}
              </s>
              &nbsp;
              <span className="text14 black fowe700 ">
                {' '}
                {convertCurrencyHook.convertTo(props.subTotal || 0)}
              </span>
            </Fragment>
          </>
        ) : (
          <p className="text12 black fowe700">
            {convertCurrencyHook.convertTo(props.subTotal || 0)}
          </p>
        )}
      </Row>
      <Row className="mabo8">
        <Col flex="auto">
          <p className="text12 gray fowe500">Customizations</p>
        </Col>
        <Col flex="none">
          <p className="text12 black fowe700">
            {convertCurrencyHook.convertTo(props.customizationsPrice || 0)}
          </p>
        </Col>
      </Row>
      <Row className="mabo8">
        <Col flex="auto">
          <p className="text12 gray fowe500">Promo Code discount</p>
        </Col>
        <Col flex="none">
          <p className="text12 black fowe700">
            - {convertCurrencyHook.convertTo(props.discountPrice || 0)}
          </p>
        </Col>
      </Row>
      <Row className="mabo8">
        <Col flex="auto">
          <p className="text12 gray fowe500">Shipping Fees</p>
        </Col>
        <Col flex="none">
          {/* <p className="text12 black fowe700">
            {props.canShowShippingFees ? props.shippingFees || 0 : 0} USD
          </p> */}
          <p className="text12 black fowe700">
            {convertCurrencyHook.convertTo(props.canShowShippingFees ? props.shippingFees || 0 : 0)}
          </p>
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col flex="auto">
          <p className="text16 black text-uppercase fowe700">Total</p>
        </Col>
        <Col flex="none">
          <p className="text16 black fowe700">
            {convertCurrencyHook.convertTo(
              getTotalFees(props.subTotal, props.customizationsPrice, props.discountPrice) +
                (props.canShowShippingFees ? props.shippingFees || 0 : 0),
            )}
          </p>
        </Col>
      </Row>
      <Row gutter={16} align="middle" className="mato32">
        <Col flex="none">
          <p className="text12 gray text-uppercase fowe500 mabo0">WE ACCEPT</p>
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
          <img src="/mpesa.png" alt="sss" height={16} />
        </Col>
        <Col flex="none">
          <img src="/americanExpress.png" alt="sss" height={16} />
        </Col>
      </Row>
    </Card>
  )
}

export default CheckoutFeeDetails
