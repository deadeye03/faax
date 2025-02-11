'use client'

import { useEffect,useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaCheck } from "react-icons/fa";
import Link from 'next/link';
import { useCart } from '@/Context/Context';

export default function ConfirmOrder() {
  const { clearCart }=useCart()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const  cleanCart= searchParams.get('orderVerified')
    if ( cleanCart=== 'true') {
       clearCart()
    }
  }, [searchParams])

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-green-500 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="text-center">
        <div
          className={`relative w-32 h-32 mx-auto mb-8 bg-white rounded-full shadow-lg transition-transform duration-500 ${isVisible ? "scale-100" : "scale-0"} animate-pulse`}
          aria-label="Success checkmark"
        >
          <div className="absolute inset-0 rounded-full border-4 border-green-500 border-dotted animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full border-4 border-green-400 border-dotted animate-spin-slow animate-reverse"></div>
          <FaCheck
            className="absolute inset-0 m-auto text-green-500 text-6xl animate-bounce cursor-pointer hover:text-green-600 transition-colors duration-300"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
        <p className="text-xl text-white mb-8">Thank you for your purchase.</p>
        <Link href={`${process.env.NEXT_PUBLIC_URL}/orders`}
          className="px-6 py-3 bg-white text-green-500 font-semibold rounded-full shadow-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 transition-all duration-300"
          aria-label="Continue shopping"
          
        >
          Check Your Order
        </Link>
      </div>
    </div>
  )
}





