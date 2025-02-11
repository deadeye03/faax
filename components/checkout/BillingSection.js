import React from 'react'

function BillingSection({totalQuantity,initialPrice,totalDiscount}) {
    return (
    < div className="bg-white rounded-lg shadow-md p-6 mb-6" >
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
            <span>Price<span className='text-[10px]'>({totalQuantity} item)</span>:</span>
            <span>${initialPrice.toFixed(0)}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Discount:</span>
            <span className='text-green-500' >-${totalDiscount.toFixed(0)}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Delivery Charge:</span>
            <span className='line-through' >$50  </span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4 border-t">
            <span>Total:</span>
            <span>${((initialPrice - totalDiscount)).toFixed(2)}</span>
        </div>
    </div >
    )
}

export default BillingSection
