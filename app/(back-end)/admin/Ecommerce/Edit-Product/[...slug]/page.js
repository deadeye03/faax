import { getAllCategories } from '@/actions/product'
import EditProductPage from '@/components/back-end/Ecommerce/EditProuduct'
import React from 'react'

async function page({ params }) {
    const category = params.slug[0]
    const id = params.slug[1]
    console.log("category and id", category, id)
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts/${category}/${id}`,
        { next: { revalidate: 3600 } }
    )
    const product = await res.json();
   const categories=await getAllCategories();
   console.log('categories is ',categories.category)
    return (
        <>
            <EditProductPage productData={product} categories={categories.category} />
        </>
    )
}

export default page
