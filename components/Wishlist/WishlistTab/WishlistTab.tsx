import React, { useEffect } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Card from 'antd/lib/card'
import WishlistListItem from '../WishlistListItem'
import useGetWishlist from '../../../hooks/api/useGetWishlist'
import { Spin } from 'antd'

const WishlistTab: React.FC = () => {
  const getWishlistHook = useGetWishlist()

  useEffect(() => {
    getWishlistHook.sendRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (getWishlistHook.isLoading)
    return (
      <Card className="user_profile_card">
        <Row className="mato64 mabo64">
          <Spin />
        </Row>
      </Card>
    )

  return (
    <Card className="user_profile_card">
      <p className="text14 black fowe700 mabo32">MY WISHLIST({getWishlistHook.meta.totalItems})</p>
      {getWishlistHook.items.map((wishlistItem, idx) => (
        <WishlistListItem
          key={idx.toString()}
          onRemoveSuccess={() => {
            getWishlistHook.refetch()
            getWishlistHook.sendRequest()
          }}
          wishlistItem={wishlistItem}
        />
      ))}
      <Row className="mato64 mabo64">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'center' }}>
          {!getWishlistHook.hasReachedEnd && (
            <button
              disabled={getWishlistHook.isLoading}
              onClick={() => getWishlistHook.goToNextPage()}
              className="btn_primary_outlined">
              {getWishlistHook.isLoadingMore ? 'LOADING...' : 'LOAD MORE ITEMS'}
            </button>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default WishlistTab
