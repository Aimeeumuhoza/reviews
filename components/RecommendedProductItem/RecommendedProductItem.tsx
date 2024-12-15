import React, { useEffect, useState, Fragment } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import styles from '../../styles/Products.module.css'
import StarIcon from '@material-ui/icons/Star'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import Img from 'antd/lib/image'
import Link from 'next/link'
import { Color, Product, ProductOption } from '../../types'
import { rounded } from '../../lib/utils/formatting.util'
import useConvertCurrency from '../../contexts/CurrencyConversion/useConvertCurrency'

type RecommendedProductItemProp = {
  product: Product
}

const RecommendedProductItem: React.FC<RecommendedProductItemProp> = ({ product }) => {
  const { convertFrom } = useConvertCurrency()
  const [selectedProductOption, setSelectedProductOption] = useState<ProductOption>()
  const [selectedProductOptionIdx, setSelectedProductOptionIdx] = useState(0)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
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

  const onDisplayColorChanged = (idx: number): void => {
    if (product?.productOptions && product?.productOptions.length > idx) {
      setSelectedProductOptionIdx(idx)
      setSelectedProductOption(product?.productOptions[idx])
    }
  }

  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mabo16 mato16">
      <Row style={{ padding: '0px', borderRadius: '4px' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Link href={`/products/details/${product.slug}`}>
            <Row style={{ cursor: 'pointer' }} className="mabo16">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Img // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                )}
              </Col>
            </Row>
          </Link>

          <Row className="mabo8" align="middle">
            <Col span={16}>
              <a
                href={`/products/details/${product.slug}`}
                style={{ cursor: 'pointer' }}
                className="text18 fowe500 black mabo0">
                {product.name}
              </a>
            </Col>
            <Col span={8} style={{ textAlign: 'end' }}>
              <Row justify="end">
                {displayColors && Array.isArray(displayColors)
                  ? displayColors.map((d, i) => (
                      <Brightness1Icon
                        onClick={() => {
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
            <Col span={12}>
              <span className="text14 black fowe700">
                {new Date(product?.discountExpirationDate) > new Date() ? (
                  <Fragment>
                    <s className="text10 fowe300 gray mr-2">
                      {convertFrom(product.amount.toString())}
                    </s>
                    {convertFrom((product.amount - product.discountAmount).toString())}
                  </Fragment>
                ) : (
                  <Fragment>{convertFrom(product.amount.toString())}</Fragment>
                )}
              </span>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <span className="black fowe700 text14">
                <StarIcon className={styles.starIconFilled} />{' '}
                {rounded(product.averageRating) ? rounded(product.averageRating) : 0}
                <span className="gray fowe300 text10">{` (${
                  product.totalReviews ? product.totalReviews : 0
                })`}</span>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

export default RecommendedProductItem
