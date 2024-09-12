"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function MoibleMenu() {
    const [isOpen, setIsOpen] = useState(false)
    return (<div className='md:hidden'>
        <div className='flex flex-col gap-[4.5px] cursor-pointer' onClick={() => setIsOpen((prev) => !prev)}>
            <div className={`w-6 h-1 bg-blue-600 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? "rotate-45" : ''}`}></div>
            <div className={`w-6 h-1 bg-blue-600 rounded-sm ease-in-out duration-500 ${isOpen ? "opacity-0" : ''}`}></div>
            <div className={`w-6 h-1 bg-blue-600 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? "-rotate-45" : ''}`}></div>
        </div>
        {isOpen &&
            <div className="fixed bg-slate-100 w-full h-[calc(100vh-3rem)] left-0  flex flex-col justify-center items-center gap-4 z-[20]">
                
                <div className="">Orders</div>
                <div className="">Login</div>
                <Link href='/' >Men</Link>
                <Link href='/' >Women</Link>
                <Link href='/' >Shoes</Link>
                <Link href='/' >Beauty</Link>
                <Link href='/' >Skin</Link>
                
            </div>
        }
    </div>)
}

export default MoibleMenu
