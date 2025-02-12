import { getAllProducts, getOneProduct } from '@/actions/product'
import AllProducts from '@/components/back-end/Ecommerce/AllProduct';
import React from 'react'

async function page() {
   let products=await getAllProducts();
  return (
    <>
      <AllProducts initialProducts={products}/>
    </>
  )
}

export default page
