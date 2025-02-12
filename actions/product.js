"use server"

// import prisma from "@/lib/db/prisma";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const getAllProducts = async (category) => {
  try {
    const products = await prisma.product.findMany()
    return products;
  } catch (error) {
    console.log('Unabel to fetch data from database', error)
    throw new Error("Unabel to fetch data from database");

  }
}
//upadate product
export async function updateProductData(id, productData) {
  // const { id: _, ...updateData } = productData;
  try {
    const update = await prisma.product.update({
      where: {
        id
      },
      data: productData
    })
    console.log('update product is ', update)
    return true
  } catch (error) {
    console.log('Unable ot update product ', error)
    return false
  }
}

//DElete product

export async function deleteProuduct(id) {
  try {
     await prisma.product.delete({
      where: {
        id
      }
    }) 
    return true
  } catch (error) {
    console.log('Unable ot update product ', error)
    return false
  }
}
export async function findProducts(searchTerm) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { id: { equals: searchTerm } },
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { category: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      take: 100 // Limit the number of results
    })

    return { success: true, data: products }
  } catch (error) {
    console.error('Error finding products:', error)
    return { success: false, error: 'Failed to find products' }
  }
}



export async function addCategoryToExisting(newCategory) {
  try {
    // Assuming you have a single document for categories
    // If you have multiple documents, you'll need to specify which one to update
    const updatedCategories = await prisma.categories.updateMany({
      data: {
        category: {
          push: newCategory
        }
      }
    })

    console.log('Category added to existing array:', updatedCategories)
    return true
  } catch (error) {
    console.error('Error adding category to existing array:', error)
    return false
  }
}

export async function getAllCategories() {
  const categories=await prisma.categories.findFirst();
  
  return categories;
}


// RECOMENDATION
// RECOMENDATION BY CATEGORY AND GENDER

export async function recomendationProduct(category,gender) {
  const allProducts=await prisma.product.findMany({
    where:{
      category,
      gender
    },
    take:11
  })
  return allProducts;
}