"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiArrowLeft, FiMenu, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedOut, UserButton, SignedIn, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import Link from 'next/link'


import MoibleMenu from './MobileMenu'
import SearchBar from './SearchBar';

function NavBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        // if (!isSearchOpen) {
        //     setTimeout(() => searchInputRef.current.focus(), 100);
        // }
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    return (
        <div className=' h-12  flex flex-1 gap-4 items-center md:h-14 md:gap-12' >
            {/* LEFT */}
            <MoibleMenu />
            <Link href='/' className='krona-one-regular md:hidden lg:block'>FAAX </Link>
            <Link href='/' className='hidden md:block'>Men </Link>
            <Link href='/' className='hidden md:block'>Women </Link>
            <Link href='/' className='hidden md:block'>shoes </Link>
            <Link href='/' className='hidden md:block'>Beauty </Link>
            <Link href='/' className='hidden md:block'>Skin  </Link>
            {/* CENTER */}
            <div className='hidden  items-center  border md:flex border-opacity-60  py-2 rounded-md w-[30%] justify-between'>
                {/* <input type="text" id='search' placeholder='Search items....' className=' md:block border-none outline-none bg-transparent' /> */}
                <SearchBar/>
                {/* <img src="/icon/search.png" alt="search" className=' md:static h-[24px] justify-self-end' /> */}
                <FiSearch className="w-6 h-6" />

            </div>

            {/* RIGHT */}
            <div className="icons flex-grow justify-end flex  items-center gap-4 ">
                {/* this is serchbar of mobile */}
                <button
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <FiSearch className="w-6 h-6" />
          </button>

                <button
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Favorites"
                >
                    <FiHeart className="w-6 h-6" />
                </button>
                <button
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Shopping Bag"
                >
                    <FiShoppingBag className="w-6 h-6" />
                </button>

                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-current border-e-transparent  text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
                </ClerkLoading>
                <div className=''>
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
                                    <FiUser className="w-6 h-6" />
                                </button>
                            </Link>

                        </SignedOut>

                    </ClerkLoaded>
                </div>
            </div>

            {/* ADDING ANIMATION IN SEARCH BOX OF MOBILE */}
            <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-20 bg-white z-50"
          >
            <form onSubmit={handleSearchSubmit} className="h-full flex items-center px-4">
              <button
                type="button"
                onClick={toggleSearch}
                className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
                aria-label="Close Search"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              {/* <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent text-gray-800 text-lg placeholder-gray-500 focus:outline-none"
              /> */}
              <SearchBar/>
              {/* <button
                type="submit"
                className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
                aria-label="Submit Search"
              >
              </button> */}
                {/* <FiSearch className="w-6 h-6" /> */}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

        </div>
    )
}

export default NavBar
