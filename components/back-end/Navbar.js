"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiArrowLeft, FiMenu, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedOut, UserButton, SignedIn, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import Link from 'next/link'
import { useCart } from '@/Context/Context';
import ThemeController from './ThemeController';
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";



function NavBar() {




    return (
        <div className=' h-12 px-12  flex flex-1 gap-4 items-center md:h-16 md:gap-12' >
            {/* LEFT */}
            <Link href='/' className='font-krona text-2xl capitalize md:hidden lg:block w-[30%]'>Faax </Link>

            {/* CENTER */}
            <div className='hidden  items-center  border md:flex border-opacity-60  py-2 rounded-md w-[40%] justify-between'>
                <input type="text" id='search' placeholder='Search Products....' className='md:block border-none outline-none bg-transparent px-2' />
                {/* <img src="/icon/search.png" alt="search" className=' md:static h-[24px] justify-self-end' /> */}
                <FiSearch className="w-6 h-6" />

            </div>

            {/* RIGHT */}
            <div className="icons flex-grow justify-end flex  items-center gap-4 ">
                {/* this is serchbar of mobile */}
                <ThemeController />
                <IoMdNotificationsOutline className='h-10 w-10 ' />
                <LuMessageSquare className='h-10 w-10' />
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-current border-e-transparent  text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
                </ClerkLoading>

                <ClerkLoaded>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link href='/sign-in'>
                            <button
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="User Profile"
                            >
                                <FiUser className="w-10 h-10" />
                            </button>
                        </Link>

                    </SignedOut>

                </ClerkLoaded>

            </div>



        </div>
    )
}

export default NavBar
