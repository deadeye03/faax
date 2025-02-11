import { getAllPendingReturnExchangeOrders } from '@/actions/returnExchange';
import AllOrders from '@/components/back-end/Return-Exchange/AllReturnExchangeOrder';
import React from 'react'

async function page() {
    const orders=await getAllPendingReturnExchangeOrders();
  return (
    <div>
      <AllOrders orders={orders}/>
    </div>
  )
}

export default page
