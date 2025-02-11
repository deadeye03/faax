import { userWithAddress } from '@/actions/address'
import CartDetails from '@/components/checkout/CartDetails'
import React from 'react'

async function page() {
  const user=await userWithAddress();
  return (
    <>
       
    <div className='min-h-[200px] w-full  flex justify-center items-center md:py-8 md:px-36'>
      <CartDetails user={user} />
    </div>
    </>
  )
}

export default page
