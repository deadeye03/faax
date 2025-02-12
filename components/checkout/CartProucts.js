"use client"
import React, { useState } from 'react'
import { useCart } from '@/Context/Context'
import { IoMdAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { FaPlus, FaMinus, FaTimes, FaHeart, FaEdit } from "react-icons/fa";
import Image from '../Image';
import Link from 'next/link'
function CartProucts() {
    const { addQuantity, removeQuantity, getItemQuantity, cart, clearCart, removeItem } = useCart();

    const [cartProduct, setCartProduct] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    })
    const handleQuantity = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    if (cartProduct.length < 1) {
        return (<>
            <h1>Loading....</h1>
        </>)
    }
    return (<>
        

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            {cartProduct.map(item => (
                <Link href={`${process.env.NEXT_PUBLIC_URL}/categories/${item.category}/${item.id}`} key={`${item.id}-${item.size}`} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center">
                        <Image path={`/${item.images[0]}`} height={200} width={200} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">Size: {item.size}</p>
                            <p className="text-gray-600">${item.price.toFixed(0)}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {getItemQuantity(item, item.size) > 1 && <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeQuantity(item, item.size);
                            }}
                            className="bg-gray-200 text-gray-700 rounded-full p-2 mr-2 hover:bg-gray-300 focus:outline-none"
                            aria-label="Decrease quantity"
                            data-prevent-nprogress={true}
                        >
                            <FaMinus />
                        </button>}
                        <span className="mx-2" data-prevent-nprogress={true}>{getItemQuantity(item, item.size)}</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addQuantity(item, item.size)
                            }}
                            className="bg-gray-200 text-gray-700 rounded-full p-2 mr-2 hover:bg-gray-300 focus:outline-none"
                            aria-label="Increase quantity"
                            data-prevent-nprogress={true}
                        >
                            <FaPlus />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeItem(item, item.size);
                            }}
                            className="text-blue-600 mr-2 hover:text-blue-800 focus:outline-none"
                            aria-label="Save for later"
                        >
                            <FaHeart />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeItem(item, item.size);
                            }}
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            aria-label="Remove item"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </Link>

            ))}
        </div>
    </>
    )
}

export default CartProucts
