import React, { useEffect } from 'react'
import Row from 'antd/lib/row'
import RecommendedProductItem from '../../RecommendedProductItem'
import { ProductWithFullDetails } from '../../../types'
import useSearchProductVariations from '../../../hooks/api/useSearchProducts'

type AlsoLikeSectionProps = {
  product?: ProductWithFullDetails
}

const AlsoLikeSection: React.FC<AlsoLikeSectionProps> = (props) => {
  const searchProductsHook = useSearchProductVariations()

  useEffect(() => {
    if (props.product) {
      searchProductsHook.sendRequest({ limit: 4, q: `pt_._name=${props.product.productType.name}` })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.product])

  if (searchProductsHook.isLoading) return null

  return (
    <>
      <Row gutter={32} className="mato32">
        {searchProductsHook.items.map((p, idx) => (
          <RecommendedProductItem key={idx} product={p} />
        ))}
      </Row>
    </>
  )
}

export default AlsoLikeSection
