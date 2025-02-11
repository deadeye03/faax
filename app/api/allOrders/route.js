import { NextResponse } from "next/server";
import { getUserId } from "@/actions/user";
import prisma from "@/lib/db/prisma";


//FIND ORDER OF USER WITH API

export async function GET() {
    const userId = getUserId()

    if (!userId) {
        return NextResponse.json({ message: 'Unauthenticate ' }, { status: 402 });
    }
    try {
        const orders = await prisma.order.findMany({
            where: { userId },
            include:{
                address:true,
                orderItems:true
            }
        });
        console.log('All orders:', JSON.stringify(orders, null, 2));
        if (orders) {

            return NextResponse.json(orders, { status: 200 });;
        } else {
            return NextResponse.json({ message: 'Product fetching failed' }, { status: 400 });
        }
    } catch (error) {
        console.log('unable to fetch orders', error)
        throw new Error('unable fetch orders', error)
    }

}