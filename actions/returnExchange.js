"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
export async function CreateReturnExchangeOrder(orderItem) {
    try {
        const userId = await getUserId();
        // console.log('use id is ', userId)
        if (!userId) false;
        const Exchange = await prisma.returnExchange.create({
            data: {
                userId: userId,
                orderId: orderItem.orderId,
                type: orderItem.type,
                orderItemId: orderItem.orderItemId,
                reason: orderItem.reason
            }
        })
        let retunItemStatus;
        orderItem.type == 'RETURN' ? retunItemStatus = 'PENDING_RETURN' : retunItemStatus = 'PENDING_EXCHANGE';
        await prisma.orderItem.update({
            where: {
                id: orderItem.orderItemId
            },
            data: {
                status: retunItemStatus
            }
        })
        return true;
    } catch (error) {
        console.log('Error during return / exchange', error)
        return false;
    }
}
export async function getReturnExchangeStatus(id) {
    const status = await prisma.returnExchange.findFirst({
        where: {
            orderItemId: id
        }
    })
    // console.log('status of order is ', status)
    return status;
}

export async function getAllPendingReturnExchangeOrders() {
    const allOrders = await prisma.returnExchange.findMany({
        where: {
            status: {
                not: 'COMPLETED'
            }
        },
        include: {
            user: true,
            orderItem: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    // console.log('all pending order is ', allOrders);
    return allOrders;
}

export async function updateReturnExchangeOrderStatus(id, status) {
    try {
        const dateField = {
            APPROVED: 'approvedAt',
            PROCESSING: 'processedAt',
            COMPLETED: 'completedAt',
            REJECTED:'rejectedAt'
        }[status];
    
        if (dateField) {
            const update = await prisma.returnExchange.update({
                where: { id },
                data: {
                    status: status,
                    [dateField]: new Date(),
                },
            });
        }
        revalidatePath('/admin/Return-Exchange/Pending-Orders')
        return true
    } catch (error) {
        console.log('during update returnExchange status',error)
        return false;
    }
}
