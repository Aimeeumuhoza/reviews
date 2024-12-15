import React from 'react'
import Drawer from 'antd/lib/drawer'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from 'antd/lib/divider'
import Image from 'antd/lib/image'
import Link from 'next/link'
import { useCart } from '../../../contexts/Cart'
import BagItem from '../BagItem'
import { useRouter } from 'next/router'
import { useAuth } from '../../../contexts/Auth'
import Button from 'antd/lib/button'
import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'

type BagDrawerProps = {
  onClose: () => void
  visible: boolean
}

const BagDrawer: React.FC<BagDrawerProps> = ({ onClose, visible }) => {
  const router = useRouter()
  const cartHook = useCart()
  const authHook = useAuth()
  const convertCurrencyHook = useConvertCurrency()
  return (
    <Drawer
      title={
        <Row>
          <Col flex="auto">
            <p className="text18 white fowe900 mabo8">MY CART ({cartHook.cartItems.length})</p>
            <p className="text12 white  fowe400 mabo0">
              Items in the bag are reserved for 60 minutes
            </p>
          </Col>
          <Col flex="none">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                cartHook.removeAllFromCart()
              }}>
              <DeleteIcon />
            </a>
          </Col>
        </Row>
      }
      className="bag_drawer"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      footer={
        <div className="bag_drawer_footer">
          <Row className="mabo0">
            <Col flex="auto">
              <p className="text12 black text-uppercase fowe700 mabo0">Total</p>
            </Col>
            <Col flex="none">
              {/* <p className="text12 black fowe700 mabo0">{cartHook.getCartTotal()} USD</p> */}
              {convertCurrencyHook.convertTo(cartHook.getCartTotal())}
            </Col>
          </Row>
          <Divider></Divider>

          <Row align="middle">
            <Col flex="auto">
              <Link href="/bag">
                <Button className="btn_primary_large" onClick={onClose}>
                  VIEW CART
                </Button>
              </Link>
            </Col>
            <Col flex="none">
              <Button
                className="btn_link_dark"
                onClick={() => {
                  if (authHook.isLoggedIn) {
                    router.push('/checkout')
                  } else {
                    router.push('/login?redirectTo=checkout')
                  }
                  onClose()
                }}>
                CHECKOUT
                <span style={{ verticalAlign: 'middle' }}>
                  <Image src="/chevron-right-black.svg" preview={false} style={{ width: '24px' }} />
                </span>
              </Button>
            </Col>
          </Row>
        </div>
      }>
      {cartHook.cartItems.map((cartItem, idx) => (
        <BagItem key={idx.toString()} cartIdx={idx} cartItem={cartItem} />
      ))}
    </Drawer>
  )
}

export default BagDrawer
