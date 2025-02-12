"use client"
import { updateOrderStatus } from "@/actions/order";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";

const PendingOrdersTable = ({ orders }) => {
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const checkStatus = (status) => {
    switch (status) {
      case 'PENDING':
        setCount(0)
        break;
      case 'CONFIRMED':
        setCount(1)
        break;
      case 'OutForDelivery':
        setCount(2)
        break;
      case 'COMPLETED':
        setCount(3)
        break;
      case 'CANCELLED':
        setCount(4);
        break;
      default:
        setCount(0)
        break;
    }
  }

  const toggleDropdown = (orderId) => {
    setOpenDropdown(openDropdown === orderId ? null : orderId);
  };

  const updateStatus = async (orderId, newStatus) => {
    // Here you would update the order status in your actual data
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    if (confirm('are you sure want to change status. after change you can not re change previous status..')) {
      setIsLoading(true)
      checkStatus(newStatus)
      const update=await updateOrderStatus(orderId, newStatus)
      if (update) {
        toast.success('Status is updated..')
        setOpenDropdown(null);
        setIsLoading(false)        
      }
      else{
        toast.error('Unable to update status ')
        setOpenDropdown(null);
        setIsLoading(false)
      }
    }
    else {
      setOpenDropdown(false);

      return;
    }
  };

  const handleTableClick = (id) => {
    setIsLoading(true)
    router.push(`/admin/OrderItemDetails/${id}`)
  }

  return (
    <div className="container mx-auto ">

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pending Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="relative min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-1 text-left">Order ID</th>
              <th className="py-3 px-1 text-center">User Name</th>
              <th className="py-3 px-1 text-center">Ph_No.</th>
              <th className="py-3 px-1 text-left">Delivery Mode</th>
              <th className="py-3 px-1 text-center">Price</th>
              <th className="py-3 px-1 text-center">Quantity</th>
              <th className="py-3 px-1 text-center">Payment Mode</th>
              <th className="py-3 px-1 text-center">order_time</th>
              <th className="py-3 px-1 text-center text-green-600 ">Delivery_Agent</th>
              <th className="py-3 px-1 text-center">Status</th>
            </tr>
          </thead>
          {isLoading && <div role="status" className='absolute top-4 w-full flex justify-center items-center'>
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}
          <tbody className=" text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr key={order.id} className=" border-b border-gray-200 hover:bg-gray-100"
                onClick={() => handleTableClick(order.id)} >

                <td className="py-3 px-1 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{order.id}</span>
                  </div>
                </td>
                <td className="py-3 px-1 text-left">
                  <div className="flex items-center">
                    <span>{order.user.name} </span>
                  </div>
                </td>
                <td className="py-3 px-1 text-left">
                  <div className="flex items-center">
                    <span>{order.user.phoneNumber} </span>
                  </div>
                </td>
                <td className="py-3 px-1 text-left">
                  <div className="flex items-center">
                    <span className="bg-purple-200 text-pink-500 py-1 px-1 rounded-full text-xs">{order.isTrial ? 'Trial' : 'Standard'}</span>
                  </div>
                </td>
                <td className="py-3 px-1 text-center">
                  <span className="bg-purple-200 text-purple-600 py-1 px-1 rounded-full text-xs">
                    {order.total}
                  </span>
                </td>
                <td className="py-3 px-1 text-center">
                  <span>{order.itemsQuantity}</span>
                </td>
                <td className="py-3 px-1 text-center">
                  <span>{order.paymentMethod}</span>
                </td>
                <td className="py-3 px-1 text-center">
                  <span> {new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} </span>
                </td>
                <td className="py-3 px-1 text-center ">
                  {order.deliveryAgentId ?
                    <span className="bg-green-300 text-black py-1 px-1 rounded-full text-xs" >{order.deliveryAgent.name}</span> :
                    <span className="bg-red-300 text-red-800 py-1 px-1 rounded-full text-xs" >Not Assign</span>}

                </td>
                <td className="py-3 px-1 text-center">

                  <div className="relative inline-block text-left"
                    onClick={(e) => e.stopPropagation()}>
                    <div>

                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={() => toggleDropdown(order.id)}
                      >
                        {order.status}
                        {order.status !== 'COMPLETED' && <FaChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />}

                      </button>
                    </div>

                    {openDropdown === order.id && order.status === 'PENDING' && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {['CONFIRMED', 'CANCELLED'].map((status, i) => (
                            <button
                              key={status}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                              onClick={() => updateStatus(order.id, status)}
                            >

                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrdersTable;