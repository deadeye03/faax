"use client"
import React from 'react'
import { TbHanger } from "react-icons/tb"
import { VscWorkspaceTrusted } from "react-icons/vsc"
import { RiSecurePaymentFill } from "react-icons/ri"
import { TfiPackage } from "react-icons/tfi"
import { Skeleton } from './ui/skeleton' 

function PromiseSection({isLoading}) {
    return (
        <div className="our__promise flex text-sm gap-6 font-bold">
            {[
                { icon: RiSecurePaymentFill, text: 'Secure Payments' },
                { icon: VscWorkspaceTrusted, text: 'Genuine Product' },
                { icon: TbHanger, text: 'Try & Buy' },
                { icon: TfiPackage, text: '7 Day Return' },
            ].map((item, index) => (
                <div key={index} className='flex flex-col justify-center items-center'>
                    <div className='h-[50px] w-[50px] flex justify-center items-center bg-gray-100 rounded-2xl'>
                        {isLoading ? (
                            <Skeleton className="h-6 w-6" />
                        ) : (
                            <item.icon className='h-6 w-6' />
                        )}
                    </div>
                    <h1 className='font-montserrat'>
                        {isLoading ? <Skeleton className="h-4 w-20" /> : item.text}
                    </h1>
                </div>
            ))}
        </div>
    )
}

export default PromiseSection
