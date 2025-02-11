"use client"
import { updateOrderStatus } from "@/actions/order";
import Image from "@/components/Image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AllProductTable = ({ products }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const handleTableClick = (category, id) => {
        console.log('handleclick', category, id)
        setIsLoading(true)
        router.push(`/admin/Ecommerce/Edit-Product/${category}/${id}`)
    }

    return (
        <div className="container mx-auto mb-4">

            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Pending Orders</h2>
            </div>
            <div className="relative overflow-x-auto">
                {isLoading && <div role="status" className='absolute top-6 w-full flex justify-center items-center'>
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>}
                <table className=" min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-3 text-left">Product_Id</th>
                            <th className="py-3 px-3 text-center"> Name</th>
                            <th className="py-3 px-3 text-center">category</th>
                            <th className="py-3 px-3 text-center">S</th>
                            <th className="py-3 px-3 text-left">M</th>
                            <th className="py-3 px-3 text-center">L</th>
                            <th className="py-3 px-3 text-center">XL</th>
                            <th className="py-3 px-3 text-center">color</th>
                            <th className="py-3 px-3 text-center">price</th>
                        </tr>
                    </thead>
                    {/* this is loading bar whe i click on a product for details */}

                    <tbody className="text-gray-600 text-sm font-light">
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100"
                                onClick={() => handleTableClick(product.category, product.id)} >
                                <td className="py-3 px-3 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{product.id}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex gap-2 items-center">
                                        <span className="h-8 w-8">
                                            <Image path={`${product.images[0]}`} height="50" width="50" loading="lazy" lqip={{ active: true, quality: 5, blur: 10 }} quality="10" className="h-full w-full object-contain " />
                                        </span>
                                        <span>{product.name} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex items-center">
                                        <span>{product.category} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex items-center">
                                        <span>{product.s_size} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-left">
                                    <div className="flex items-center">
                                        <span>{product.m_size} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <div className="flex items-center">
                                        <span>{product.l_size} </span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{product.xl_size} </span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{product.color}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                    <span>{product.price}</span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProductTable;