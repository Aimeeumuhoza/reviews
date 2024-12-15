import React, { Fragment, useEffect, useState } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import { message } from 'antd'
import Reviews from './Reviews'
import { useRouter } from 'next/router'
import AlsoLikeSection from './AlsoLikeSection'
import ProductDetailsDescriptionView from './ProductDetailsDescriptionView'
import useGetProductBySlug from '../../../hooks/api/useGetProductBySlug'
import { ProductOption, ProductWithFullDetails } from '../../../types'
import useHandleState from '../../../hooks/useHandleState'
import DynamicBreadcrumb from '../../DynamicBreadcrumb'
import { capitalizeFirstLetter } from '../../../lib/utils/formatting.util'
import GiftCards from '../../GiftCards'
import useConvertCurrency from '../../../contexts/CurrencyConversion/useConvertCurrency'

const ProductDetails: React.FC = () => {
  const router = useRouter()
  const getProductBySlugHook = useGetProductBySlug()
  const { convertFrom } = useConvertCurrency()
  const [product, setProduct] = useState<ProductWithFullDetails>()
  const [selectedProductOption, setSelectedProductOption] = useState<ProductOption>()
  const [productSlug, setProductSlug] = useState<string>((router.query?.slug as string) || '')

  useEffect(() => {
    if (router.query.slug) {
      setProductSlug(router.query?.slug as string)
    }
  }, [router.query])

  useEffect(() => {
    if (productSlug) {
      getProductBySlugHook.sendRequest(productSlug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug])

  useHandleState<ProductWithFullDetails>(getProductBySlugHook, {
    // onSuccess: (response) => {
    //   const amount = convertFrom(response.payload.amount.toString())
    //   setProduct({
    //     ...response.payload,
    //     amount: +amount,
    //   })
    //   if (response.payload?.productOptions) {
    //     setSelectedProductOption(response.payload?.productOptions[0])
    //   }
    // },
    onSuccess: (response) => {
      setProduct(response.payload)
      if (response.payload?.productOptions) {
        setSelectedProductOption(response.payload?.productOptions[0])
      }
    },
    onError: (error) => {
      message.error(error)
    },
  })

  return (
    <Fragment>
      {/* <ReviewAlert /> */}
      <div className="container">
        <Row gutter={48}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="mato32 mabo32">
              <Row gutter={16} align="middle" className="mabo32">
                <Col flex="auto">
                  <DynamicBreadcrumb
                    items={[
                      { name: 'Home', path: '/products' },
                      {
                        name: `${capitalizeFirstLetter(
                          product?.productSection?.toLocaleLowerCase(),
                        )}`,
                        path: '/products?pp_._productSection=WOMEN',
                      },
                      {
                        name: `${product?.name}`,
                        path: `/products/details/${product?.slug}`,
                        isSelected: true,
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Spin spinning={getProductBySlugHook.isLoading || !productSlug}>
                <Row gutter={32} className="mato32">
                  {(product?.classification === 'SHOE' ||
                    product?.classification === 'BAG' ||
                    product?.classification === 'SHIRT') && (
                    <ProductDetailsDescriptionView
                      selectedProductOption={selectedProductOption}
                      product={product}
                    />
                  )}
                  {product?.classification === 'GIFT_CARD' && (
                    <GiftCards selectedProductOption={selectedProductOption} product={product} />
                  )}
                </Row>
              </Spin>
              <Row className="mato64">
                <Reviews product={product} productOption={selectedProductOption} />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default ProductDetails
