import React, { Fragment } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

const UpdatedFooter = (): JSX.Element => {
  //   const convertCurrencyHook = useConvertCurrency()

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
      {/* <!-- Site footer -->  */}
      <footer className="container-fluid site-footer uzuri_footer">
        <div className="container-fluid uzuri_container">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <h6>About</h6>
              <p className="text-justify">
                UZURI K&Y is an African inspired eco-friendly shoe brand using the 4R technology of
                recycling, reusing, recovering and reducing car tires to produce eco friendly
                footwear...
                <a href="https://corporate.uzuriky.com/about" target="blank">
                  <ins>read more</ins>
                </a>
              </p>
            </div>

            <div className="col-xs-6 col-md-4">
              <ul className="footer-links">
                <h6>Contact</h6>
                <li>
                  <strong>Phone:</strong> +250 780 460 007
                </li>
                <li>
                  <strong>Customer: </strong>customersupport@uzuriky.com
                </li>
                <li>
                  <strong>Corporate:</strong> contact@uzuriky.com
                </li>
                <li>
                  <strong>Location:</strong> Kigali, Rwanda
                </li>
                <li>
                  <strong>P.O. BOX:</strong> 5626
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-4">
              <ul className="footer-link">
                <h6>Quick Links</h6>
                <li>
                  <a href="https://uzuriky.com/products?pp_._productSection=WOMEN">Shopping</a>
                </li>
                {/* <li>
                  <a href="https://uzuriky.com/products?pp_._productSection=WOMEN">Product</a>
                </li> */}
                <li>
                  <a href="https://corporate.uzuriky.com/privacy" target="blank">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://corporate.uzuriky.com/tcs" target="blank">
                    Terms & conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr></hr>
        </div>
        <div className="container-fluid uzuri_container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2024 All Rights Reserved by
                <a href="#"> UZURI K&Y</a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <p>Pay with :</p>
                </li>
                <li>
                  <div className="facebook">
                    <img src="/MTN-MoMo.png" alt="sss" height={16} />
                  </div>
                </li>
                <li>
                  <div className="twitter">
                    <img src="/mastercard.png" alt="sss" height={16} />
                  </div>
                </li>
                <li>
                  <div className="dribbble">
                    <img src="/visa.png" alt="sss" height={16} />
                  </div>
                </li>
                <li>
                  <div className="linkedin">
                    <img src="/mpesa.png" alt="sss" height={16} />
                  </div>
                </li>
                <li>
                  <div className="linkedin">
                    <img
                      src="/americanExpress.png"
                      alt="sss"
                      height={16}
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default UpdatedFooter
