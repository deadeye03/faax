"use client"
import React, { useRef, useState } from 'react'

function DeliveryOption({isTrial, setIsTrial }) {


    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Mode <span className="text-red-500">*</span></h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <label className={`flex flex-col items-start p-4 rounded-lg cursor-pointer ${isTrial === false ? "border-2 border-blue-500" : "border border-gray-200"}`}>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="isTrial"
                            value="standard"
                            checked={isTrial === false}
                            onChange={() => setIsTrial(false)}
                            className="mr-2"
                        />
                        <span className="font-semibold">STANDARD</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                        Our delivery partner will deliver the garments at your location.
                        Exchange/returns allowed up to 7 days from date of delivery.
                    </p>
                </label>
                <label className={`flex flex-col items-start p-4 rounded-lg cursor-pointer ${isTrial === true ? "border-2 border-blue-500" : "border border-gray-200"}`}>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="isTrial"
                            value="trial"
                            checked={isTrial === true}
                            onChange={() => setIsTrial(true)}
                            className="mr-2"
                        />
                        <span className="font-semibold">TRY & BUY</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                        Our delivery partner will bring you the outfits and you can try and buy the ones you like.
                        Yes, he will wait patiently for you to make your decision.
                        No return/exchanges allowed after you have made this purchase.
                        <span className="block mt-2 font-semibold text-green-600">+₹50 Additional</span>
                    </p>
                </label>
            </div>
        </div>

    )
}

export default DeliveryOption
