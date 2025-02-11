"use client"
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Search, ShoppingCart, Package, Truck, CheckCircle } from 'lucide-react'
import { FaClockRotateLeft } from "react-icons/fa6";
function StatusTracker( {order} ) {
    console.log(order.status)
    const [count,setCount]=useState(0)
    useEffect(()=>{
        switch (order.status) {
            case 'PENDING':
                setCount(0)
                break;
            case 'CONFIRMED':
                setCount(1)
                break;
            case 'OutForDelivery':
                setCount(2)
                break;
            case 'COMPLETED':
                setCount(3)
                break;
        
            default:
                setCount(0)
                break;
        }

    },[])
    console.log('count is ',count)
    return (
        <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="relative flex h-max items-center md:mb-0 w-full">
                    {/* Line connecting status icons */}

                    {/* pending */}
                    <div className="flex flex-col items-center  md:mb-0  bg-white">
                        <div className={`w-8 h-8 rounded-full ${count>-1?'bg-red-500':'bg-red-500'} flex items-center justify-center text-white mb-2`}>
                            <FaClockRotateLeft className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">PENDING</span>
                        <span className=" text-[10px]">{new Date(order.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className={  `w-12 h-0.5 md:w-48 md:h-0.5 ${count>0?'bg-green-500':'bg-gray-400'}`}></div>
                    {/* Confirmed */}
                    <div className="flex flex-col items-center  md:mb-0  bg-white">
                        <div className={`w-8 h-8 rounded-full ${count>0?'bg-green-500':'bg-gray-400'} flex items-center justify-center text-white mb-2`}>
                            <Package className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">Confirmed</span>
                        <span className=" text-[10px]">{count>0? new Date(order.confirmedAt).toLocaleTimeString():''}</span>
                    </div>
                    <div className={  `w-12 h-0.5 md:w-48 md:h-0.5 ${count>1?'bg-green-500':'bg-gray-400'}`}></div>
                    {/* Out for Delivery */}
                    <div className="flex flex-col items-center  md:mb-0  bg-white">
                        <div className={`w-8 h-8 rounded-full ${count>1?'bg-blue-500 ':'bg-gray-400'} flex items-center justify-center text-white mb-2`}>
                            <Truck className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">Out for Delivery</span>
                        <span className=" text-[10px]">{count>1? new Date(order.outForDeliveryAt).toLocaleTimeString():''}</span>
                    </div>
                    <div className={  `w-12 h-0.5 md:w-48 md:h-0.5 ${count>2?'bg-green-500':'bg-gray-400'}`}></div>
                    {/* Delivered */}
                    <div className="flex flex-col items-center bg-white">
                        <div className={`w-8 h-8 rounded-full ${count>2?'bg-green-500':'bg-gray-400'} flex items-center justify-center text-white mb-2`}>
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm text-gray-500">Delivered</span>
                        <span className=" text-[10px]">{count>2? new Date(order.deliveredAt).toLocaleTimeString():''}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                Estimated Delivery: Aug 15
            </div>
        </div>
    )
}

export default StatusTracker
