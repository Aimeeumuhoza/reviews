import React, { Fragment, useEffect, useState, useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useRouter } from 'next/router'
// import { ENV } from '../../config/constants'
import { ENV, GEO_LOCATION_API } from '../../config/constants'
import TopNavBar from './TopNavBar'
import {
  UserOutlined,
  ShoppingOutlined,
  SearchOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { useCart } from '../../contexts/Cart'
import Bag from '../Bag/BagDrawer'
import { throttle } from '../../utils/throttle'
import { useAuth } from '../../contexts/Auth'
import { message } from 'antd'
import useLogout from '../../hooks/api/useLogout'
import useHandleState from '../../hooks/useHandleState'
import Dropdown from 'antd/lib/dropdown'
import Avatar from 'antd/lib/avatar'
import Menu from 'antd/lib/menu'
import Link from 'next/link'
import Button from 'antd/lib/button'
import RepairModal from './Modals/Repair/RepairModel'
import ResellModal from './Modals/Resell/ResellModal'
import DonateModal from './Modals/Donate/DonateModal'
import Currency from '../../lib/enums/currency.enum'
import useConvertCurrency from '../../contexts/CurrencyConversion/useConvertCurrency'
import { IPGeoLocationResponse } from '../../types'
import { debounce } from 'lodash'
const UpdateNavBar = (): JSX.Element => {
  const router = useRouter()
  const cartHook = useCart()
  const authHook = useAuth()
  const logoutHook = useLogout()
  const onClose = (): void => setVisible(false)
  const [visible, setVisible] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [search, setSearch] = useState('')
  const [isRepairModalVisible, setIsRepairModalVisible] = useState(false)
  const [isResellModalVisible, setIsResellModalVisible] = useState(false)
  const [isDonateModalVisible, setIsDonateModalVisible] = useState(false)
  const convertCurrencyHook = useConvertCurrency()
  const [pickedCurrency, setPickedCurrency] = useState<Currency>()
  // const [displayLogin, setDisplayLogin] = useState(false)

  useHandleState(logoutHook, {
    onSuccess: () => authHook.logoutUserLocally(),
    onError: () => message.error('Could not log you out, try again later '),
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

  const setDefaultGeoLocationInfo = (): void => {
    convertCurrencyHook.changeLocation('N/A')
    setPickedCurrency(Currency.USD)
  }

  // const getCurrentLocation = (): void => {
  //   if (GEO_LOCATION_API) {
  //     axios
  //       .get(GEO_LOCATION_API)
  //       .then((res: IPGeoLocationResponse) => {
  //         const { currency, time_zone } = res.data

  //         if (res.status === 200) {
  //           convertCurrencyHook.changeLocation(time_zone?.name)
  //           Object.keys(Currency).includes(Currency[currency.code])
  //             ? setPickedCurrency(Currency[currency.code])
  //             : setPickedCurrency(Currency.USD)
  //         } else {
  //           setDefaultGeoLocationInfo()
  //         }
  //       })
  //       .catch(() => {
  //         setDefaultGeoLocationInfo()
  //       })
  //   } else {
  //     setDefaultGeoLocationInfo()
  //   }
  // }

  useEffect(() => {
    if (convertCurrencyHook.hasChangedCurrency !== undefined && pickedCurrency) {
      convertCurrencyHook.hasChangedCurrency === false &&
        convertCurrencyHook.changeCurrencyRate(pickedCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertCurrencyHook.hasChangedCurrency, pickedCurrency])

  // useEffect(() => {
  //   if (convertCurrencyHook.shouldUpdateLocation) {
  //     getCurrentLocation()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [convertCurrencyHook.shouldUpdateLocation])
  const handleSearch = useCallback(
    debounce((value) => {
      router.push({
        pathname: '/products',
        query: { 'pp_._name__contains': value },
      })
    }, 200),
    [],
  )
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission
    if (searchItem.trim()) {
      router.push({
        pathname: '/products',
        query: { 'pp_._name__contains': searchItem },
      })
    }
  }
  const menu = (
    <Menu className="shopper_user_settings">
      <Menu.Item key="0" className="mabo8">
        <Link href="/user-profile?tabIndex=1">
          <span className="text14 black fowe700 ">
            <UserOutlined className="my_icon" />
            <span className="ml-1">My Account</span>
          </span>
        </Link>
      </Menu.Item>

      <Menu.Item key="1" className="mabo8">
        <Link href="/user-profile?tabIndex=2">
          <span className="text14 black fowe700">
            <InfoCircleOutlined className="my_icon" />
            <span className="ml-1"> My Orders</span>
          </span>
        </Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item
        disabled={logoutHook.isLoading}
        key="4"
        style={{ textAlign: 'right' }}
        onClick={() => logoutHook.sendRequest()}>
        <Fragment>
          <span className="text14 gray fowe700 mr-2">
            {logoutHook.isLoading ? 'Logging out...' : 'Logout'}
          </span>
          {!logoutHook.isLoading && (
            <img src="/arrows-right.svg" alt="arrows-image" height="12px" />
          )}
        </Fragment>
      </Menu.Item>
    </Menu>
  )
  return (
    <Fragment>
      <TopNavBar />
      <Navbar
        expand="lg"
        bg="white"
        className="container-fluid uzuri_container"
        collapseOnSelect
        variant="white">
        <Container fluid>
          <Navbar.Brand
            href=""
            onClick={(e) => {
              e.preventDefault()
              router.push('/')
            }}>
            <img
              src={ENV === 'beta' ? '/logobeta.png' : '/uzuri_logo_black.svg'}
              alt="logo"
              className="logoImage"
              height={38}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto myNav">
              <Nav.Link style={{ display: 'flex' }}>
                <div className="d-block d-sm-none">
                  <Form className="searchform" onSubmit={handleSubmit}>
                    <input
                      type="search"
                      id="search-box"
                      placeholder="Search a product"
                      onChange={({ target }) => {
                        const value = target.value
                        setSearchItem(value)
                        handleSearch(value)
                      }}
                    />
                    <SearchOutlined
                      onClick={() =>
                        router.push({
                          pathname: '/products',
                          query: { 'pp_._name__contains': searchItem },
                        })
                      }
                      style={{ fontSize: '23px' }}
                    />
                  </Form>
                </div>
                <div className="d-block d-sm-none">
                  <ShoppingOutlined
                    style={{
                      fontSize: '30px',
                      verticalAlign: 'middle',
                    }}
                    onClick={(): void => setVisible(true)}
                  />
                  <span
                    className=""
                    style={{ marginLeft: '0px', marginRight: '7px', fontSize: '10px' }}>
                    ({cartHook.cartItems.length}){' '}
                  </span>
                </div>
                <div className="d-block d-sm-none">
                  {authHook.isLoggedIn ? (
                    <div className="menu_item ">
                      <Dropdown trigger={['click']} overlay={menu}>
                        <span>
                          <Avatar
                            shape="circle"
                            src={authHook.loggedInUser?.profilePictureImgUrl || '/logos.png'}
                            className="align-self-center mr-9"
                            size={32}
                          />
                          {/* <a
                            className="ant-dropdown-link text12 black fowe700 "
                            href=""
                            onClick={(e) => e.preventDefault()}>
                            {`${authHook.loggedInUser?.lastName}`}{' '}
                          </a> */}
                          <DownOutlined
                            style={{
                              fontSize: '10px',
                              marginRight: '-10px',
                            }}
                          />
                        </span>
                      </Dropdown>
                    </div>
                  ) : (
                    <div className="menu_item user_section ">
                      <a href="/login">
                        <UserOutlined
                          className=""
                          style={{
                            fontSize: '27px',
                            verticalAlign: 'middle',
                            marginTop: '-29px',
                          }}
                        />
                        {/* <Nav.Link href="/login" className="d-block d-sm-none">
                            <Button className="">Login</Button>
                          </Nav.Link> */}
                      </a>
                    </div>
                  )}
                </div>
              </Nav.Link>
              <NavDropdown title="Women" id="nav-dropdown">
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Women+sandals`)}>
                  Womens sandals
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Women%27s+gift+card`)}>
                  Womens gift card
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Women+Closed+Shoes`)}>
                  Womens Closed Shoes
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Women+bags`)}>
                  Womens bags
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Men" id="nav-dropdown">
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Men+sandals`)}>
                  Men sandals
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Kids" id="nav-dropdown">
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Kids+sandals`)}>
                  Kids sandals
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  onClick={() => router.replace(`/products?pt_._name__in=Kid%27s+gift+card`)}>
                  Kids gift card
                </NavDropdown.Item> */}
              </NavDropdown>

              <NavDropdown title="Circular center" id="nav-dropdown">
                <NavDropdown.Item onClick={handleClick}>Repair</NavDropdown.Item>
                {isRepairModalVisible && (
                  <RepairModal
                    isRepairModalVisible={isRepairModalVisible}
                    repairHandleOk={repairHandleOk}
                    handleCancel={repairHandleCancel}
                  />
                )}
                <NavDropdown.Item onClick={resellHandleClick}>Resell</NavDropdown.Item>
                {isResellModalVisible && (
                  <ResellModal
                    isResellModalVisible={isResellModalVisible}
                    resellCancelBtn={resellCancelBtn}
                    resellOkBtn={resellOkBtn}
                  />
                )}
                <NavDropdown.Item onClick={DonateHandleClick}>Donate</NavDropdown.Item>
                {isDonateModalVisible && (
                  <DonateModal
                    isDonateModalVisible={isDonateModalVisible}
                    cancelBtn={donateCancelBtn}
                    okBtn={donateOkBtn}
                  />
                )}
              </NavDropdown>
              <NavDropdown title="Gift cards" id="nav-dropdown">
                <NavDropdown.Item
                  onClick={() => router.replace(`/products?c_._name__in=Merchandise`)}>
                  Gift cards
                </NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link href="/login" className="d-block d-sm-none">
                <Button className="btn_primary_large">LogiYn</Button>
              </Nav.Link> */}
            </Nav>
            <div className="search_section hide_phone">
              <Form className="d-flex searchform " onSubmit={handleSubmit}>
                <input
                  type="search"
                  id="search-box"
                  placeholder="Search a product"
                  onChange={({ target }) => {
                    const value = target.value
                    setSearchItem(value)
                    handleSearch(value)
                  }}
                />
                <SearchOutlined
                  onClick={() =>
                    router.push({
                      pathname: '/products',
                      query: { 'pp_._name__contains': searchItem },
                    })
                  }
                  style={{ fontSize: '23px' }}
                />
              </Form>
            </div>

            <div className="login_section" style={{ marginRight: '20px' }}>
              {authHook.isLoggedIn ? (
                <div className="menu_item hide_phone ">
                  <Dropdown trigger={['click']} overlay={menu}>
                    <span>
                      <Avatar
                        shape="circle"
                        src={authHook.loggedInUser?.profilePictureImgUrl || '/logos.png'}
                        className="align-self-center mr-2"
                        size={32}
                      />
                      <a
                        className="ant-dropdown-link text12 black fowe700 "
                        href=""
                        onClick={(e) => e.preventDefault()}>
                        {`${authHook.loggedInUser?.lastName}`}{' '}
                      </a>
                      <DownOutlined
                        style={{
                          fontSize: '10px',
                          marginRight: '-10px',
                        }}
                      />
                    </span>
                  </Dropdown>
                </div>
              ) : (
                <div className="menu_item user_section ">
                  <a href="/login">
                    <UserOutlined
                      className="hide_phone"
                      style={{
                        fontSize: '27px',
                        verticalAlign: 'middle',
                        marginTop: '-4px',
                      }}
                    />
                    {/* <Nav.Link href="/login" className="d-block d-sm-none">
                      <Button className="btn_primary_large">LogiYn</Button>
                    </Nav.Link> */}
                  </a>
                </div>
              )}
            </div>

            <div style={{ marginRight: '20px' }}>
              <Dropdown
                overlay={
                  <Menu style={{ fontSize: 17 }}>
                    {Object.keys(Currency).map((currency, idx) => (
                      <Menu.Item
                        key={idx + 1}
                        className="text14 black text-left"
                        onClick={() => {
                          convertCurrencyHook.changeCurrencyRate(Currency[currency])
                        }}>
                        {currency}
                      </Menu.Item>
                    ))}
                  </Menu>
                }>
                <span style={{ marginLeft: '0px' }}>
                  {convertCurrencyHook.currentCurrency}
                  <DownOutlined style={{ fontSize: '10px', marginTop: '4px' }} />
                </span>
              </Dropdown>
            </div>

            <div className="cart_section hide_phone">
              <ShoppingOutlined
                style={{
                  fontSize: '30px',
                  verticalAlign: 'middle',
                }}
                onClick={(): void => setVisible(true)}
              />
              <span style={{ marginLeft: '0px', fontSize: '10px' }}>
                ({cartHook.cartItems.length}){' '}
              </span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Bag onClose={onClose} visible={visible} />
    </Fragment>
  )
}

export default UpdateNavBar
