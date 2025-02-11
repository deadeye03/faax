"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PincodeSelector from './PincodeSelector'
import { addAddress, userWithAddress } from '@/actions/address'
import toast from 'react-hot-toast'
export default function AddressDetailsForm({setShowNewAddress}) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [isPinCode, setIsPinCode] = useState(false)
  const [isAddress, setIsAddress] = useState( )
  console.log(isAddress)

  const onSubmit = async (data) => {
    if (!isPinCode) {
      alert('please enter your pincode')
      return;
    }
    console.log('Address Details:', await data)
    // Here I send the data to my database

    const res = await addAddress(data)
    if (res) {
      toast.success('Address is successfully added please choose one')
      setShowNewAddress(false)
    }
    else {
      alert('unable to add address to data base...')
      setShowNewAddress(false)
    }

  }

  const handlePincodeSelect = (pincode) => {
    setValue('pinCode', pincode)
    setIsPinCode(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full  mx-auto">

      <PincodeSelector onPincodeSelect={handlePincodeSelect} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className=" " >
          <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: ' name is required', minLength: 4, maxLength: 25 })}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
          {errors.streetName && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className=" " >
          <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">
            Street Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('streetName', { required: 'Street name is required and should be minimum 15 letter', minLength: 15 })}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter street name"
          />
          {errors.streetName && (
            <p className="mt-1 text-sm text-red-600">{errors.streetName.message}</p>
          )}
        </div>
        <div className=" " >
          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
            landmark <span className="text-red-500">*</span>
          </label>
          <input
            {...register('landmark', { required: 'Landmark name is required and minimum 10 letter', minLength: 10 })}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your nearest place"
          />
          {errors.landmark && (
            <p className="mt-1 text-sm text-red-600">{errors.landmark.message}</p>
          )}
        </div>

        <div className="">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Please enter a valid 10-digit phone number'
              }
            })}
            type="tel"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>
      <h1 className='text-center'>

        <button
          type="submit"
          className="w-max mt-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Address
        </button>
      </h1>
    </form>
  )
}