import React, { useEffect } from 'react'
import Card from 'antd/lib/card'
import { UserOrderHistoryItem } from './components'
import useGetOrderHistory from '../../../../hooks/api/useGetOrderHistory'

const UserOrderHistory: React.FC = () => {
  const getOrderHistoryHook = useGetOrderHistory()

  useEffect(() => {
    getOrderHistoryHook.sendRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="user_profile_card">
      <p className="text14 black fowe700 mabo32">MY ORDERS</p>

      {getOrderHistoryHook.items.map((orderHistoryItem, idx) => (
        <UserOrderHistoryItem key={idx} item={orderHistoryItem} />
      ))}
    </Card>
  )
}

export default UserOrderHistory
