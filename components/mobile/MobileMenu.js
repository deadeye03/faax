"use client"
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaTachometerAlt, FaShoppingCart, FaClipboardList, FaBoxes, FaUser } from 'react-icons/fa';
import { FcBusinessman ,FcBusinesswoman} from "react-icons/fc";

import { GiClothes } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { IoMdPeople } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';
function MoibleMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const [openMenus, setOpenMenus] = useState([]);
    const menuRef = useRef(null)
    const menuItems = [
        {
            title: 'Men',
            icon: <FcBusinessman />,
            subItems: ['t-shirt', 'shirt','jeans','hoodie','sweatshirt']
        },
        {
            title: 'Women',
            icon: <FcBusinesswoman />,
            subItems: ['kurti', 'shirt', 'jeans','plazo','top']
        },
        {
            title: 'Collection',
            icon: <GiClothes />,
            subItems: ['Top-Collection', 'Bottom-Collection', 'Trendy-Collection ']
        }
       

    ];
    const moveMenu = () => {
        if (!isOpen) {
            menuRef.current.style.position = 'absolute'
            menuRef.current.style.left = '80%'
            menuRef.current.style.padding = '1rem'
            menuRef.current.style.borderRadius = '100px'
            menuRef.current.style.zIndex = '1000'

        }
        else {
            menuRef.current.style.position = 'static'
            menuRef.current.style.padding = '0'
            menuRef.current.style.borderRadius = '0px'
            // menuRef.current.style.left='80%'
        }
    }
    const userMenuItem=[ 'profile', 'orders','settings','saved products']
    const toggleMenu = (index) => {
        setOpenMenus(prevOpenMenus =>
            prevOpenMenus.includes(index)
                ? prevOpenMenus.filter(item => item !== index)
                : [...prevOpenMenus, index]
        );
    };

    return (<div className='md:hidden'>
        <div className='  flex flex-col justify-center items-center bg-white gap-[4.5px] z-20 cursor-pointer' ref={menuRef} onClick={() => { setIsOpen((prev) => !prev); moveMenu() }}>
            <div className={`w-6 h-1 bg-blue-600 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? "rotate-45" : ''}`}></div>
            <div className={`w-6 h-1 bg-blue-600 rounded-sm ease-in-out duration-500 ${isOpen ? "opacity-0" : ''}`}></div>
            <div className={`w-6 h-1 bg-blue-600 rounded-sm origin-left ease-in-out duration-500 ${isOpen ? "-rotate-45" : ''}`}></div>
        </div>
        {isOpen &&
            <div className="fixed flex w-full h-full top-0 left-0  justify-center   z-[20]">
                <div className='w-[80%] h-full'>
                    <nav className="w-full h-full  shadow-lg text-xl  bg-slate-100">
                        <ul className="py-4 ">
                            {menuItems.map((item, index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={() => toggleMenu(index)}
                                        className="w-full flex items-center justify-between px-4 py-2  transition-colors duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-2">{item.icon}</span>
                                            <span>{item.title}</span>
                                        </div>
                                        {openMenus.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    {openMenus.includes(index) && (
                                        <ul className="py-2 px-4 mt-1 space-y-2 transition-all duration-300 ease-in-out">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex} onClick={() => { setIsOpen((prev) => !prev); moveMenu() }}>
                                                    <Link
                                                        href={`/categories/${subItem}`}
                                                        className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-400  rounded transition-colors duration-200 ease-in-out"
                                                    >
                                                        {subItem === 'Recent Orders' || subItem === 'List of Product' || subItem === 'Collection List' ? <FaClipboardList className="inline-block mr-2" /> : <FaBoxes className="inline-block mr-2" />}
                                                        {subItem}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    <hr className='bg-black h-[2px]'/>
                        <div className='flex flex-col p-4 text-blue-300 capitalize font-montserrat'>
                            {userMenuItem.map((menu,i)=>{
                                return (
                                    <Link key={i} href={`/${menu}`}>
                                        {menu}
                                    </Link>
                                )
                            })}
                        </div>
                    </nav>


                </div>
                <div className='w-[25%] bg-black bg-opacity-50' onClick={() => { setIsOpen((prev) => !prev); moveMenu() }}>

                </div>
            </div>
        }
    </div>)
}

export default MoibleMenu
