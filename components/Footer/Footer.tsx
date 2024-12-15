import React, { Fragment } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import useConvertCurrency from '../../contexts/CurrencyConversion/useConvertCurrency'
import Link from 'next/link'

const Footer = (): JSX.Element => {
  const convertCurrencyHook = useConvertCurrency()

  return (
    <Fragment>
      <div
        className="container-fluid uzuri_container_footer"
        style={{ backgroundColor: '#262626', padding: '32px 16px' }}>
        <Row align="middle">
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <img
              src="/uzuri_logo_white.svg"
              alt="Picture of the author"
              className="hide_phone"
              width={132}
              height={42}
            />
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Row justify="center">
              <a href="https://twitter.com/uzuriky" target="blank">
                <i className="fab fa-twitter white socio_icon "></i>
              </a>

              <a href="https://www.facebook.com/uzuriky?_rdc=1&_rdr" target="blank">
                <i className="fa fa-facebook-square white socio_icon"></i>
              </a>
              <a href="https://www.linkedin.com/company/uzuri-k-y/" target="blank">
                <i className="fa fa-linkedin white socio_icon"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCLG6ZBiTzhqB77IlFPTBxhA" target="blank">
                <i className="fab fa-youtube white socio_icon"></i>
              </a>
              <a href="https://www.instagram.com/uzuriky/" target="blank">
                <i className="fab fa-instagram white socio_icon"></i>
              </a>
              <a href="https://www.pinterest.com/uzuriky1/" target="blank">
                <i className="fab fa-pinterest white socio_icon"></i>
              </a>
            </Row>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            style={{ textAlign: 'right', verticalAlign: 'middle' }}>
            <a rel="noreferrer" href="https://corporate.uzuriky.com/">
              <span className="white text14 fowe500">
                <strong>ABOUT UZURI K&Y</strong>
                {/* TO DO */}
                <span style={{ verticalAlign: 'middle' }}>
                  <img
                    src="/chevron-right.svg"
                    alt="icon_arrow"
                    style={{ width: '48px', marginBottom: '5px' }}
                  />
                </span>
              </span>
            </a>
          </Col>
        </Row>
      </div>
      <div className="container-fluid uzuri_section" style={{ backgroundColor: '#000' }}>
        <div className="container-fluid uzuri_container">
          <Row>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="mabo16 mato16">
              <Row className="mabo16">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="text12 white fowe700">©2023 UZURI K&Y</p>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mabo32">
                  <p className="text12 grey text-left">
                    Developed by{' '}
                    <Link href="https://corporate.uzuriky.com/">
                      <span className="white fowe700">
                        <ins>UZURI K&Y</ins>
                      </span>
                    </Link>
                  </p>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="">
                  <Link href="https://corporate.uzuriky.com/tcs">
                    <p className="text12 white fowe700 underline">
                      <ins>Terms and Conditions</ins>
                    </p>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8} className="mabo16 mato16">
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mabo16">
                  <p className="text14 white fowe700">CONTACT US</p>
                </Col>
              </Row>
              <Row className="mabo16">
                <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                  <p className="text12 white fowe700">Phone:</p>
                </Col>
                <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                  <p className="text12 grey text-left">+250 780 460 007</p>
                </Col>
                <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                  <p className="text12 white fowe700">Customer:</p>
                </Col>
                <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                  <p className="text12 grey">customersupport@uzuriky.com</p>
                </Col>
                <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                  <p className="text12 white fowe700">Corporate:</p>
                </Col>
                <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                  <p className="text12 grey">contact@uzuriky.com</p>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="text12 grey">Kigali, Rwanda</p>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8} className="mabo16 mato16">
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mabo16">
                  <p className="text14 white fowe700">SHOPPING</p>
                </Col>
              </Row>
              <Row className="mabo16">
                <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                  <p className="text12 white fowe700">Location:</p>
                </Col>
                <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                  <p className="text12 grey">{`${convertCurrencyHook.currentLocation}`}</p>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Row gutter={16} align="middle" className="mabo16">
                    <Col flex="none">
                      <p className="text12 grey mabo0">Pay with:</p>
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
                      <img
                        src="/americanExpress.png"
                        alt="sss"
                        height={16}
                        style={{ borderRadius: '2px' }}
                      />
                    </Col>
                  </Row>
                  {/* <Row gutter={16} align="middle">
                    <Col flex="none">
                      <p className="text12 grey mabo0">Shipping with:</p>
                    </Col>

                    <Col flex="none">
                      <img src="/dhl.png" alt="sss" height={16} width={36} />
                    </Col>
                  </Row> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  )
}

export default Footer
