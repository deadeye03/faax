'use client'

import { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'


export default function AddressSection({
  addresses,
  setAddressId,
  addressId,
  setShowNewAddress,
  showNewAddress
}) {
  useEffect(() => {
    if (addresses.length > 0 && !addressId) {
      setAddressId(addresses[0].id)
    }
  }, [addresses, addressId, setAddressId])

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address <span className="text-red-500">*</span></h2>
        {addresses.map((address, index) => (
          <div key={address.id} className="mb-4">
            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ${addressId === address.id ? 'border-2 border-primary bg-primary/10' : 'border border-gray-200 hover:border-primary/30'}`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={addressId === address.id}
                  onChange={() => setAddressId(address.id)}
                  className="mr-3 h-5 w-5 text-primary"
                />
                <div>
                  <span className="text-gray-700">{address.name}, </span>
                  <span className="text-gray-700">{address.pinCode}, </span>
                  <span className="text-gray-700">{address.streetName},</span>
                  <span className="text-gray-700">{address.phoneNumber}</span>
                </div>
              </div>
              <button
                className="text-primary hover:text-primary/80 focus:outline-none"
                onClick={() => console.log(`Edit address: ${JSON.stringify(address)}`)}
              >
                <FaEdit size={18} />
              </button>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}