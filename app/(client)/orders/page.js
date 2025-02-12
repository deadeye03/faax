import { getAllOrderWithUser } from '@/actions/order'
import AllOrdersView from '@/components/order/AllOrdersView'
import React from 'react'

export async function generateMetadata() {
  return {
    title:'Faax || Orders',
    description :'here you see Your all orders'
  }
}
export default async function page() {


    const orders =await getAllOrderWithUser();

    return (<>
    <AllOrdersView orders={orders}/>
    </>)
}
