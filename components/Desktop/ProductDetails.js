'use client'

import React, { useEffect, useState } from 'react'
import { Card,CardContent } from '../ui/card'
import Image from '../Image'

import { Skeleton } from '../ui/skeleton'
import { useCart } from '@/Context/Context'

import CartButtons from '../CartButtons'
import ChooseSize from '../ChooseSize'
import PromiseSection from '../PromiseSection'
import SpecificationDescription from '../SpecificationDescription'
import ItemTitleDetails from '../ItemTitleDetails'

export default function ProductDetails({ product } ) {
    console.log(product)
    const { addToBag, addQuntity, removeQuantity, isCart, removeItem, getItemQuantity } = useCart()
    const [sizes, setSizes] = useState("M")
    const [isLoading,setIsLoading]=useState(false)
    const [showImg,setShowImg]=useState(0)
    
    // MANAGE CART
    
    return (
        <div>
            <div className='img_option product_conatiner flex w-full gap-3 h-[calc(100vh-3rem)] md:h-[calc(100vh-3.5rem)] px-14 py-4'>
                {/* LEFT */}
                <div className='flex flex-col w-[10%] h-full gap-3 rounded-md overflow-y-scroll scrollbar-none'>
                    {product.images?.map((image,i) => (
                        <Card key={`card-${i}`} className="flex-1 flex-shrink-0">
                            <CardContent className="flex items-center justify-center h-full w-full cursor-pointer" onClick={()=>setShowImg(i)} >
                                {isLoading ? (
                                    <Skeleton className="h-full w-full" />
                                ) : (
                                    <Image src={`/${image}`} priority  height={200} width={200} lqip={{ active: true, quality: 5 }} loading='lazy' className='border h-full w-full object-cover object-top' alt="items"  />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/* CENTER */}
                <div className="image flex-1 w-[45%]">
                    <div className='relative w-full h-full'>
                        {isLoading ? (
                            <Skeleton className="h-full w-full" />
                        ) : (
                            <Image path={`/${product.images[showImg]}`} priority  height={800} width={800} lqip={{ active: true, quality: 5 }} className='border h-full w-full object-cover object-top' alt="items" />
                        )}
                    </div>
                </div>
                {/* RIGHT */}
                <div className="detail flex-1 w-[45%] overflow-y-scroll">
                    <div className='flex flex-col gap-4'>
                       
                       {/* THIS IS ITEMDEATILS WHERE MEASURE ALL PRICES AND DISCOUNT */}
                        <ItemTitleDetails isLoading={isLoading} product={product} />

                        {/* Color selection */}
                        <div className="color">
                            <h1>CHOOSE COLOR</h1>
                            <div className='flex gap-3 rounded-md'>
                                {Array.from({ length: 4 }, (_, i) => (
                                    <Card key={`card-${i}`} className="flex-1 h-[100px] w-[100px] flex-shrink-0">
                                        <CardContent className="flex items-center justify-center h-full">
                                            {isLoading ? (
                                                <Skeleton className="h-full w-full" />
                                            ) : (
                                                <span className="font-semibold">Image</span>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Size selection */}
                        
                        <ChooseSize sizes={sizes} setSizes={setSizes}/>

                        {/* Buttons */}
                        
                        <CartButtons isLoading={isLoading}  product={product} size={sizes}/>
                        
                        {/* Our Promise section */}
                        
                        <PromiseSection isLoading={isLoading}/>

                        {/* Product specification and description */}
                        <SpecificationDescription isLoading={isLoading} sizes={sizes} product={product}/>
                    </div>
                </div>
            </div>
        </div>
    )
}