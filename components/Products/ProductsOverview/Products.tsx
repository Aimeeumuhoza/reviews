import React, { Fragment, useEffect, useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import FilterProducts from './FilterProducts'
import { Product, ProductSortMethods } from '../../../types'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import { useRouter } from 'next/router'
import Empty from 'antd/lib/empty'
import ProductItem from '../ProductItem'
import useGetProducts from '../../../hooks/api/useGetProducts'
import ProductListSkeletonLoader from '../ProductListSkeletonLoader'
import Drawer from 'antd/lib/drawer'
import Button from 'antd/lib/button'
import DynamicBreadcrumb from '../../DynamicBreadcrumb'
import useSearchProductVariations from '../../../hooks/api/useSearchProductVariations'
// import LoadMoreProducts from './LoadMoreProducts'
import { mapToProductType } from '../../../lib/utils/formatting.util'
import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'
import ProductRating from './ProductRating'

const Products: React.FC = () => {
  const router = useRouter()
  const getProductsHook = useGetProducts()
  const searchProductsHook = useSearchProductVariations()
  const [visible, setVisible] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [productList, setProductList] = useState<Product[]>([])
  const [sort, setSort] = useState(ProductSortMethods.RATING)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (router.query) {
      const isSearching = !!Object.keys(router.query).length
      setIsSearch(isSearching)
      if (isSearching) {
        searchProductsHook.sendRequest({ q: location.search })
      } else {
        getProductsHook.sendRequest()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (isSearch) {
      setProductList(mapToProductType(searchProductsHook.items))
    } else {
      setProductList(getProductsHook.items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductsHook.items, searchProductsHook.items])

  const getIsLoading = (): boolean =>
    isSearch ? searchProductsHook.isLoading : getProductsHook.isLoading

  const productSort = (products: Product[]): Product[] => {
    if (sort === ProductSortMethods.RATING)
      return products.sort((a, b) => b.averageRating - a.averageRating)
    if (sort === ProductSortMethods.PRICE) return products.sort((a, b) => b.amount - a.amount)
    if (sort === ProductSortMethods.NAME)
      return products.sort((a, b) => a.name.localeCompare(b.name))
    return products
  }

  const SortMenu: React.FC = () => (
    <Menu onClick={({ key }) => setSort(key as ProductSortMethods)} className="uzuri_dropdown_box">
      {Object.entries(ProductSortMethods).map(([, val]) => (
        <Menu.Item key={val} className="text12 gray fowe500 text-capitalize">
          {val}
        </Menu.Item>
      ))}
    </Menu>
  )
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Button
          className="pg_btn"
          type="link"
          onClick={() =>
            !isSearch ? getProductsHook.goToPreviousPage() : searchProductsHook.goToPreviousPage()
          }>
          Previous
        </Button>
      )
    }
    if (type === 'next') {
      return (
        <Button
          className="pg_btn"
          type="link"
          onClick={() =>
            !isSearch ? getProductsHook.goToNextPage() : searchProductsHook.goToNextPage()
          }>
          Next
        </Button>
      )
    }
    return originalElement
  }

  return (
    <Fragment>
      <div className="container-fluid top_header ">
        <div className="container">
          <Row align="middle">
            <Col flex="auto">
              <span style={{ verticalAlign: 'middle' }}>
                <img src="/arrows-left-white.svg" alt="icon" style={{ width: '24px' }} />
              </span>
              <a href="/">
                <span className="white text12 fowe700">Back</span>
              </a>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container-fluid uzuri_container">
        <Row gutter={128} justify="space-between">
          <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{ borderRight: '1px solid #D0D8E8' }}>
            <div className="mato32 mabo32">
              <Row gutter={16} align="middle" className="mabo32">
                <Col flex="auto">
                  <DynamicBreadcrumb
                    items={[
                      { name: 'Home', path: '/' },
                      { name: 'Products', isSelected: true, path: '/products' },
                    ]}
                  />
                </Col>
                <Col>
                  <ProductRating />
                </Col>
                <Col flex="none" style={{ textAlign: 'right' }}>
                  <Dropdown overlay={<SortMenu />}>
                    <a
                      role="button"
                      className="text12 fowe700 black ant-dropdown-link"
                      onKeyDown={(e) => e.preventDefault()}
                      onClick={(e) => e.preventDefault()}
                      tabIndex={0}>
                      Sort by <img src="/chevron-down.svg" height="20px" alt="icon" />
                    </a>
                  </Dropdown>
                </Col>

                <Col flex="none">
                  <Button
                    onClick={() => {
                      setVisible(true)
                    }}
                    className="filter_button_phone_view">
                    Filter
                  </Button>
                  <Drawer
                    className="bag_drawer"
                    placement="right"
                    closable={false}
                    onClose={() => {
                      setVisible(false)
                    }}
                    visible={visible}>
                    <FilterProducts />
                  </Drawer>
                </Col>
              </Row>
              <Row gutter={[32, 48]}>
                {getIsLoading() && <ProductListSkeletonLoader />}
                {!getIsLoading() && productList.length < 1 ? (
                  <Empty className="m-auto" />
                ) : (
                  productSort(productList)?.map((p) => (
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} key={`${p.slug}___${Math.random()}`}>
                      <ProductItem product={p} />
                    </Col>
                  ))
                )}
              </Row>
              <Pagination
                className="mato64 mabo64 text18 center fowe300"
                current={!isSearch ? getProductsHook.page : searchProductsHook.page}
                total={
                  !isSearch ? getProductsHook.meta.totalItems : searchProductsHook.meta.totalItems
                }
                defaultPageSize={12}
                responsive
                showSizeChanger={false}
                itemRender={itemRender}
                onChange={(page) =>
                  !isSearch ? getProductsHook.changePage(page) : searchProductsHook.changePage(page)
                }
              />
              {/* {!getIsLoading() && (
                <LoadMoreProducts
                  isSearching={isSearch}
                  searchHook={searchProductsHook}
                  normalHook={getProductsHook}
                />
              )} */}
            </div>
          </Col>
          <Col xs={24} sm={6} md={6} lg={6} xl={6} className="hide_phone">
            <FilterProducts />
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default Products
