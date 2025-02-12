"use client"
import React from 'react'
import { useCart } from '@/Context/Context'
import { IoMdAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

function CartButtons({ isLoading, product,size }) {
    //isloading=> for skeltonview slug is id
    const { addToBag, addQuantity, removeQuantity, isCart, removeItem, getItemQuantity } = useCart();
    const handleCart = () => {
        console.log('biii')
        addToBag(product,size)
    }
    return (
        <div className="cart flex-col gap-3 flex md:gap-8 md:flex-row">
            
            {/* IF PRODUCT IS ALREADY AVILLABLE IN CART THEN SHOW CONDITIONAL BUTTONS  */}
            {isCart(product?.id,size) ? (<> <Link href='/CheckOut-Cart' className='font-montserrat px-12 py-4 border font-bold border-black rounded-md bg-black text-white' disabled={isLoading}>
                Check out
            </Link>
                <div className='font-montserrat  py-4 border font-bold border-black rounded-md bg-white text-black flex  flex-1' disabled={isLoading}>
                    {/* {isLoading ? <Skeleton className="h-6 w-20" /> : <>
                    </>
                    } */}
                        <button onClick={() => removeQuantity(product,size)} className='flex-1 flex justify-center items-center border-r border-black'> <TiMinus className='h-6 w-6' data-prevent-nprogress={true} /> </button>
                        <div className='flex-1 flex justify-center items-center border-r border-black'> {getItemQuantity(product,size)} </div>
                        <button onClick={() => addQuantity(product,size)} className='flex-1 flex justify-center items-center '><IoMdAdd className='w-6 h-6' data-prevent-nprogress={true}/>  </button>
                </div>
            </>) :
                // IF PRODUCT IS NOT AVILLABLE IN CART THEN SHOW THESE BUTTONS
                (<> <button className='font-montserrat px-12 py-4 border border-black rounded-md focus:bg-black focus:text-white' disabled={isLoading}>
                    {/* {isLoading ? <Skeleton className="h-6 w-20" /> : 'Buy Now'} */}
                    Buy Now
                </button>
                    <button onClick={handleCart} className='font-montserrat px-12 py-4 border border-black rounded-md focus:bg-black focus:text-white' disabled={isLoading}>
                        {/* {isLoading ? <Skeleton className="h-6 w-20" /> : 'Add to Bag'} */}
                        Add to Bag
                    </button>
                </>)
            }


        </div>
    )
}

export default CartButtons
