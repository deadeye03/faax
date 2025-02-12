import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";


const API_KEY = process.env.API_KEY; 
const API_URL =process.env.API_URL


export async function POST(req) {
    // Set CORS headers manually
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', `${API_URL}`);
    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return new NextResponse(null, { headers, status: 204 });
    }

    // Validate API key
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
        console.log('unauthenticated in authheader');
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401, headers });
    }

    try {
        const { orderId, deliveryAgentId, orderStatus } = await req.json();
        console.log('orderid deliveryID status', orderId, deliveryAgentId, orderStatus);

        const dateField = {
            OutForDelivery: 'outForDeliveryAt',
            COMPLETED: 'deliveredAt',
            CANCELLED: 'cancelledAt '
        }[orderStatus];

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: orderStatus,
                deliveryAgentId,
                [dateField]: new Date()
            }
        });

        return NextResponse.json({ message: 'Order updated successfully', data: updatedOrder }, { status: 200 });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ message: 'Failed to update order', error: error.message }, { status: 500 });
    }
}