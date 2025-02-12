"use server"
// import prisma from "@/lib/db/prisma";
import Razorpay from "razorpay";
// import dotenv from "dotenv"
// dotenv.config()

import { PrismaClient } from "@prisma/client";
import { getUserId } from "./user";
import { createOrderWithItems } from "./order";
const prisma=new PrismaClient();
export const initiate = async (amount,orders) => {
    console.log("KEY_ID:", process.env.NEXT_PUBLIC_KEY_ID);
    console.log("KEY_SECRET:", process.env.KEY_SECRET);
    try {
        // const keyId = process.env.KEY_ID.trim();
        // const keySecret = process.env.KEY_SECRET.trim();
        var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET });

        let options = {
            amount: Number.parseInt(amount)*100,
            currency: 'INR'
        };

        let x = await instance.orders.create(options);
        const userId=await getUserId()
        if(!userId) throw new Error('Unauthenticated please login',error)
        const orderId= await createOrderWithItems(orders)
        console.log('order form is ',orderId);

        if (!orderId) throw new Error('Unable to create order ')
        const createPayment=await prisma.payment.create({
            data:{
                userId,
                orderId,
                amount: Number.parseInt(amount),
                razorpayId:x.id
            }
        })
        // console.log('payment information is',createPayment)
        return x;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; 
    }
};