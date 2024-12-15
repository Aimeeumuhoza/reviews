import React, { Fragment } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Img from 'antd/lib/image'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import styles from '../../../styles/Products.module.css'
import { WishlistItem } from '../../../types'
import { mapDominantColorToClassName } from '../../../lib/utils/style.util'
import { isBetweenDates } from '../../../lib/utils/date.util'
import ProductColor from '../../../lib/enums/product-color.enum'
// import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import useRemoveItemFromWishlist from '../../../hooks/api/useRemoveItemFromWishlist'
import { Button } from 'antd'
import useHandleState from '../../../hooks/useHandleState'
import { useRouter } from 'next/router'
import { DiscountType } from '../../../lib/enums/discount-type.enum'
import { getDiscountEquivalent } from '../../../lib/utils/number.util'
import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'

type WishlistListItemProps = {
  wishlistItem: WishlistItem
  onRemoveSuccess: () => void
}

const WishlistListItem: React.FC<WishlistListItemProps> = (props) => {
  const router = useRouter()
  const convertCurrencyHook = useConvertCurrency()
  const { convertFrom } = useConvertCurrency()
  const removeItemFromWishlistHook = useRemoveItemFromWishlist()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColorStyles = (color: ProductColor | undefined): any => {
    return [styles[mapDominantColorToClassName(color)], styles.bulletIcon_xs]
  }

  useHandleState(removeItemFromWishlistHook, { onSuccess: () => props?.onRemoveSuccess() })

  return (
    <Fragment>
      <Row gutter={32} className={styles.wishlisted_item}>
        <Col
          xs={{ flex: 'auto', order: 1 }}
          sm={{ flex: 'auto', order: 1 }}
          md={{ flex: 'none', order: 1 }}
          lg={{ flex: 'none', order: 1 }}
          xl={{ flex: 'none', order: 1 }}>
          <Img
            onClick={() =>
              router.push(
                `/products/details/${props.wishlistItem.productVariation.productParent.slug}`,
              )
            }
            style={{ cursor: 'pointer' }}
            src={
              props.wishlistItem.productVariation
                ? props.wishlistItem.productVariation.imgUrls[0]
                : '/uzuri_avatar.png'
            }
            className={styles.itemImageOrder}
            preview={false}
          />
          {!props.wishlistItem.productVariation.isInStock && (
            <span className={styles.outOfStock}>Sold Out</span>
          )}
        </Col>
        <Col
          xs={{ flex: 'auto', order: 3 }}
          sm={{ flex: 'auto', order: 3 }}
          md={{ span: 14, order: 2 }}
          lg={{ span: 14, order: 2 }}
          xl={{ span: 14, order: 2 }}>
          <Row>
            <Col span={24}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(
                    `/products/details/${props.wishlistItem.productVariation.productParent.slug}`,
                  )
                }}
                style={{ cursor: 'pointer' }}>
                <p className="text16 black fowe500 mabo8">
                  {props.wishlistItem.productVariation.productParent.name}
                </p>
              </a>
            </Col>
          </Row>

          <Row className={styles.itemRow} align="middle">
            <Col span={24}>
              <p className="text14 black fowe700">
                {isBetweenDates(
                  new Date(),
                  props.wishlistItem.productVariation.productParent.discountActivationDate,
                  props.wishlistItem.productVariation.productParent.discountExpirationDate,
                ) && (
                  <Fragment>
                    <s className="text12 gray mr-2">
                      {convertCurrencyHook.convertTo(
                        props.wishlistItem.productVariation.productParent?.amount,
                      )}
                    </s>
                  </Fragment>
                )}
                {convertCurrencyHook.convertTo(
                  getDiscountEquivalent(
                    props.wishlistItem.productVariation.productParent?.amount || 0,
                    props.wishlistItem.productVariation.productParent?.discountAmount || 0,
                    props.wishlistItem.productVariation.productParent?.discountType ||
                      DiscountType.AMOUNT,
                  ) || 0,
                )}
              </p>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col flex="none">
              <p className="text12 black fowe700 mabo0">Color:</p>
            </Col>
            <Col flex="auto">
              <Row gutter={16}>
                {props.wishlistItem.productVariation?.dominantColors.map((color, idx) => {
                  return <Brightness1Icon key={idx.toString()} className={getColorStyles(color)} />
                })}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          xs={{ flex: 'auto', order: 2 }}
          sm={{ flex: 'auto', order: 2 }}
          md={{ flex: 'none', order: 3 }}
          lg={{ flex: 'none', order: 3 }}
          xl={{ flex: 'none', order: 3 }}>
          <Button
            loading={removeItemFromWishlistHook.isLoading}
            onClick={() =>
              removeItemFromWishlistHook.sendRequest({ wishlistItemId: props.wishlistItem.id })
            }
            className="btn_link"
            style={{ border: '1px solid #D0D8E8' }}>
            {!removeItemFromWishlistHook.isLoading && <CloseOutlinedIcon />}
          </Button>
        </Col>
        {/* 
                  TODO: GET FALLBACK IMAGE TO DISPLAY WHEN IMAGE IS NOT FOUND
  
                <Col span={12} style={{ textAlign: 'end' }}>
                  <span className="black fowe700 text10">
                    <StarIcon className={styles.starIconFilled} /> 3.5
                  </span>
                </Col>
              </Row>
            </Col> */}
      </Row>
    </Fragment>
  )
}

export default WishlistListItem
