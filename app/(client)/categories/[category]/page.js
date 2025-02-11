import React from 'react'
import ProductView from '@/components/ProductView'
import { getAllProducts } from '@/actions/product'
import Image from 'next/image';
export async function generateMetadata({ params }) {
  const { category } = params;

  // Customize the metadata dynamically
  return {
    title: ` ${category} || FAAX`, // Dynamic title with product name and category
    description: `Buy Your all Faviroute ${category} collection. High quality ${category} products available now. At Cheap and best price With fastest delivery`, // Dynamic description
  };
}
export default async function  page({params}) {
  // const products= await getAllProducts(params.category)
  const res= await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts/${params.category}`,{
    next:{revalidate:3600}
  })
  console.log(res)
  const products=await res.json();
  if (res.ok) {
    console.log('data fetched')
  }
  else{
    return (
      <div className='relative  h-[calc(100vh-3rem)] w-full md:h-[calc(100vh-4rem)]  '>
        <Image src='/img/coming.jpg' height={900} width={900}  className='h-full w-full object-cover' alt='comingimage'/>
      </div>
    )
  }
  if (products.length<1) {
    return (
      <div className='relative  h-[calc(100vh-3rem)] w-full md:h-[calc(100vh-4rem)]  '>
        <Image src='/img/coming.jpg' height={900} width={900}  className='h-full w-full object-cover' alt='comingimage'/>
      </div>
    )
  }
  return (
    <ProductView products={products} />
  )
}

// export default page
