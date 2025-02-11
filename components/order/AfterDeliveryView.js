"use client"
import React, { useEffect, useState } from 'react'
import { ChevronRight, Edit, Truck, CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { useScroll } from 'framer-motion'
import { getReturnExchangeStatus, CreateReturnExchangeOrder } from '@/actions/returnExchange'
import toast from 'react-hot-toast'
import { FaClockRotateLeft } from 'react-icons/fa6'
import { FcApprove } from 'react-icons/fc'
import { FaTruck } from 'react-icons/fa'

function AfterDeliveryView({ orderId, itemId, deliveredAt, status }) {
    const [showReason, setShowReason] = useState(false)
    const [type, setType] = useState('')
    const [reason, SetReason] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    // console.log(reason)
    const [returnStat,setReturnStatus]=useState()

    
    //CHECK RETURN EXCHANGE STATUS IF RETURN EXCHANGE INITIATE
    useEffect(() => {
        const getStatus = async () => {
           let returnStatus = await getReturnExchangeStatus(itemId)
            setReturnStatus(returnStatus)
            switch (returnStatus.status) {
                case 'PENDING':
                    setCount(0)
                    break;
                case 'APPROVED':
                    setCount(1)
                    break;
                case 'PROCESSING':
                    setCount(2)
                    break;
                case 'COMPLETED':
                    setCount(3)
                    break;
                case 'REJECTED':
                    setCount(4)
                default:
                    setCount(0)
                    break;
            }
        }
        getStatus();
    }, [])
    console.log('returnStatus',returnStat)
    //CREATE RETURN EXCHANGE ORDER


    const onSubmit = async () => {
        setLoading(true)
        if (!reason) {
            alert('Plese choose a return reason')
            setLoading(false)
            return;
        }
        const orderItem = {
            orderId,
            type,
            reason,
            orderItemId: itemId
        }
        console.log("order is item", orderItem);
        const returnExchange = await CreateReturnExchangeOrder(orderItem);
        if (returnExchange) {
            toast.success('Return / Exchange created successfully')
        }
        else {
            toast.error('Something went wrong please try again.')
        }
        setLoading(false)
        setShowReason(false)
    }

    return (
        <>
            {isLoading &&
                <div role="status" className='fixed left-0 top-0 flex justify-center items-center bg-opacity-50 bg-black h-[100vh] w-full'>
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>}
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">✓</div>
                    <p>Order Confirmed, Aug 07</p>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">✓</div>
                    <p>Delivered, Aug 12</p>
                </div>
                <Button variant="link" className="mt-2 p-0 h-auto">
                    See All Updates <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            {/* Return Policy */}
            <div className="p-4 text-gray-500">
                Return policy ended on Aug 19
            </div>

            {/* RETURN STATUS TRACKER */}
            
            {status !== 'DELIVERED' &&
                <div className="flex flex-col  justify-between items-start md:items-center">
                    <h1 className='pl-4 pb-2 font-bold text-green-500'>Retun Status</h1>
                    <div className="relative flex justify-center h-max items-center md:mb-0 w-full">
                        {/* Line connecting status icons */}
                        {/* pending */}
                        <div className="flex flex-col items-center   md:mb-0  bg-white">
                            <div className={`w-8 h-8 rounded-full ${count > -1 ? 'bg-red-500' : 'bg-red-500'} flex items-center justify-center text-white mb-2`}>
                                <FaClockRotateLeft className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">PENDING</span>
                            <span className="font-medium text-[10px]">
                            {returnStat?.createdAt ? new Date(returnStat.createdAt).toLocaleString() : ''}
                             </span>
                        </div>
                        <div className={`w-12 h-0.5 md:w-48 md:h-0.5 ${count > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        {/* Confirmed */}
                        <div className="flex flex-col items-center  md:mb-0  bg-white">
                            <div className={`w-8 h-8 rounded-full ${count > 0 ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center text-white mb-2`}>
                                <FcApprove className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">APPROVED</span>
                            <span className="font-medium text-[10px]">
                            {returnStat?.approvedAt ? new Date(returnStat.approvedAt).toLocaleString() : ''}
                             </span>
                        </div>
                        <div className={`w-12 h-0.5 md:w-48 md:h-0.5 ${count > 1 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        {/* Out for Delivery */}
                        <div className="flex flex-col items-center  md:mb-0  bg-white">
                            <div className={`w-8 h-8 rounded-full ${count > 1 ? 'bg-blue-500 ' : 'bg-gray-400'} flex items-center justify-center text-white mb-2`}>
                                <FaTruck className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm"> Pickup</span>
                            <span className="font-medium text-[10px]">
                            {returnStat?.processedAt ? new Date(returnStat.processedAt).toLocaleString() : ''}
                             </span>
                        </div>
                        <div className={`w-12 h-0.5 md:w-48 md:h-0.5 ${count > 2 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        {/* Delivered */}
                        <div className="flex flex-col items-center bg-white">
                            <div className={`w-8 h-8 rounded-full ${count > 2 ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center text-white mb-2`}>
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm text-gray-500">COMPLETED</span>
                            <span className="font-medium text-[10px]">
                            {returnStat?.completedAt ? new Date(returnStat.completedAt).toLocaleString() : ''}
                             </span>
                        </div>
                    </div>
                </div>
            }

            {/* Return and Exchange Buttons */}
            {/* if status of orderItem is delivered */}
            {status === 'DELIVERED' ?
                <div className="p-4 flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => { setShowReason(true); setType('RETURN') }} >Return</Button>
                    <Button variant="outline" className="flex-1" onClick={() => { setShowReason(true); setType('EXCHANGE') }}>Exchange</Button>
                </div> : <div className="p-4 flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => { setShowReason(true); setType('RETURN') }} >Cancel Return</Button>
                    <Button variant="outline" className="flex-1" onClick={() => { setShowReason(true); setType('EXCHANGE') }}>Need Help</Button>
                </div>}
            {showReason &&
                <div className='w-max border rounded'>
                    <h1 className='bg-yellow-500 w-max pl-2 text-white text-xl'>Choose One Option for {type}
                        <span className="text-red-500">*</span>
                        <span className='bg-white p-2 text-black cursor-pointer' onClick={() => setShowReason(false)}>&times; </span>
                    </h1>

                    <div className='p-1 flex gap-2 items-center font-bold font-montserrat text-sm'>
                        <input type="radio" name="reason" id="size" value='SIZE_FIT_ISSUE' onChange={(e) => SetReason(e.target.value)} />
                        <label htmlFor="size">Wrong Item Size </label>
                    </div>
                    <div className='p-1 flex gap-2 items-center font-bold font-montserrat text-sm'>
                        <input type="radio" name="reason" id="color_issue"
                            value='COLOR_ISSUE'
                            onChange={(e) => SetReason(e.target.value)} />
                        <label htmlFor="color_issue">Didn't Like color</label>
                    </div>
                    <div className='p-1 flex gap-2 items-center font-bold font-montserrat text-sm'>
                        <input type="radio" name="reason" id="wrong_item"
                            value='WRONG_ITEM'
                            onChange={(e) => SetReason(e.target.value)} />
                        <label htmlFor="wrong_item">Recived a wrong Item </label>
                    </div>
                    <div className='p-1 flex gap-2 items-center font-bold font-montserrat text-sm'>
                        <input type="radio" name="reason" id="wrong_item"
                            value='WRONG_ITEM'
                            onChange={(e) => SetReason(e.target.value)} />
                        <label htmlFor="wrong_item">Recived a wrong Item </label>
                    </div>
                    <div className='p-1 flex gap-2 items-center font-bold font-montserrat text-sm'>
                        <input type="radio" name="reason" id="damage"
                            value='DAMAGED'
                            onChange={(e) => SetReason(e.target.value)} />
                        <label htmlFor="damage">Recived Damaged product </label>
                    </div>
                    <div className='p-1 flex gap-2 items-center font-bold font-montserrat text-sm'>
                        <input type="radio" name="reason" id="other"
                            value='OTHER'
                            onChange={(e) => SetReason(e.target.value)} />
                        <label htmlFor="other">Other </label>
                    </div>
                    <h4 className='text-center' >
                        <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                            onClick={() => onSubmit()}
                        >{type} </button>
                    </h4>
                </div>
            }
            {/* Rate Experience */}
            <div className="p-1">
                <h3 className="text-gray-500 mb-2">Rate your experience</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <p className="font-semibold mr-2">Great</p>
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AfterDeliveryView
