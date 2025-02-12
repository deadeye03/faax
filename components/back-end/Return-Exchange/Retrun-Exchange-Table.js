"use client"
import { updateReturnExchangeOrderStatus } from "@/actions/returnExchange";
import Image from "@/components/Image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";

const RetrunExchangeTable = ({ orders }) => {

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (orderId) => {
        setOpenDropdown(openDropdown === orderId ? null : orderId);
    };

    const updateReturnExchangeStatus = async (orderId, newStatus) => {
        // Here you would update the order status in your actual data
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
        confirm('are you sure want to change status. after change you can not re change previous status..')
        const update= await updateReturnExchangeOrderStatus(orderId, newStatus)
        update?toast.success('Order Updated'):toast.error('Something went wrong');
        setOpenDropdown(null);
    };

    return (
        <div className="container mx-auto h-[calc(100vh-4rem)]">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Return - Exchange Orders</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-3 text-left">Order ID</th>
                            <th className="py-3 px-3 text-center">User Name</th>                      
                            <th className="py-3 px-3 text-center">item_name</th>
                            <th className="py-3 px-3 text-left">Type</th>
                            <th className="py-3 px-3 text-center">Price</th>
                            <th className="py-3 px-3 text-center">Quantity</th>
                            <th className="py-3 px-3 text-center">Category</th>
                            <th className="py-3 px-3 text-center">Reason</th>
                            <th className="py-3 px-3 text-center">Size</th>
                            <th className="py-3 px-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-3 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{order.id}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex items-center">
                                        <span>{order.user.name} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex items-center gap-1">
                                        <span className="h-8 w-8">
                                            <Image path={`${order.orderItem.image}`} height="100" width="100" className="h-full w-full object-contain " />
                                        </span>
                                        <span>{order.orderItem.name} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex items-center">
                                        <span>{order.type}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                        {order.orderItem.price}
                                    </span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{order.orderItem.quantity}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{order.orderItem.category}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{order.reason}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{order.orderItem.size}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <div className="relative inline-block text-left">
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

                                        {openDropdown === order.id && order.status !== 'COMPLETED' && (
                                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    {['REJECTED','APPROVED', 'PROCESSING', 'COMPLETED'].map((status, i) => (
                                                        <button
                                                            key={status}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                            role="menuitem"
                                                            onClick={() => updateReturnExchangeStatus(order.id, status)}
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

export default RetrunExchangeTable;