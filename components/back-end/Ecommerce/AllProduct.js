'use client'

import React, { useState, useEffect } from 'react'
import AllProductTable from './AllProductTabel'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { findProducts } from '@/actions/product'

const PAGE_SIZE = 10

const AllProducts = ({ initialProducts }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [products, setProducts] = useState(initialProducts)

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm) {
                const result = await findProducts(searchTerm)
                if (result.success) {
                    setProducts(result.data)
                } else {
                    console.error(result.error)
                    // Optionally, you can set an error state here and display it to the user
                }
            } else {
                setProducts(initialProducts)
            }
            setCurrentPage(1)
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, initialProducts])

    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    const currentProducts = products.slice(startIndex, endIndex)

    const totalPages = Math.ceil(products.length / PAGE_SIZE)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const startItemIndex = startIndex + 1
    const endItemIndex = Math.min(startIndex + PAGE_SIZE, products.length)

    const getPageNumbers = () => {
        const pageNumbers = []
        const totalPageNumbers = 7
        const sidePageNumbers = Math.floor((totalPageNumbers - 3) / 2)

        if (totalPages <= totalPageNumbers) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else if (currentPage <= sidePageNumbers + 1) {
            for (let i = 1; i <= totalPageNumbers - 2; i++) {
                pageNumbers.push(i)
            }
            pageNumbers.push('...')
            pageNumbers.push(totalPages)
        } else if (currentPage >= totalPages - sidePageNumbers) {
            pageNumbers.push(1)
            pageNumbers.push('...')
            for (let i = totalPages - (totalPageNumbers - 3); i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            pageNumbers.push(1)
            pageNumbers.push('...')
            for (let i = currentPage - sidePageNumbers; i <= currentPage + sidePageNumbers; i++) {
                pageNumbers.push(i)
            }
            pageNumbers.push('...')
            pageNumbers.push(totalPages)
        }

        return pageNumbers
    }

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <AllProductTable products={currentProducts} />

            <div className="flex justify-between items-center mb-3">
                <div>
                    Showing {startItemIndex}-{endItemIndex} of {products.length}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FcPrevious />
                    </button>
                    {getPageNumbers().map((pageNumber, index) => (
                        <React.Fragment key={index}>
                            {pageNumber === '...' ? (
                                <span className="px-2">...</span>
                            ) : (
                                <button
                                    onClick={() => handlePageChange(pageNumber)}
                                    disabled={currentPage === pageNumber}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        currentPage === pageNumber
                                            ? 'bg-blue-500 text-white'
                                            : 'hover:bg-gray-200'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FcNext />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllProducts