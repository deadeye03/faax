'use client'
import React, { useEffect, useState } from 'react'
import { colletionImage } from './Collection'
import { FiHeart } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
function TopCollection() {
    const [products,setProducts]=useState([]);
    
    useEffect(()=>{
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data=>setProducts(data.products));

    },[])
    
    return (
        <div className='bg-gradient-to-r from-[#ECF3FC] to-white p-8 '>
            <h1 className='text-center font-bold my-4'>TRENDY Fashion : For Top </h1>
            <div className='overflow-x-scroll card_collection w-full flex gap-2 md:gap-4'>
                {/* <div className='h-[200px] w-[200px] md:h-[270px] md:w-[300px]'> */}
                {Array.from({ length: colletionImage.length }, (_, i) => {
                    return (
                        <Link href={`/categories/t-shirt/${products[i]?.id}`} key={i} className='flex-shrink-0 '>
                            <div className=' relative h-[200px] w-[200px] md:w-[270px] md:h-[300px] rounded-xl'>
                                <Image src={`/img/${colletionImage[i]}`} height={200} width={200} className='w-full h-full object-cover object-top rounded-xl' alt="fashion-image" />
                                <FiHeart className='h-4 w-4 absolute top-2 right-2 text-white ' />
                            </div>
                            <div className='p-1 box-border overflow-hidden'>
                            <h3 className='w-[200px]  font-semibold text-lg text-black text-opacity-70 md:w-full '>{products[i]?.title}</h3>
                            <p>{products[i]?.brand} </p>
                            <div className='price_section flex gap-2' >
                            <p className='line-through'>$ {products[i]?.price} </p>
                            <p className='font-extrabold'>{products[i]?.discountPercentage}% </p>
                            <p className='text-green-500'>$ {Math.round((products[i]?.price)-(products[i]?.discountPercentage % 100 * products[i]?.price)).toFixed(2) } </p>
                            </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div >
    )
}

export default TopCollection
