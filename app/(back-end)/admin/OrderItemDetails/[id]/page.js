import React from 'react'
import { PrismaClient } from "@prisma/client"
import Image from '@/components/Image';

const prisma = new PrismaClient();

async function page({ params }) {
  console.log('id is ', params.id)

  const order = await prisma.order.findUnique({
    where: {
      id: params.id
    },
    include: {
      user: true,
      address: true,
      orderItems: true
    }

  })
  console.log('All ordered items are', order);
  return (
    <div className='bg-white  py-14 px-48'>
      <h1 className='font-bold text-gray-800'>ALL Order Items Details</h1>
      <h1 className='uppercase font-extrabold text-black'> order Id : {order.id} </h1>

      {/* ORDER ITEM DETAILS WITH IMAGE */}
      {order.orderItems?.map((item) =>
        <div key={item.id} className='p-4 flex justify-between mt-6 border rounded-md shadow-sm'>
          <div className='' >
            <Image path={`${item.image}`} height="150" width="150" loading="lazy" lqip={{ active: true, quality: 5, blur: 10 }} className="h-full w-full object-contain" alt="image-orderItems" />
          </div>
          <div className='text-black'>
            <h1 className='font-bold'>Name : {item.name} </h1>
            <p className='font-bold'>Item ID : {item.id} </p>
            <p>Price : {item.price} </p>
            <p>Category : {item.category}</p>
            <p>Quantity : {item.quantity}</p>
            <p className='bg-pink-500 w-max text-white'>COLOR: {item.color}</p>
            <p>Size : {item.size}</p>
          </div>
        </div>
      )}

      {/* order item Information */}
      <h1 className='my-4 font-bold uppercase text-black'>Order Information</h1>
      <div className='flex justify-between border rounded-md'>
        <div className='flex-1 border-r pl-8'>
          <h2 className='text-black'> Address:</h2>
          <h3>{order.user.name} </h3>
          <p> Street Name: {order.address.streetName} </p>
          <p> phoneNumber: {order.address.phoneNumber} </p>
          <p>LandMark: {order.address.landmark} </p>
          <p>Pin-Code: {order.address.pinCode} </p>
          <p>PATNA,BIHAR,INDIA </p>
        </div>
        <div className='flex-1 pl-8'>
          <h2 className='font-bold text-black'>Payment Information:</h2>
          <p>Payments method: {order.paymentMethod} </p>
          <p>payment id : {order.paymentsId}</p>
          <p>payment done : {order.paymentDone?'Completed':'Not Completed'}</p>
        </div>
      </div>

      {/* other Information */}
      <div className='p-4 mt-4 border rounded-md flex flex-col justify-center items-center'>
        <h1 className='font-bold' >Extra Information:</h1>
        <p >delivery mode : {order.isTrial?"Trial Mode":'Standard Mode'} </p>
        <p>delivery status : {order.status} </p>
        <p>deliver boy name : {order.deliveryBoyId}</p>

      </div>
    </div>
  )
}

export default page
