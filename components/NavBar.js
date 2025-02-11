"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiArrowLeft, FiMenu, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedOut, UserButton, SignedIn, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import Link from 'next/link'
import { useCart } from '@/Context/Context';

import MoibleMenu from './mobile/MobileMenu'
import SearchBar from './SearchBar';
import MenClothingMenu from './Desktop/Option/Menu/MenClothingmMenu';
import WomenClothingMenu from './Desktop/Option/Menu/WomenClothingMenu';
import { DotIcon } from 'lucide-react';
import { FaAddressCard, FaFirstOrderAlt } from 'react-icons/fa';
import { RiOrderPlayFill } from 'react-icons/ri';
import { CiSaveDown1 } from 'react-icons/ci';

function NavBar() {
  const { itemCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const [isMenMenu, setIsMenu] = useState(false)
  const menMenuRef = useRef(null);
  const womenMenuRef = useRef(null);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // if (!isSearchOpen) {
    //     setTimeout(() => searchInputRef.current.focus(), 100);
    // }
  };

  const showMenMenu = (menu) => {
    switch (menu) {
      case 1:
        menMenuRef.current.style.visibility = 'visible'
        menMenuRef.current.style.opacity = 1
        womenMenuRef.current.style.visibility = 'hidden'
        womenMenuRef.current.style.opacity = 0
        break;
      case 2:
        womenMenuRef.current.style.visibility = 'visible'
        womenMenuRef.current.style.opacity = 1
        menMenuRef.current.style.visibility = 'hidden'
        menMenuRef.current.style.opacity = 0
        break;
      default:
        break;
    }
  }
  const closeMenu = () => {
    menMenuRef.current.style.visibility = 'hidden'
    menMenuRef.current.style.opacity = 0
    womenMenuRef.current.style.visibility = 'hidden'
    womenMenuRef.current.style.opacity = 0

  }

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
      <Link href='/' className='font-krona text-2xl capitalize md:hidden lg:block '
        onMouseOver={() => closeMenu()}>Faax </Link>
      <Link href='/' className='hidden md:block hover:border-b-2 border-pink-500 '
        onMouseOver={() => showMenMenu(1)}
      // onMouseLeave={() => closeMenu(1)}
      >Men </Link>
      <Link href='/' className='hidden md:block hover:border-b-2 border-pink-500'
        onMouseOver={() => showMenMenu(2)}
      >Women </Link>
      <Link href='/' className='hidden md:block' onMouseOver={() => closeMenu()} >shoes </Link>
      <Link href='/' className='hidden md:block' onMouseOver={() => closeMenu()} >Beauty </Link>
      <Link href='/' className='hidden md:block' onMouseOver={() => closeMenu()} >Skin  </Link>
      {/* CENTER */}
      <div className='hidden  items-center h-[80%]  border md:flex border-opacity-60  py-2 rounded-md w-[30%] justify-between' onMouseOver={() => closeMenu()} >
        {/* <input type="text" id='search' placeholder='Search items....' className=' md:block border-none outline-none bg-transparent' /> */}
        <SearchBar />
        {/* <img src="/icon/search.png" alt="search" className=' md:static h-[24px] justify-self-end' /> */}
        <FiSearch className="w-6 h-6" />

      </div>

      {/* RIGHT */}
      <div className="icons flex-grow justify-end flex  items-center gap-4 " onMouseOver={() => closeMenu()} >
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
        <Link href='/CheckOut-Cart'
          className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Shopping Bag"
        >
          <FiShoppingBag className="w-6 h-6" />
          {itemCount > 0 && <div className='bg-red-600 text-white rounded-full absolute w-4 h-4 flex justify-center items-center top-1 right-2'>{itemCount} </div>}

        </Link>

        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-current border-e-transparent  text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" onMouseOver={() => closeMenu()} ></div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Orders"
                  labelIcon={<RiOrderPlayFill className='text-blue-400' />}
                  href="/orders"
                />
                <UserButton.Link
                  label="Saved Items"
                  labelIcon={<CiSaveDown1 className='text-blue-400' />}
                  href="/create-organization"
                />
                <UserButton.Link
                  label="Saved Address"
                  labelIcon={<FaAddressCard className='text-blue-400' />}
                  href="/create-organization"
                />
              </UserButton.MenuItems>
            </UserButton>
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

      {/* ADDING ANIMATION IN SEARCH BOX OF MOBILE */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 left-0 w-full h-20 bg-white z-50"
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
              <SearchBar />
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

      {/* THIS IS MENU OPTION FOR MEN */}
      <div className='invisible opacity-0 absolute w-max h-full top-14 transition-all duration-200 ' ref={menMenuRef} onMouseLeave={() => closeMenu()} >
        <MenClothingMenu closeMenu={closeMenu} />
      </div>
      <div className='invisible opacity-0 absolute w-max h-full top-14 transition-all duration-200 ' ref={womenMenuRef} onMouseLeave={() => closeMenu()} >
        <WomenClothingMenu closeMenu={closeMenu} />
      </div>
    </div>
  )
}

export default NavBar
