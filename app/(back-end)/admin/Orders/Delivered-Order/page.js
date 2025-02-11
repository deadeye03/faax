import { getAllDeliveredOrders } from '@/actions/order'
import AllOrders from '@/components/back-end/Orders/AllOrders';
import React from 'react'

async function page() {
  const orders= await getAllDeliveredOrders();
  console.log('orders are ',orders)
  return (
    <>
      <AllOrders orders={orders} />
    </>
  )
}

export default page