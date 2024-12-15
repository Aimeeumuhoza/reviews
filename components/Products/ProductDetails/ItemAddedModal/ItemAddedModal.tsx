import React from 'react'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'

type ItemAddedModal = {
  isModalVisible: boolean
  handleOk: () => void
  handleCancel: () => void
}

const ItemAddedModal: React.FC<ItemAddedModal> = ({ isModalVisible, handleOk, handleCancel }) => {
  return (
    <>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className="pad16">
          <Row justify="center" className="mabo16 mato16">
            <Col span={24} className="text-center mato16">
              <img
                src="/shopping_bag.svg"
                className="mabo32 mato32"
                alt="shopping bag icon"
                height="36px"
              />
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24} className="text-center mabo32">
              <p className="text14 black fowe900  mabo16">ITEM ADDED TO CART</p>
              <p className="text12 gray fowe300 mabo16">
                Proceed to cart for checkout or continue shopping to add more items.
              </p>
            </Col>
            <Col span={24} className="text-center mabo32">
              <Button onClick={handleOk} className=" btn_primary_large text-uppercase">
                view cart
              </Button>
            </Col>
            <Col span={24} className="text-center mabo32">
              <Button onClick={handleCancel} className=" btn_link_dark">
                Continue shopping
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default ItemAddedModal
