"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '@/Context/Context'
import DeliveryOption from './DeliveryOption';
import AddressDetails from './AddressDetailsForm';
import { CirclePlusIcon } from 'lucide-react';
import { IoCloseSharp } from "react-icons/io5";
import CartProucts from './CartProucts';
import { createOrderWithItems } from '@/actions/order';
import AddressSection from './AddressSection';
import BillingSection from './BillingSection';
import { initiate } from '@/actions/paymentAction';
import Script from 'next/script';
import toast from 'react-hot-toast';
function CartDetails({ user }) {
    const { cart } = useCart();
    const addressRef=useRef(null);
    const [addresses, setAddresses] = useState(() => {
        console.log(user.address)
        if (user.address > 0) {
            return user.address;
        }
        return [];
    })
    const [showNewAddress, setShowNewAddress] = useState(false);
    const [initialPrice, setInitialPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [addressId, setAddressId] = useState('')
    const [isTrial, setIsTrial] = useState(false)
    const [paymentMode, setPaymentMode] = useState('')
    const [showPaymentOption, setShowPaymentOption] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //  THIS USE EFFECT CALCULATE ALL ITEM PRICE AND QUANTITY ......
    useEffect(() => {
        if (cart.length > 0) {
            // Calculate the total price (after discounts)
            const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

            // Calculate the initial price (before discounts)
            const initialPrice = cart.reduce((total, item) => {
                const originalPrice = item.price / (1 - item.discount / 100); // Reverse the discount to get the original price
                return total + originalPrice * item.quantity;
            }, 0);

            // Calculate total discount by subtracting total price from the initial price
            const totalDiscount = initialPrice - totalPrice;

            // Update state with calculated values
            setTotalPrice(Math.round(totalPrice)); // Final price after discount
            setTotalDiscount(Math.round(totalDiscount)); // Total discount value
            setInitialPrice(Math.round(initialPrice)); // Total initial price before discount

            // Calculate the total quantity
            const totalQuantities = cart.reduce((total, item) => total + item.quantity, 0);
            setTotalQuantity(totalQuantities);
        }
    }, [cart]);



    const checkOut = async () => {

        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
        if (cartItems.length < 1) {
            console.log('cartitems are empty ')
            return;
        }

        setIsLoading(true);

        const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        
        const orderItem = {
            cartItems,
            isTrial,
            total,
            addressId,
            totalQuantity,
            paymentMode,
        }
        console.log("order summary", orderItem)

        if (paymentMode==='CASH') {
            
        }

        try {            
            console.log("KEY_ID:", process.env.NEXT_PUBLIC_KEY_ID);
            const orderId = await initiate(total, orderItem)
            // console.log("orderId is ",orderId.id)
            var options = {
                "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": Number.parseInt(total) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "FAAX", //your business name
                "description": "Husstle Free buy your favirout Cloth",
                "image": ``,
                "order_id": orderId.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": `${addressId}`, //your customer's name
                    "message": `${paymentMode}`,
                    "contact": "" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "FAAX Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            }
            var rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log('error is caught', error)
            toast.error('Currently we are not processed your please try Again')
            setIsLoading(false)
        }

    }
    if (cart.length < 1) {
        return (
            <div role='status' className='flex flex-col justify-center items-center'>
                {/* <h1 className='text-red-500'>YOUR CART IS EMPTY</h1> */}

                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

        )
    }

    return (
        // <div className=' w-full h-full rounded-md shadow-sm bg-slate-100 md:p-8'>
        <>
            <Script src='https://checkout.razorpay.com/v1/checkout.js'></Script> 
            {isLoading &&
                <div role="status" className='fixed flex-col left-0 top-0 flex justify-center items-center bg-opacity-50 bg-black h-[100vh] w-full z-[100] '>
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                    <span className='text-slate-200' >Please Wait it's take some time...... </span>
                </div>}
            <div className="relative container mx-auto p-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                {/* cart section */}
                <CartProucts />

                {/* CART FOOTERS */}

                <div className="cart__footer p-1 md:p-4">

                    {/* THIS IS DELIVERY OPTION SECTION WHERE USER CHOOSE OPTIONS */}
                    <DeliveryOption setIsTrial={setIsTrial} isTrial={isTrial} />

                    {/* ADDRESS DETAILS OF USERS */}

                    {/* IT IS DEFAULT SCROLL SECTION WHEN ADD NEW ADDRESS CLICK */}
                    <div className="show-add-address" ref={addressRef}></div>
                    {user.address?.length < 1 && <AddressDetails setShowNewAddress={setShowNewAddress} />}

                    {/* ADDRESS SECTION */}

                    <h1 className='mt-2 flex md:justify-end'>
                        <button onClick={() => setShowNewAddress((prev) => !prev)} className='w-full  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 md:w-max' > {!showNewAddress ? <span className='flex items-center gap-1'><CirclePlusIcon /> Add new Address</span> : <span className='flex items-center gap-1'><IoCloseSharp />  close</span>}  </button >
                    </h1>
                    {showNewAddress && <AddressDetails setShowNewAddress={setShowNewAddress} />}

                    <AddressSection addresses={user.address} setAddressId={setAddressId} addressId={addressId} setShowNewAddress={setShowNewAddress} showNewAddress={showNewAddress} />
                    <BillingSection totalQuantity={totalQuantity} totalDiscount={totalDiscount} initialPrice={initialPrice} />

                    {/* THIS IS FINAL AMOUNT SECTION */}
                    <div className='flex px-2 justify-center items-center w-full bg-white'>
                        <div className='flex flex-col flex-1'>
                            <span className='line-through text-[12px]'>
                                {initialPrice}
                            </span>
                            <span className='font-bold font-krona'>
                                {(totalPrice)}
                            </span>
                        </div>

                        {/* Check out button */}
                        
                        { addressId!==''? <button className='flex-1 text-white bg-gradient-to-r mt-5 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-krona disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600' disabled={totalPrice < 1 || isTrial === null || isTrial === undefined || addressId == ''} onClick={() => setShowPaymentOption(true)}>
                            Procced to Checkout
                        </button>: 
                          <button className='flex-1 text-white bg-gradient-to-r mt-5 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-krona disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600' disabled={totalPrice < 1 || isTrial === null || isTrial === undefined } onClick={() => addressRef.current.scrollIntoView({ behavior: "smooth" })}>
                          Add New Address
                      </button> }
                    </div>
                </div>

                {/* payment option  */}
                {showPaymentOption &&
                    <div className='fixed top-0 left-0 h-full w-full bg-white pt-24 '>
                        <span className='text-black text-4xl absolute right-4 top-14 cursor-pointer' onClick={() => setShowPaymentOption(false)}>&times;</span>
                        <div className='flex flex-col h-full w-full justify-between'>
                            <div>
                                <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ${paymentMode === 'ONLINE' ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 hover:border-blue-300'}`}>
                                    <input
                                        type="radio" name='paymentOption'
                                        value="ONLINE"
                                        checked={paymentMode === 'ONLINE'}
                                        onChange={() => setPaymentMode('ONLINE')} />
                                    <span>ONLINE : Pay With Razorpay <span className='text-red-500 text-[10px]'> (Recommended)</span> </span>
                                </label>
                                <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ${paymentMode === 'CASH' ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 hover:border-blue-300'}`}>
                                    <input
                                        type="radio" name='paymentOption'
                                        value="CASH"
                                        checked={paymentMode === 'CASH'}
                                        onChange={() => setPaymentMode('CASH')} />
                                    <span>CASH : Pay With Cash</span>
                                </label>
                            </div>

                            {/* place order button */}
                            <div className='flex px-2 justify-center items-center w-full bg-white border '>
                                <div className='flex flex-col flex-1'>
                                    <span className='font-bold font-krona'>
                                        {(totalPrice)}
                                    </span>
                                </div>

                                {/* Check out button */}
                                <button className='flex-1 text-white bg-gradient-to-r mt-5 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-krona disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600' disabled={totalPrice < 1 || isTrial === null || isTrial === undefined || addressId == '' || paymentMode === ''} onClick={() => checkOut()}>
                                    Placed Order
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default CartDetails
