import { Fragment, useEffect, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from '../../styles/IndexPage.module.css'
import ProductItem from '../Products/ProductItem'
import useGetBanners from '../../hooks/api/useGetBanners'
import { Divider, Spin } from 'antd'
import { Banner, Product } from '../../types'
import useGetFeaturedProducts from '../../hooks/api/useGetFeaturedProducts'
import useHandleState from '../../hooks/useHandleState'
import GoogleMap from './GoogleMap/googleMap'
import HomeCarousel from './Carousel/HomeCarousel'
import RepairModal from '../Navbar/Modals/Repair/RepairModel'
import ResellModal from '../Navbar/Modals/Resell/ResellModal'
import DonateModal from '../Navbar/Modals/Donate/DonateModal'

const Home: React.FC = () => {
  const router = useRouter()
  const [firstPriorityBanner, setFirstPriorityBanner] = useState<Banner>()
  const [secondPriorityBanner, setSecondPriorityBanner] = useState<Banner>()
  const [thirdPriorityBanner, setThirdPriorityBanner] = useState<Banner>()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>()
  const getBannersHook = useGetBanners()
  const getFeaturedProductsHook = useGetFeaturedProducts()
  const [isRepairModalVisible, setIsRepairModalVisible] = useState(false)
  const [isResellModalVisible, setIsResellModalVisible] = useState(false)
  const [isDonateModalVisible, setIsDonateModalVisible] = useState(false)

  useEffect(() => {
    getBannersHook.sendRequest()
    getFeaturedProductsHook.sendRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (getBannersHook.items.length > 0) {
      setFirstPriorityBanner(getBannersHook.items.find((item) => item.priorityLevel === 1))
      setSecondPriorityBanner(getBannersHook.items.find((item) => item.priorityLevel === 2))
      setThirdPriorityBanner(getBannersHook.items.find((item) => item.priorityLevel === 3))
    }
  }, [getBannersHook.items])

  useHandleState<Product[]>(getFeaturedProductsHook, {
    onSuccess: (response) => {
      setFeaturedProducts(response.payload)
    },
  })
  const DonateHandleClick = () => {
    setIsDonateModalVisible(true)
  }

  const handleClick = () => {
    setIsRepairModalVisible(true)
  }

  const repairHandleOk = (): void => {
    setIsRepairModalVisible(false)
    router.push('/')
  }

  const repairHandleCancel = (): void => {
    setIsRepairModalVisible(false)
  }

  const resellHandleClick = () => {
    setIsResellModalVisible(true)
  }
  const resellOkBtn = (): void => {
    setIsResellModalVisible(false)
    router.push('/')
  }
  const resellCancelBtn = (): void => {
    setIsResellModalVisible(false)
  }

  const donateCancelBtn = (): void => {
    setIsDonateModalVisible(false)
  }

  const donateOkBtn = (): void => {
    setIsDonateModalVisible(false)
  }
  return (
    <Fragment>
      <div className="uzuri_container_home_page">
        <div>
          <Spin spinning={getBannersHook.isLoading}>
            {firstPriorityBanner && (
              <Row
                justify="end"
                style={{ backgroundImage: `url(${firstPriorityBanner.imgUrl})`, height: '750px' }}
                className={style.arrival_pic}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: '48px' }}>
                  <div className={style.arrival_card}>
                    <p className="white fowe800 text36">{firstPriorityBanner?.title}</p>
                    <p className="text12 white fowe500 mabo32">
                      {firstPriorityBanner?.description}
                    </p>
                    <Button
                      onClick={() => router.push(firstPriorityBanner.callToActionUrlQuery)}
                      className="btn_secondary_white text-uppercase">
                      {firstPriorityBanner?.callToActionText}
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Spin>
        </div>
      </div>
      <div className="uzuri_container">
        <div className="uzuri_section">
          <Row justify="center" className="mabo32">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <img src="/SMILE@2x.png" alt="home_emoji" width="100%" />
            </Col>
          </Row>
        </div>
      </div>
      <HomeCarousel />

      <div className="uzuri_container">
        <div className="uzuri_section">
          <Row gutter={24}>
            {secondPriorityBanner && (
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div
                  className={style.offPart}
                  style={{ backgroundImage: `url(${secondPriorityBanner.imgUrl})` }}>
                  <div className={style.offPart_overlay}>
                    <span className="white text36 block fowe900 mabo16">
                      {secondPriorityBanner?.title}
                    </span>
                    {/* <span className="white text24 block mabo32">OFF</span> */}
                    <span className="white text12 block mabo32">
                      {secondPriorityBanner?.description}
                    </span>
                    <button
                      onClick={() => router.push(secondPriorityBanner.callToActionUrlQuery)}
                      className="btn_secondary_white">
                      {secondPriorityBanner?.callToActionText}
                    </button>
                  </div>
                </div>
              </Col>
            )}

            <Col xs={24} sm={24} md={16} lg={16} xl={16} style={{ height: '100%' }}>
              {thirdPriorityBanner && (
                <Row
                  className={style.best_of}
                  justify="end"
                  style={{ backgroundImage: `url(${thirdPriorityBanner.imgUrl})` }}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={style.offPart_overlay}>
                      {/* <span className="white text24 block ">BEST OF</span> */}
                      <span className="white text36 block fowe900 mabo16">
                        {thirdPriorityBanner?.title}
                      </span>
                      <span className="white text12 block mabo32">
                        {thirdPriorityBanner?.description}
                      </span>
                      {/* <span className="white text12 block mabo64">made in Green</span> */}

                      <button
                        onClick={() => router.push(thirdPriorityBanner?.callToActionUrlQuery)}
                        className="btn_secondary_white">
                        {thirdPriorityBanner?.callToActionText}
                      </button>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </div>
      </div>

      <div className="container-fluid blog" style={{ background: '#000000', height: '400px' }}>
        <div className="uzuri_container mabo32">
          <div className="uzuri_section">
            <Row align="middle">
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <div className="circular_center">
                  <h1 className="white">The</h1>
                  <h1 className="white">Circular Center</h1>
                  <p className="grey mato8">
                    Embracing Sustainability: Our pledge to circularity drives us empowering
                    customers to maximize the value of our products over time.<br></br>Explore our
                    range of circularity services designed to foster reusability and recycling of
                    pre-loved UZURI K&Y items.
                  </p>
                </div>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Row justify="center">
                  <Divider style={{ backgroundColor: '#ffffff' }}></Divider>

                  <Col xs={8} sm={8} md={8} lg={7}>
                    <a
                      role="button"
                      tabIndex={0}
                      onClick={handleClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleClick()
                        }
                      }}
                      className="white">
                      <p className="white">Repair</p>
                    </a>
                    {isRepairModalVisible && (
                      <RepairModal
                        isRepairModalVisible={isRepairModalVisible}
                        repairHandleOk={repairHandleOk}
                        handleCancel={repairHandleCancel}
                      />
                    )}
                  </Col>

                  <Col xs={8} sm={8} md={8} lg={7}>
                    <a
                      role="button"
                      tabIndex={0}
                      onClick={resellHandleClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          resellHandleClick()
                        }
                      }}
                      className="white">
                      <p className="white">Resell</p>
                    </a>
                    {isResellModalVisible && (
                      <ResellModal
                        isResellModalVisible={isResellModalVisible}
                        resellCancelBtn={resellCancelBtn}
                        resellOkBtn={resellOkBtn}
                      />
                    )}
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={7}>
                    <a
                      role="button"
                      tabIndex={0}
                      onClick={DonateHandleClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          DonateHandleClick()
                        }
                      }}
                      className="white">
                      <p className="white">Donation</p>
                    </a>
                    {isDonateModalVisible && (
                      <DonateModal
                        isDonateModalVisible={isDonateModalVisible}
                        cancelBtn={donateCancelBtn}
                        okBtn={donateOkBtn}
                      />
                    )}
                  </Col>
                  <Divider style={{ backgroundColor: '#ffffff' }}></Divider>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className="container-fluid uzuri_container" style={{ background: '#F4F6F9' }}>
        <Row className="uzuri_section">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row align="middle" className="mabo32">
              <Col flex="auto">
                <p className="fowe700 text24 mabo0">FEATURED ITEMS</p>
              </Col>
              <Col flex="none" style={{ textAlign: 'right' }}>
                <Link href="/products">
                  <Button className="btn_link_dark">
                    SEE ALL PRODUCTS
                    <img src="/chevron-right-black.svg" height="20px" alt="icon" />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row gutter={32}>
              {featuredProducts?.map((product, idx) => (
                <Col xs={12} sm={12} md={6} lg={6} xl={6} key={idx}>
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      <div className="uzuri_container">
        <div className="uzuri_section">
          <Row align="middle" className=" mabo32">
            <Col flex="auto">
              <p className="black fowe700 text24 mato6 mabo0">SHOP AT THE STORES</p>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row>
                <Col
                  span={12}
                  className="d-flex"
                  style={{
                    height: '225px',
                    border: '0.5px solid #d0d8e8',
                    width: '100%',
                    padding: '48px 48px',
                  }}>
                  <div className="align-self-center">
                    <p className="fowe700 black text16">Kigali Heights Store</p>
                    <p className="black gray fowe700 text12">Kimihurura</p>
                    <a
                      href="https://www.google.com/maps/place/UZURI+K%26Y/@-1.9523329,30.0905217,17z/data=!3m1!4b1!4m5!3m4!1s0x19dca6f3a18807df:0x176a403f826c64b2!8m2!3d-1.9523383!4d30.0927104"
                      className="fowe700 black text14 mabo0">
                      <u>KG 7 Ave</u>
                    </a>
                  </div>
                </Col>

                <Col
                  span={12}
                  className="d-flex"
                  style={{
                    height: '225px',
                    border: '0.5px solid #d0d8e8',
                    width: '100%',
                    padding: '48px 48px',
                  }}>
                  <div className="align-self-center">
                    <p className="fowe700 black text16">Kigali City Mall Store</p>
                    <p className="black gray fowe700 text12">Nyarugenge</p>
                    <a
                      href="https://www.google.com/maps/place/UZURI+K%26Y+experience+store+(Nyarugenge)/@-1.946035,30.0579336,17z/data=!3m1!4b1!4m5!3m4!1s0x19dca58335f4d7e9:0x367d3b8d38a83fe7!8m2!3d-1.9460404!4d30.0601223"
                      className="fowe700 black text14 mabo0">
                      <u>KN 4 Ave</u>
                    </a>
                  </div>
                </Col>

                <Col
                  span={12}
                  className="d-flex"
                  style={{
                    height: '225px',
                    border: '0.5px solid #d0d8e8',
                    width: '100%',
                    padding: '48px 48px',
                  }}>
                  <div className="align-self-center">
                    <p className="fowe700 black text16">Gahanga factory</p>
                    <p className="black gray fowe700 text12">Gahanga</p>
                    <a
                      href="https://www.google.com/maps/place/UZURI+K%26Y+Headquarters/@-2.0359623,30.1008575,15z/data=!4m6!3m5!1s0x19dca993077fa569:0xfacfd6c0013df93a!8m2!3d-2.0359623!4d30.1008575!16s%2Fg%2F11qprks0rr?hl=en&entry=ttu"
                      className="fowe700 black text14 mabo0">
                      <u>KK 15 Rd</u>
                    </a>
                  </div>
                </Col>

                <Col
                  span={12}
                  className="d-flex"
                  style={{
                    height: '225px',
                    border: '0.5px solid #d0d8e8',
                    width: '100%',
                    padding: '48px 48px',
                  }}>
                  <div className="align-self-center">
                    <p className="fowe700 black text16">UZURI K&Y Village market </p>
                    <p className="black gray fowe700 text12">Kenya</p>
                    <a
                      href="https://www.google.com/maps/place/UZURI+K%26Y+VILLAGE+MARKET/@-1.2292743,36.8047969,15z/data=!4m6!3m5!1s0x182f176faabbff4f:0xed32f792804a92ae!8m2!3d-1.2292743!4d36.8047969!16s%2Fg%2F11tg098c6d?hl=en&entry=ttu"
                      className="fowe700 black text14 mabo0">
                      <u>Village Rd</u>
                    </a>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div>
                <GoogleMap />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  )
}
export default Home
