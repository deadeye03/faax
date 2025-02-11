"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Search } from 'lucide-react'
import { getAllPincodes } from '@/actions/address'

const fetchPinCodes = async (search = '') => {
  const allPinCodes = await getAllPincodes();
  return allPinCodes.filter(code => code.startsWith(search))
}

export default function PincodeSelector({ onPincodeSelect }) {
  const [pinCodes, setPinCodes] = useState([])
  const [showList, setShowList] = useState(false)
  const { control, formState: { errors }, setValue } = useForm()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const loadPinCodes = async () => {
      const codes = await fetchPinCodes()
      setPinCodes(codes)
    }
    loadPinCodes()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handlePinCodeSelect = (pincode) => {
    setValue('pinCode', pincode)
    setShowList(false)
    onPincodeSelect(pincode)
  }

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
        Select Pin Code <span className="text-red-500">*</span>
      </label>
      <Controller
        name="pinCode"
        control={control}
        rules={{ required: 'Pin code is required' }}
        render={({ field }) => (
          <div className="relative">
            <input
              {...field}
              type="text"
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter pin code"
              onFocus={() => setShowList(true)}
              onChange={(e) => {
                field.onChange(e)
                fetchPinCodes(e.target.value).then(setPinCodes)
              }}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        )}
      />
      {errors.pinCode && (
        <p className="mt-1 text-sm text-red-600">{errors.pinCode.message}</p>
      )}
      {showList && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {pinCodes.map((pincode, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handlePinCodeSelect(pincode)}
            >
              {pincode}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}