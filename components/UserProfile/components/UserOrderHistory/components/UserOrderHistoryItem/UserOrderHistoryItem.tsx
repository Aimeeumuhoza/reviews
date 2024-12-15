import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import { format } from 'date-fns'
import React, { useState } from 'react'
import Avatar from 'antd/lib/avatar'
import Divider from 'antd/lib/divider'
import { Order } from '../../../../../../types'
import {
  listOrderDetailItemName,
  mapLongStringToEllipsis,
} from '../../../../../../lib/utils/string.util'
import { OrderStatus } from '../../../../../../lib/enums/order-status.enum'
import useConvertCurrency from '../../../../../../contexts/CurrencyConversion/useConvertCurrency'
import Button from 'antd/lib/button'
import ViewUserOrderHistoryItem from '../ViewUserOrderHistoryItem'

type UserOrderHistoryItemProps = {
  item: Order
}

const UserOrderHistoryItem: React.FC<UserOrderHistoryItemProps> = (props) => {
  const convertCurrencyHook = useConvertCurrency()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { convertFrom } = useConvertCurrency()
  const showViewOrderModal = (): void => {
    setIsModalVisible(true)
  }
  const handleOk = (): void => {
    setIsModalVisible(false)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
  }
  return (
    <Row gutter={32} className="mabo64">
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Row className="mabo8">
          {props.item.orderDetails.slice(0, 2).map((orderItem, idx) => (
            <Avatar
              key={idx}
              shape="square"
              size={96}
              src={orderItem.imgUrls[0] || '/uzuri_avatar.png'}
              style={{
                borderRadius: '4px',
                marginRight: '16px',
                marginBottom: '16px',
                border: '0.5px solid #D0D8E8',
              }}
            />
          ))}
        </Row>
        <p className="text12 black fowe700">
          {mapLongStringToEllipsis(listOrderDetailItemName(props.item.orderDetails), 30)}
        </p>
      </Col>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        <Row gutter={32} className="mabo16">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <span className="gray text12 fowe300">Order Total</span>
          </Col>
          <Col flex="auto">
            <span className="black text12 fowe700">
              {convertCurrencyHook.convertTo(
                parseInt(props.item.totalPaymentAmount) -
                  props.item.totalPromoAmount +
                  parseInt(props.item.shippingFees) || 0,
              )}
            </span>
          </Col>
        </Row>
        <Row gutter={32} className="mabo16">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <span className="gray text12 fowe300">Order No</span>
          </Col>
          <Col flex="auto">
            <span className="black text12 fowe700">{props.item.orderId}</span>
          </Col>
        </Row>
        {OrderStatus[props.item.status] === OrderStatus.SHIPPED && (
          <Row gutter={32} className="mabo16">
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <span className="gray text12 fowe300">Shipped date</span>
            </Col>
            <Col flex="auto">
              <span className="black text12 fowe700">
                {format(new Date(props?.item?.lastUpdatedOn), 'yyyy/dd/MM')}
              </span>
            </Col>
          </Row>
        )}
        <Divider></Divider>
        <Row gutter={32} wrap={false}>
          <Col flex="auto">
            <p className="gray text12 fowe700">{OrderStatus[props.item.status]}</p>
          </Col>
          {OrderStatus[props.item.status] === OrderStatus.SHIPPED && (
            <Col flex="none">
              <span className="black text12 fowe700">TRACK</span>
            </Col>
          )}
          <Col flex="none">
            <Button
              className="btn_link_dark"
              onClick={showViewOrderModal}
              style={{ height: '0px' }}>
              VIEW
            </Button>
            <ViewUserOrderHistoryItem
              item={props.item}
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default UserOrderHistoryItem
