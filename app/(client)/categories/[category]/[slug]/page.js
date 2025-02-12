import prisma from '@/lib/db/prisma'
import ProductDetails from '@/components/Desktop/ProductDetails'
import MobileProductView from '@/components/mobile/MobileProductView'

import React from 'react'
import AllRecomndedProduct from '@/components/recomendation/AllRecomndedProduct'


async function page({ params }) {
   
    const res= await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts/${params.category}/${params.slug}`,
        { next:{revalidate:3600}}
    )
    const product=await res.json();
    console.log(params.category, params.slug)
    return (<>
        <div className='hidden md:block'>
            <ProductDetails product={product} />
        </div>
        <div className=' md:hidden'>
            <MobileProductView product={product} />
        </div>

        {/* product recomendation */}
        {/* 1.Recomendation by category and gender */}
        <AllRecomndedProduct category={product.category} gender={product.gender} />
        <AllRecomndedProduct category={'jeans'} gender={product.gender} />
    </>
    )
}

export default page
export async function generateMetadata({ params }) {
    const { category, slug } = params;

    // Fetch the product details to use in metadata
    // const product = await getOneProduct(category, slug)
    const product = await prisma.product.findUnique({
        where: { category, id: slug }
    })

    // Customize the metadata dynamically
    return {
        title: `${product.name} || ${category}`, // Dynamic title with product name and category
        description: `Buy ${product.title} in our ${category} collection. High quality ${category} products available now.`, // Dynamic description
    };
}
