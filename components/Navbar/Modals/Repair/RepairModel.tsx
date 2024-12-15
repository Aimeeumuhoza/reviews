import React from 'react'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'

type RepairModal = {
  isRepairModalVisible: boolean
  repairHandleOk: () => void
  handleCancel: () => void
}

const RepairModal: React.FC<RepairModal> = ({
  isRepairModalVisible,
  repairHandleOk,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        visible={isRepairModalVisible}
        onOk={repairHandleOk}
        onCancel={handleCancel}
        footer={null}>
        <div className="pad16">
          <Row justify="center" className="mabo16 mato16">
            <Col span={24} className="text-center mato16">
              <h3 className="black fowe800">Repair service</h3>
              <img
                src="/repair.jpg"
                className="mabo32 mato32 repair_image"
                alt="repair image"
                height="250px"
                width="400px"
              />
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24} className="text-center mabo32">
              {/* <p className="text18 black fowe900  mabo16">Repair service</p> */}
              <p className="text14 gray fowe400 mabo16">
                Your satisfaction is our top priority. We are here to help with your Repair service
                request.<br></br>
                <br></br>
                👉 Remember, its completely free of charge.
              </p>
            </Col>
            <Col span={24} className="text-center mabo32">
              <a href="https://forms.gle/gXrH1fvaeXAv2Sqq6" target="blank">
                <Button onClick={repairHandleOk} className="btn_primary_large text-uppercase">
                  Click to fill the form
                </Button>
              </a>
            </Col>
            <Col span={24} className="text-center mabo32 ">
              <img src="/SMILE@2x.png" alt="image" height="50px" width="200px" />
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default RepairModal
