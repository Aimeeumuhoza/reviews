import React, { FC, Fragment, useEffect, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import StarIcon from '@material-ui/icons/Star'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import Img from 'antd/lib/image'
import Link from 'next/link'
import styles from '../../../styles/Products.module.css'
import { Color, Product, ProductOption } from '../../../types'
import { rounded } from '../../../lib/utils/formatting.util'
// import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'
import { isBetweenDates } from '../../../lib/utils/date.util'
import { getDiscountEquivalent } from '../../../lib/utils/number.util'
import { HeartOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useAuth } from '../../../contexts/Auth'
import useSaveItemToWishlist from '../../../hooks/api/useSaveItemToWishlist'
import useHandleState from '../../../hooks/useHandleState'
import message from 'antd/lib/message'
import { getErrorFromUnknown } from '../../../lib/utils/error.util'
import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'

type ProductItemProp = {
  product: Product
}

const ProductItem: FC<ProductItemProp> = ({ product }) => {
  const router = useRouter()
  const authHook = useAuth()
  const convertCurrencyHook = useConvertCurrency()
  const { convertFrom } = useConvertCurrency()
  const [selectedProductOption, setSelectedProductOption] = useState<ProductOption>()
  const [selectedProductOptionIdx, setSelectedProductOptionIdx] = useState(0)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const saveItemToWishlistHook = useSaveItemToWishlist()
  const colors = product.productOptions?.map((p) => {
    if (p.dominantColors && p.dominantColors.length) return p.dominantColors[0]
    else return
  })

  const displayColors = colors?.map((c) => Color[c as string])

  useEffect(() => {
    if (product?.productOptions) {
      setSelectedProductOption(product?.productOptions[0])
    }
  }, [product?.productOptions])

  useHandleState(saveItemToWishlistHook, {
    onSuccess: (response) => {
      message.success(response.message)
    },
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
  })

  const onDisplayColorChanged = (idx: number): void => {
    if (product?.productOptions && product?.productOptions.length > idx) {
      setSelectedProductOptionIdx(idx)
      setSelectedProductOption(product?.productOptions[idx])
    }
  }

  return (
    <Row style={{ padding: '0px', borderRadius: '4px' }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Link href={`/products/details/${product.slug}`}>
          <Row style={{ cursor: 'pointer' }} className="mabo16">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Img
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onMouseMove={(e: any) => {
                  if (selectedProductOption?.imgUrls) {
                    const rect = e.target.getBoundingClientRect()
                    const elWidth = rect.width
                    const x = e.clientX - rect.left //x position within the element.
                    const currentMouseXPositionPercent = (100 * x) / elWidth
                    const possibleMouseHoverAreasInPercent =
                      100 / selectedProductOption?.imgUrls.length
                    for (let i = 0; i < selectedProductOption?.imgUrls.length; i++) {
                      const nextIdx = i + 1
                      const start = possibleMouseHoverAreasInPercent * i
                      const end = possibleMouseHoverAreasInPercent * nextIdx
                      if (
                        currentMouseXPositionPercent >= start &&
                        currentMouseXPositionPercent < end
                      ) {
                        setSelectedImageIdx(i)
                      }
                    }
                  }
                }}
                src={
                  product?.productOptions
                    ? selectedProductOption?.imgUrls[selectedImageIdx]
                    : '/uzuri_avatar.png'
                }
                className={styles.itemImage}
                preview={false}
              />
              {!selectedProductOption?.isInStock && (
                <span className={styles.outOfStock}>Sold Out</span>
              )}{' '}
              {/* {product.discountAmount > 0 && (
                <span className={styles.discountBadge}>{product.discountAmount}% OFF</span>
              )} */}
              {isBetweenDates(
                new Date(),
                new Date(product?.discountActivationDate || ''),
                new Date(product?.discountExpirationDate || ''),
              ) &&
                (product?.discountAmount ?? 0) > 0 && (
                  <span className={styles.discountBadge}>{product?.discountAmount}% OFF</span>
                )}
            </Col>
            <Col>
              <div></div>
            </Col>
          </Row>
        </Link>

        <Row className="mabo8" align="middle">
          <Col span={4}>
            <HeartOutlined
              style={{
                float: 'left',
                fontSize: '20px',
              }}
              onClick={() => {
                // console.log(selectedProductOption?.id,'wishList');
                if (authHook.isLoggedIn) {
                  const productVariationIds: any[] = []
                  productVariationIds.push(selectedProductOption?.id)
                  saveItemToWishlistHook.sendRequest({
                    productVariationIds,
                  })
                } else {
                  router.push('/login')
                }
              }}
            />
          </Col>
          <Col span={12}>
            <Link href={`/products/details/${product.slug}`}>{product.name}</Link>
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <Row justify="end">
              {displayColors && Array.isArray(displayColors)
                ? displayColors.map((d, i) => (
                    <Brightness1Icon
                      onClick={() => {
                        setSelectedImageIdx(0)
                        onDisplayColorChanged(i)
                      }}
                      key={i}
                      style={{ color: d }}
                      className={`${styles.bulletIcon_xs} color_picker ${
                        selectedProductOptionIdx === i ? 'color_picker_active' : ''
                      } ${!selectedProductOption?.isInStock ? 'color_picker_unavailable' : ''}`}
                    />
                  ))
                : ''}
            </Row>
          </Col>
        </Row>
        <Row className={styles.itemRow} align="middle">
          {/* <Col span={16}>
            {isBetweenDates(
              new Date(),
              new Date(product?.discountActivationDate),
              new Date(product?.discountExpirationDate),
            ) ? (
              <Fragment>
                <s className="text14 gray fowe400 mr-2">
                  {convertFrom(product.amount.toString()).toFixed(0)} USD
                </s>
                <span className="text14 black fowe700">
                  {getDiscountEquivalent(
                    convertFrom(product.amount.toString()),
                    product.discountAmount,
                    product?.discountType,
                  ).toFixed(0)}{' '}
                  USD
                </span>
              </Fragment>
            ) : (
              <span className="text14 black fowe700">
                {`${convertFrom(product?.amount.toString())} USD`}
              </span>
            )}
          </Col> */}
          <Col span={16}>
            {isBetweenDates(
              new Date(),
              new Date(product?.discountActivationDate),
              new Date(product?.discountExpirationDate),
            ) ? (
              <Fragment>
                <s className="text14 gray fowe400 mr-2">
                  {convertCurrencyHook.convertTo(product?.amount || 0)}
                </s>
                <span className="text14 black fowe700">
                  {convertCurrencyHook.convertTo(
                    getDiscountEquivalent(
                      product.amount,
                      product.discountAmount,
                      product.discountType,
                    ) || 0,
                  )}
                </span>
              </Fragment>
            ) : (
              <span className="text14 black fowe700">
                {convertCurrencyHook.convertTo(product?.amount || 0)}
              </span>
            )}
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <span className="black fowe700 text14">
              <StarIcon className={styles.starIconFilled} />
              {rounded(product.averageRating) ? rounded(product.averageRating) : 0}
              <span className="gray fowe300 text10">{` (${
                product.totalReviews ? product.totalReviews : 0
              })`}</span>
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ProductItem
