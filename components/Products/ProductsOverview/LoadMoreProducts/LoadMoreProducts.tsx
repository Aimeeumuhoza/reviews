import { Col, Row } from 'antd'
import React, { Fragment } from 'react'
import PaginatedResponse from '../../../../lib/interfaces/paginated-response.interface'
import { Product, ProductVariantSearchRes } from '../../../../types'

type LoadMoreProductsProps = {
  isSearching: boolean
  searchHook: PaginatedResponse<ProductVariantSearchRes>
  normalHook: PaginatedResponse<Product>
}

const LoadMoreProducts: React.FC<LoadMoreProductsProps> = (props) => {
  return (
    <Fragment>
      {props.isSearching ? (
        <Row className="mato64 mabo64">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'center' }}>
            {props.searchHook.error === undefined && (
              <button
                disabled={props.searchHook.isLoading}
                onClick={() => props.searchHook.goToNextPage()}
                className="btn_primary_outlined">
                {props.searchHook.isLoadingMore ? 'LOADING SEARCHES...' : 'LOAD MORE SEARCHES'}
              </button>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="mato64 mabo64">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'center' }}>
            {!props.normalHook.hasReachedEnd && props.normalHook.error === undefined && (
              <button
                disabled={props.normalHook.isLoading}
                onClick={() => props.normalHook.goToNextPage()}
                className="btn_primary_outlined">
                {props.normalHook.isLoadingMore ? 'LOADING...' : 'LOAD MORE PRODUCTS'}
              </button>
            )}
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default LoadMoreProducts
