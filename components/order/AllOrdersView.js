import React from "react";
import { FaBox, FaExchangeAlt, FaUndo, FaCheckCircle } from "react-icons/fa";
import Image from "../Image";
import Link from "next/link";
const AllOrdersView = ({ orders }) => {
   
    const getStatusIcon = (status) => {
        switch (status) {
            case "DELIVERED":
                return <FaCheckCircle className="text-green-500" />;
            case "exchange":
                return <FaExchangeAlt className="text-blue-500" />;
            case "return":
                return <FaUndo className="text-red-500" />;
            default:
                return <FaBox className="text-gray-500" />;
        }
    };


    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2 md:mb-6">Your Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    order.orderItems?.map((item) => (
                        <Link href={`/orders/${order.id}/${item.id}`} key={item.id} className="bg-white rounded-lg  p-2 md:p-4">
                            <div className="flex gap-2    items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
                                <Image
                                    path={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                                    height={200}
                                    width={200}
                                />
                                <div className="flex-grow text-left md:text-center sm:text-left">
                                    <h2 className="text-lg sm:text-xl font-semibold ">{item.name}</h2>
                                    <p className="text-sm text-gray-600 ">size : {item.size} </p>
                                    <p className="text-sm text-gray-600 ">quantity : {item.quantity} </p>
                                    <p className="text-sm text-gray-600 ">Price: ${item.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600 mb-1">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                                    <div className="flex items-center justify-center sm:justify-start mt-2">
                                        <span className="text-sm mr-2 font-bold">Status:</span>
                                        {getStatusIcon(item.status)}
                                        <span className="text-sm ml-1">{order.status=='COMPLETED'?item.status:order.status}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))

                ))}
            </div>
        </div>
    );
};

export default AllOrdersView;