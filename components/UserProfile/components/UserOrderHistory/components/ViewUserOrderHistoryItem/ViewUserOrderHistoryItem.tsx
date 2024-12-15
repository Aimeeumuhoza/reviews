import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import React, { Fragment } from 'react'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import Divider from 'antd/lib/divider'
import { Order } from '../../../../../../types'
import useConvertCurrency from '../../../../../../contexts/CurrencyConversion/useConvertCurrency'
import { OrderStatus } from '../../../../../../lib/enums/order-status.enum'

type ViewUserOrderHistoryItemProps = {
  item: Order
  isModalVisible: boolean
  handleOk: () => void
  handleCancel: () => void
}

const ViewUserOrderHistoryItem: React.FC<ViewUserOrderHistoryItemProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  item,
}) => {
  const convertCurrencyHook = useConvertCurrency()
  const { convertFrom } = useConvertCurrency()
  return (
    <Modal
      title={
        <Row className="pad16">
          <Col flex="auto">
            <p className="text14 black fowe700 text-uppercase mabo16">
              ORDER: <span className="gray fowe500"> {item.orderId}</span>
            </p>
            <p className="text12 gray fowe700 text-uppercase">{OrderStatus[item.status]}</p>
          </Col>
        </Row>
      }
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={720}
      footer={
        <div className="order_view_footer" style={{ textAlign: 'left' }}>
          <p className="text16 text-uppercase black fowe700">TOTAL</p>
          <Divider></Divider>
          <Row className="mabo8">
            <Col flex="auto">
              <p className="text12 gray fowe500">Sub-Total</p>
            </Col>
            <Col flex="none">
              {/* <p className="text12 black fowe700">
                {convertFrom(parseInt(item?.totalPaymentAmount).toString() || '0')}
              </p> */}
              <p className="text12 black fowe700">
                {convertCurrencyHook.convertTo(parseInt(item?.totalPaymentAmount || '0'))}
              </p>
            </Col>
          </Row>
          {/* TODO: INTEGRATE WHEN API OFFERS CUSTOMIZATION DATA */}
          {/* <Row className="mabo8">
            <Col flex="auto">
              <p className="text12 gray fowe500">Customizations</p>
            </Col>
            <Col flex="none">
              <p className="text12 black fowe700">5,000Rwf</p>
            </Col>
          </Row> */}
          <Row className="mabo8">
            <Col flex="auto">
              <p className="text12 gray fowe500">Shipping Fees</p>
            </Col>
            <Col flex="none">
              {/* <p className="text12 black fowe700">{parseInt(item?.shippingFees || '0')}</p> */}
              {convertCurrencyHook.convertTo(parseInt(item?.shippingFees || '0'))}
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <p className="text12 gray fowe500">Discount</p>
            </Col>
            <Col flex="none">
              {/* <p className="text12 black fowe700">-{item.totalPromoAmount}</p> */}
              <p className="text12 black fowe700">
                -{convertCurrencyHook.convertTo(item.totalPromoAmount)}
              </p>
            </Col>
          </Row>
          <Divider></Divider>
          <Row className="mabo8">
            <Col flex="auto">
              <p className="text12 gray fowe500">TOTAL</p>
            </Col>
            <Col flex="none">
              {/* <p className="text12 black fowe700">
                {convertFrom(
                  parseInt(item?.totalPaymentAmount || '0') -
                    item.totalPromoAmount +
                    parseInt(item.shippingFees).toString(),
                )}
              </p> */}
              <p className="text12 black fowe700">
                {convertCurrencyHook.convertTo(
                  parseInt(item?.totalPaymentAmount || '0') -
                    item.totalPromoAmount +
                    parseInt(item.shippingFees),
                )}
              </p>
            </Col>
          </Row>
        </div>
      }
      className="view_order_modal">
      <div className="pad16">
        {item.orderDetails.map((orderDetail, idx) => (
          <Fragment key={idx}>
            <Row gutter={24}>
              <Col span={6}>
                <img
                  alt="item image"
                  src={orderDetail.imgUrls[0] || '/uzuri_avatar.png'}
                  style={{
                    width: '100%',
                    borderRadius: '4px',

                    border: '0.5px solid #D0D8E8',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                  }}
                />
              </Col>
              <Col span={18}>
                <p className="text12 black fowe700">{orderDetail.name}</p>
                <p className="text12 gray ">
                  {orderDetail.orderedUnitPrice * orderDetail.orderedQuantity || 0}
                </p>
                <Row gutter={16}>
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span className="text12 black fowe700">
                      Color:
                      {orderDetail.dominantColors.map((color, idx) => (
                        <Brightness1Icon
                          key={idx}
                          style={{
                            color,
                            fontSize: '14px',
                          }}
                        />
                      ))}
                    </span>
                  </Col>
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span className="text12 black fowe700">Size: </span>
                    <span className="text12 gray fowe500">{orderDetail.orderedShoeSize}</span>
                  </Col>
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span className="text12 black fowe700">Quantity: </span>
                    <span className="text12 gray fowe500">{orderDetail.orderedQuantity}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider></Divider>
          </Fragment>
        ))}
        {item.clientNote && (
          <Row className="mabo16 mato16">
            <Col flex="auto">
              <p className="text12 black fowe700">{"Customer's note"}</p>
              <p className="text12 gray fowe500">{item.clientNote}</p>
            </Col>
          </Row>
        )}
        {item.staffComment && (
          <Row className="mabo16 mato16">
            <Col flex="auto">
              <p className="text12 black fowe700">Staff comment</p>
              <p className="text12 gray fowe500">{item.staffComment}</p>
            </Col>
          </Row>
        )}
      </div>
    </Modal>
  )
}

export default ViewUserOrderHistoryItem
