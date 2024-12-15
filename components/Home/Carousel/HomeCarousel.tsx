import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Row, Col } from 'antd'

const HomeCarousel: React.FC = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div
            style={{
              marginTop: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
            }}>
            <h2 className="black fowe700 mabo16">UZURI K&Y Trends</h2>
            <br></br>
            <p>
              Immerse yourself in the world of fashion as our best-selling sandals lead the way with
              unmatched elegance
            </p>
            <a href="/products?pt_._name__in=Women+sandals" className="fowe800 text16 mato16">
              <br></br>
              <ins>Shop our best sellers</ins>
            </a>
          </div>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <div className="carousel_container">
            <Carousel
              responsive={responsive}
              autoPlay={true}
              infinite={true}
              keyBoardControl={true}>
              <div className="card">
                <a href="/products?pp_._name__contains=dida">
                  <img className="product--image" src="/back1.jpg" alt="img" />
                  <p className="price text16 fowe700 mato16">Dida</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=roda">
                  <img className="product--image" src="/back7.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Roda</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=lila">
                  <img className="product--image" src="/back5.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Lila</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=fleura">
                  <img className="product--image" src="/back4.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Fleura</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=xara">
                  <img className="product--image" src="/back8.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Xara</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=cassandra">
                  <img className="product--image" src="/back3.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Cassandra</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=olivia">
                  <img className="product--image" src="/back2.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Olivia</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=amelia">
                  <img className="product--image" src="/back10.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Amelia</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=tatiana">
                  <img className="product--image" src="/back6.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Tatiana</p>
                </a>
              </div>
              <div className="card">
                <a href="/products?pp_._name__contains=gaga">
                  <img className="product--image" src="/back9.jpg" alt="img" />
                  <p className="price text16 block fowe700  mato16">Gaga</p>
                </a>
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeCarousel
