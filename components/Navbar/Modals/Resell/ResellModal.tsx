import React from 'react'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'

type ResellModal = {
  isResellModalVisible: boolean
  resellOkBtn: () => void
  resellCancelBtn: () => void
}

const ResellModal: React.FC<ResellModal> = ({
  isResellModalVisible,
  resellOkBtn,
  resellCancelBtn,
}) => {
  return (
    <>
      <Modal
        visible={isResellModalVisible}
        onOk={resellOkBtn}
        onCancel={resellCancelBtn}
        footer={null}
        width={1000}>
        <div className="hide_phone">
          <Row justify="center">
            <Col span={12}>
              <h3 className="center black fowe800 mato64">Resell Pre-owned pairs</h3>

              <p className="center text14 gray fowe400 mato32 mabo16 pad16">
                Resell your pre-owned shoes and get an amazing <b> 20% off</b> on a new pair!Just
                bring your old shoes to our stores to enjoy this great deal.
                <br></br>
                <br></br>
                Join us in our commitment to circularity, reducing waste and embracing eco-friendly
                fashion choices.<br></br>
                <br></br>
                <a href="/products?c_._name__in=Sandals">
                  <Button className="btn_primary_large">Continue shopping</Button>
                </a>
              </p>
            </Col>
            <Col span={12}>
              <img src="/xandaya.jpeg" alt="image" width="500px" height="400px" />
            </Col>
          </Row>
        </div>
        <div className="d-block d-sm-none">
          <Row>
            <Col span={24}>
              <h3 className="center black fowe800 mato64">Resell Pre-owned pairs</h3>
              <p className="center text14 gray fowe400 mato32 mabo16 pad16">
                Resell your pre-owned shoes and get an amazing <b> 30% off</b> on a new pair!Just
                bring your old shoes to our stores to enjoy this great deal.
                <br></br>
                <br></br>
                Join us in our commitment to circularity, reducing waste and embracing eco-friendly
                fashion choices.<br></br>
                <br></br>
                <a href="/products?c_._name__in=Sandals">
                  <Button className="btn_primary_large">Continue shopping</Button>
                </a>
              </p>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default ResellModal
