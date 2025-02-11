"use client"
import Link from 'next/link'
import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { CiShoppingTag } from "react-icons/ci";

function Footer() {
  return (
    <footer className='px-8 py-6 bg-[#181818]'>
      <div className="footer_container font-montserrat">
        <h1 className='font-krona text-3xl text-[var(--footer)] font-extrabold '>FAAX</h1>
        <div className="our_policy flex-col flex px-2 mt-3  text-white md:flex-row md:px-6 md:mt-7">

          <div className="sevice flex-1 flex flex-col text-sm ">
            <h2 className='text-[var(--footer)] my-2 uppercase md:mb-4'>COUSTEM SERVICE</h2>
            <Link href='/' >Contact Us</Link>
            <Link href='/' >Track Order</Link>
            <Link href='/' >Return Order</Link>
            <Link href='/' >Cancel Order</Link>
          </div>

          <div className="company flex-1 flex flex-col text-sm">
            <h2 className='text-[var(--footer)] my-2 uppercase md:mb-4'>COMPANY</h2>
            <Link href='/' >About Us</Link>
            <Link href='/' >We're Hiring</Link>
            <Link href={`${process.env.NEXT_PUBLIC_URL}/Policy/Terms&Condition`} >Terms & Condition</Link>
            <Link href='/' >Privacy Policy</Link>
            <Link href='/' >Blog</Link>
          </div>

          <div className="connect flex-1 flex flex-col text-sm">
            <h2 className='text-[var(--footer)] my-2 uppercase md:mb-4'>Connect With Us</h2>
            <Link href='/' >Face-book</Link>
            <Link href='/' >Insta</Link>
            <div className='social-icon'>

            </div>
          </div>

          <div className="email ml-9 flex-1 flex flex-col text-sm">
            <h2 className='text-[var(--footer)] my-2 uppercase md:mb-4'>Keep Upto Update</h2>
          </div>

        </div>
        <div className="highlight flex-col justify-center flex mt-9 px-8 text-white font-montserrat md:flex-row">
          <div className=" flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-4">
              <CiShoppingTag className='h-5 w-5 text-white ' /><span> First Try & Buy </span>
            </div>
            <div className="flex items-center gap-4">
              <FiShoppingBag className='h-5 w-5' /> Hussle Free Return in 7 days
            </div>
          </div>

          <div className=" flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-4">
              <HiOutlineCurrencyRupee className='h-5 w-5 text-white ' /><span> Cash On Delivery </span>
            </div>
          </div>

          <div className=" flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-4">
              <CiShoppingTag className='h-5 w-5 text-white ' /><span className='text-[var(--footer)]'> 100% SECURE PAYMENTS </span>
            </div>
            <div className="flex items-center gap-4">
              <img src="/img/payment.webp" alt="payments" />
            </div>
          </div>

        </div>

        <hr className='bg-white h-1 w-full mt-6'/>

      </div>
    </footer>

  )
}

export default Footer
