import React from 'react'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'

type DonateModal = {
  isDonateModalVisible: boolean
  okBtn: () => void
  cancelBtn: () => void
}

const DonateModal: React.FC<DonateModal> = ({ isDonateModalVisible, okBtn, cancelBtn }) => {
  const handleEmailButtonClick = () => {
    const emailAddress = 'customersupport@uzuriky.com'
    const subject = 'Ignite Change Through Shoe Donations'
    const body = 'Type your message here: '

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoUrl
  }

  return (
    <>
      <Modal
        visible={isDonateModalVisible}
        onOk={okBtn}
        onCancel={cancelBtn}
        footer={null}
        width={1000}>
        <div className="hide_phone">
          <Row justify="center">
            <Col span={12}>
              <h3 className="center black fowe800 mato64">Ignite Change Through Shoe Donations</h3>

              <p className="center text14 gray fowe400 mato16 mabo16 pad16">
                Step into the World of Sustainable Fashion! Breathe new life into your old shoes
                through circularity. Make a meaningful contribution by donating your shoes – a
                simple act with a profound impact. Together, lets champion waste reduction and
                reimagine the lifecycle of your footwear.
                <br></br>
                <br></br>
                Join our movement and embrace a brighter, eco-friendly tomorrow.
                <br></br>
                <Button className="btn_link_dark mato16" onClick={handleEmailButtonClick}>
                  Click here to connect with us and ignite the journey of donation!
                </Button>
              </p>
            </Col>
            <Col span={12}>
              <img src="/giftcard.jpeg" alt="image" width="500px" height="450px" />
            </Col>
          </Row>
        </div>
        <div className="d-block d-sm-none">
          <Row>
            <Col span={24}>
              <h3 className="center black fowe800 mato64">Ignite Change Through Shoe Donations</h3>
              <img src="giftcard.jpeg" alt="donate image" height="250px" width="400px" />
              <p className="center text14 gray fowe400 mato16 mabo16 pad16">
                Step into the World of Sustainable Fashion! Breathe new life into your old shoes
                through circularity. Make a meaningful contribution by donating your shoes a simple
                act with a profound impact. Together, lets champion waste reduction and reimagine
                the lifecycle of your footwear.
                <br></br>
                <br></br>
                Join our movement and embrace a brighter, eco-friendly tomorrow.
                <br></br>
                <Button className="btn_link_dark mato16" onClick={handleEmailButtonClick}>
                  👉 Click here to connect with us and ignite the journey of donation!
                </Button>
              </p>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default DonateModal
