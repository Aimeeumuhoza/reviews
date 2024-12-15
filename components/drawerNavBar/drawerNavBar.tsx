import { Button, Col, Divider, Drawer, Row } from 'antd'
import Link from 'next/link'

const DrawerNavbar = (props): JSX.Element => {
  const onClose = () => {
    props.setVisible(false)
  }

  return (
    <>
      <Drawer
        placement={props.placement}
        onClose={onClose}
        visible={props.visible}
        title={
          <Row>
            <Col flex="auto">
              <a href="/user-profile?tabIndex=1">
                <i
                  className="fa-solid fa-circle-user white"
                  style={{
                    fontSize: '50px',
                    float: 'right',
                  }}></i>
              </a>

              {/* <span>
              <a
                className="text16 black fowe700 mato16"
                href=""
                onClick={(e) => e.preventDefault()}>
                {`${authHook.loggedInUser?.firstName} ${authHook.loggedInUser?.lastName}`}{' '}
              </a>
              </span> */}
            </Col>
            <Col flex="none"></Col>
          </Row>
        }>
        <div className="menu_drawer text14 fowe700">
          <Link href="/products?pp_._productSection=WOMEN">
            <p>Women</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?pp_._productSection=MEN">
            <p>Men</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?pp_._productSection=KIDS">
            <p>Kids</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?c_._name__in=Closed shoes">
            <p>Shoes</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?c_._name__in=Sandals">
            <p>Sandals</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?c_._name__in=Merchandise">
            <p>Merchandise</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?c_._name__in=Warmz">
            <p>Warmz</p>
          </Link>
          <Divider></Divider>
          <Link href="/products?c_._name__in=Bags">
            <p>Bags</p>
          </Link>
          <Link href="/login">
            <Button className="btn_drawer mato8">LOGIN</Button>
          </Link>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerNavbar
