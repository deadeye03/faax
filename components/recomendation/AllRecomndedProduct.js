
import React from 'react'
import { FiHeart } from 'react-icons/fi'
import Link from 'next/link'
import {  recomendationProduct } from '@/actions/product'
import Image from '../Image';
async function AllRecomndedProduct({category,gender}) {
    const allProduct= await recomendationProduct(category,gender);

    return (
        <div className='bg-gradient-to-r from-[#ECF3FC] to-white p-6 md:p-8 md:pb-4'>
            
            <div className='overflow-x-scroll card_collection w-full flex gap-2 md:gap-4'>
                
                 {allProduct.map((products,i)=>{
                    return (
                        <Link href={`/categories/t-shirt/${products[i]?.id}`} key={i} className='flex-shrink-0 '>
                            <div className=' relative h-[200px] w-[200px] md:w-[270px] md:h-[300px] rounded-xl'>

                            <Image path={`/${products.images[0]}`} priority  height={400} width={400} lqip={{ active: true, quality: 5 }} loading='lazy' className='rounded-xl h-full w-full object-cover object-top' alt="items"  />

                                <FiHeart className='h-4 w-4 absolute top-2 right-2 text-white ' />
                            </div>
                            <div className='p-1 box-border overflow-hidden'>
                            <h3 className='w-[200px]  font-semibold text-lg text-black text-opacity-70 md:w-full '>{products?.title}</h3>
                            <p>{products?.brand} </p>
                            <div className='price_section flex gap-2' >
                            <p className='line-through'>${Math.round(Math.floor(products?.price / (1 - (products?.discount / 100))))} </p>
                            <p className='font-extrabold'>{products?.discount}% </p>
                            <p className='text-green-500'>$ {products?.price} </p>
                            </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div >
    )
}

export default AllRecomndedProduct
