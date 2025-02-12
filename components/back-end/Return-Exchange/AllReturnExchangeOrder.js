"use client"
import { useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import RetrunExchangeTable from './Retrun-Exchange-Table';



const PAGE_SIZE = 10;

const AllOrders = ({orders}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentOrders = orders?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(orders.length / PAGE_SIZE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startItemIndex = startIndex + 1;
    const endItemIndex = Math.min(startIndex + PAGE_SIZE, orders.length);

    return (
        <div>
            <RetrunExchangeTable orders={currentOrders} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <div>
                    Showing {startItemIndex}-{endItemIndex} of {orders.length}
                </div>
                <div className='flex gap-2 p-2'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='cursor-pointer'
                    >
                        <FcPrevious />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='cursor-pointer'
                    >
                        <FcNext />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;