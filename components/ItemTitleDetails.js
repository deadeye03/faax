"use client"
import React from 'react'
import { Skeleton } from './ui/skeleton'
import { FaStar } from "react-icons/fa"
function ItemTitleDetails({isLoading ,product}) {
    console.log("product in details",product)
    if(isLoading) return (
        <>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-1/4" />
        </>
    ) 
  return (
        <>
            <h1 className='font-montserrat text-xl md:text-2xl font-semibold'>&copy; {product?.brand}</h1>
            <p className='text-xl md:text-2xl text-gray-400 font-krona'>{product?.title}</p>
            <div className="rating flex items-center gap-2 border w-max p-1 rounded-sm">
                <span><FaStar className='h-4 w-4 text-[#fdd835]' /></span><span>{product?.rating}</span>
            </div>
            <div className='price_section text-xl flex gap-4 md:gap-2'>
                <p className='line-through'>${Math.round(Math.floor(product?.price / (1 - (product?.discount / 100))))}</p>
                <p className='font-extrabold'>${product?.discount}%</p>
                <p className='text-green-500'>${product?.price} </p>
            </div>
            <div className='bg-slate-500 rounded-lg text-white px-2 py-1 w-max uppercase '>
                {product?.category}
            </div>
        </>
    )
  
}

export default ItemTitleDetails
