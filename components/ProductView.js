"use client"
import React, { lazy, useState } from "react";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import ImageUploadKit from "./ImageUploadKit";
import Image from "./Image";
import Link from "next/link";

const ProductView = ({ products }) => {

  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = (productId) => {
    setLikedProducts((prevLiked) =>
      prevLiked.includes(productId)
        ? prevLiked.filter((id) => id !== productId)
        : [...prevLiked, productId]
    );
  };

  // This page where sell all of products of a category.......
  return (
    <div className="container mx-auto px-[2px] py-4 md:px-4 md:py-8 bg-gray-100">
      <h2 className="text-xl pl-4 font-montserrat font-bold text-start md:pl-8 mb-4 text-gray-800">total Results: {products.length} </h2>
      <div className="grid gap-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  sm:gap-0 md:gap-8">
        
        {products.map((product) => (
          <Link href={`${process.env.NEXT_PUBLIC_URL}/categories/${product.category}/${product.id}`}
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-100  md:transform md:transition md:duration-300 md:hover:scale-105"
          >
            <div className="relative">
              <div className=' relative h-[200px] w-[200px] md:w-[290px] md:h-[300px] '>
                <Image path={`/${product.images[0]}`} height={500} width={500} loading={lazy} lqip={{ active: true, quality: 5 }} alt={`${product.id}`} className='w-full h-full object-cover object-top' />
              </div>
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-0 right-0 m-2 sm:m-4 bg-white rounded-full p-1 sm:p-2 shadow-md"
              >
                <FaHeart
                  className={`text-lg sm:text-xl ${likedProducts.includes(product.id) ? "text-red-500" : "text-gray-400"}`}
                />
              </button>
              <div className="absolute bottom-0 left-0 m-2 sm:m-2 bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                -{product.discount}%
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-5">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-1 text-gray-800">{product.name}</h3>
              <div className="flex items-center mb-1 gap-1 sm:mb-1 border w-max rounded-sm p-1 md:px-2">
                <FaStar className="text-yellow-400 mr-1 text-xs sm:text-sm" />
                <span className="text-gray-600 text-xs sm:text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <div className="mb-2 sm:mb-2">
                <span className="line-through text-gray-500 mr-2 text-xs sm:text-sm">
                  ${Math.round(Math.floor(product.price / (1 - (product.discount / 100))))}
                </span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-green-600">
                  ${product.price}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductView;
