
import React from 'react';


const LoadingSkeleton = () => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 md:gap-8">
      {Array.from({ length: 15 }, (_, i) => {
        return <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 animate-pulse">
          <div className="relative">
            <div className="w-full h-36 sm:h-48 md:h-56 lg:h-64 bg-gray-300"></div>
            <div className="absolute top-0 right-0 m-2 sm:m-4 bg-gray-300 rounded-full p-1 sm:p-2 w-8 h-8"></div>
            <div className="absolute bottom-0 left-0 m-2 sm:m-4 bg-gray-300 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md w-12 h-6"></div>
          </div>
          <div className="p-3 sm:p-4 md:p-5">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-300 rounded w-full hidden sm:block"></div>
          </div>
        </div>
      })}
    </div>
  );
};

export default LoadingSkeleton;
