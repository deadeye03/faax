"use client"
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTachometerAlt, FaShoppingCart, FaClipboardList, FaBoxes, FaUser } from 'react-icons/fa';
import { GiClothes } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { IoMdPeople } from 'react-icons/io';
import { TbReportAnalytics,TbTruckReturn } from 'react-icons/tb';

import Link from 'next/link';
const VerticalMenu = () => {
  const [openMenus, setOpenMenus] = useState([]);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaTachometerAlt />,
      subItems: ['Recent-Orders', 'Sales-Report']
    },
    {
      title: 'Ecommerce',
      icon: <FaShoppingCart />,
      subItems: ['Add-Product','Manage-Product', 'List-of-Product']
    },
    {
        title :'Orders',
        icon : <GoListOrdered/>,
        subItems :['Pending-Orders','Delivered-Order', 'All-Orders']
    },
    {
        title :'Return-Exchange',
        icon : <TbTruckReturn/>,
        subItems :['Pending-Orders','PickedUp-Orders', 'All-Orders']
    },
    {
        title:'Collection',
        icon:<GiClothes/>,
        subItems:['Add-Collection','Collection-List', 'Manage-Collection ']
    },
    {
        title :'Category',
        icon : <BiCategory/>,
        subItems:['Add-Category', 'Manage-Category']
    },
    {
        title :'Users',
        icon : <FaUser/>,
        subItems :['Users List','Manage User']
    },
    {
        title :'Staff',
        icon :<IoMdPeople/>,
        subItems :['Staff List','Manage Staff']
    },
    {
        title :'Report',
        icon : <TbReportAnalytics/>,
        subItems :['Home','Sell catalog']
    }

  ];

  const toggleMenu = (index) => {
    setOpenMenus(prevOpenMenus =>
      prevOpenMenus.includes(index)
        ? prevOpenMenus.filter(item => item !== index)
        : [...prevOpenMenus, index]
    );
  };

  return (
    <div className="">
      <nav className="w-full shadow-lg">
        <ul className="py-4">
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
                    <li key={subIndex}>
                      <Link
                        href={`/admin/${item.title}/${subItem}`}
                        className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-400  rounded transition-colors duration-200 ease-in-out"
                      >
                        {subItem === 'Recent Orders' || subItem === 'List of Product' || subItem ==='Collection List' ? <FaClipboardList className="inline-block mr-2" /> : <FaBoxes className="inline-block mr-2" />}
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
};

export default VerticalMenu;
