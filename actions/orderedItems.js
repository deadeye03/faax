"use server"
import { PrismaClient } from "@prisma/client"

const prisma =new PrismaClient();

export const getAllOrderedItems=async()=>{
    try {
        const items=await prisma.orderItem.findMany({
            where:{
                orderId:id
            }
        })
        console.log('All ordered items are',items);
        return items
        
    } catch (error) {
        console.log('Unable to get Ordered Items',error);
        throw new Error('unable to fetch ordered items with order id',error)
    }
}