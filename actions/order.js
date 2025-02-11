"use server"

// import prisma from "@/lib/db/prisma";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./user";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
import twilio from 'twilio';

export async function createOrderWithItems(orders) {
    
    const userId = await getUserId();
    try {
        var isTrial = orders.isTrial === true
        console.log('isTrial is ', isTrial)
        const order = await prisma.order.create({
            data: {
                userId,
                total: orders.total,
                isTrial,
                addressId: orders.addressId,
                paymentMethod: orders.paymentMode,
                itemsQuantity: orders.totalQuantity,
            }
        })

        await prisma.orderItem.createMany({
            data: orders.cartItems?.map((item) => ({
                productId: item.id, // Add this
                name: item.name,
                size: item.size,
                color: item.color,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                image: item.images[0],
                orderId: order.id, // Add the orderId to associate the order
            })),
        })

        revalidatePath('/admin/Orders/Pending-Orders')
        return order.id;

    } catch (error) {
        console.log('unable to create order', error)
        return false;
    }

}

export async function getAllOrderWithUser() {
    const userId = await getUserId();
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId,
                paymentDone: true
            },
            include: {
                address: true,
                orderItems: true
            },
            orderBy: {
                createdAt: 'desc'
            }

        })
        console.log('All orders:', JSON.stringify(orders, null, 2));
        return orders;
    } catch (error) {
        console.log('unable to fetch orders', error)
        throw new Error('unable fetch orders', error)
    }
}

export async function orderItemDetails(orderId, orderItemId) {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        select: {
            address: true,
            paymentMethod: true,
            status: true,
            createdAt: true,
            confirmedAt: true,
            outForDeliveryAt: true,
            deliveredAt: true,

        }
    })
    const orderItem = await prisma.orderItem.findFirst({
        where: {
            id: orderItemId
        }
    })
    // console.log('order item status', orderItem)
    return {
        order,
        ...orderItem
    }

}

export async function allPendingOrders() {
    const orders = await prisma.order.findMany({
        where: {
            status: {
                not: 'COMPLETED', // This checks for all orders where status is NOT 'DELIVERED'

            },
            paymentDone: true
        },
        select: {
            user: true,
            id: true,
            paymentMethod: true,
            status: true,
            itemsQuantity: true, // Use `itemsQuantity` instead of `quantity`
            isTrial: true,
            total: true,
            createdAt: true,
            deliveryAgentId:true,
            deliveryAgent:true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // console.log(orders);
    return orders;
}

export async function updateOrderStatus(orderId, updatedStatus) {
    const dateField = {
        CONFIRMED: 'confirmedAt',
        CANCELLED: 'cancelledAt '
    }[updatedStatus];
    try {

        if (updatedStatus === 'CONFIRMED') {
            let update = await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: updatedStatus,
                    [dateField]: new Date(),
                },
                include: {
                    orderItems: {
                        include: {
                            product: true
                        }
                    },
                    user: true,
                    address: true
                }
            })

            console.log('update is in confirmed', update)

            //cretating delivery order for our delivery agen 

            const createDelivery = await prisma.delivery.create({
                data: {
                    orderId: update.id,
                    deliveryAddress: `${update.address.streetName}\n,${update.address.landmark}\n,${update.address.city}, ${update.address.pinCode}`,
                    customerName: update.address.name,
                    phoneNumber: update.address.phoneNumber,
                    deliveryMode: `${update.isTrial ? 'Trial ' : 'Standard'}`,
                    orderSummary: {
                        totalAmount: update.total,
                        itemsQuantity: update.itemsQuantity,
                        paymentMethod: update.paymentMethod,
                        orderItems: update.orderItems.map(item => ({
                            productId: item.productId,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            color: item.color,
                            size: item.size,
                            category: item.category,
                            image: item.image

                        }))
                    }
                }
            })
            console.log('created delivery is ', createDelivery)
            const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
            const whatsappGroupId = process.env.WHATSAPP_GROUP_ID;

            // Prepare and send WhatsApp notification
            const message = `New Delivery Order !\n
                        Total: ₹${createDelivery.orderSummary.totalAmount.toFixed(2)}
                        Quantity: ${createDelivery.orderSummary.itemsQuantity}
                        Delivery-address: ${createDelivery.deliveryAddress}
                        paymentMode: ONLINE
                        deliveryMode:${payment.order.isTrial ? 'Trial Mode' : 'standard mode'}
                        Status: PAID`;

            console.log('message is ', message)

            await twilioClient.messages.create({
                body: message,
                from: `whatsapp:${twilioPhoneNumber}`,
                to: `whatsapp:${whatsappGroupId}`
            });
        }
        revalidatePath('/admin/Orders/Pending-Orders')
        return true;
    } catch (error) {
        console.log('unable to update order', error);
        return false;
        
    }
}

export async function getAllDeliveredOrders() {
    const orders = await prisma.order.findMany({
        where: {
            status: 'COMPLETED'
        },
        select: {
            user: true,
            id: true,
            paymentMethod: true,
            status: true,
            itemsQuantity: true, // Use `itemsQuantity` instead of `quantity`
            isTrial: true,
            total: true,
        },
        orderBy: {
            deliveredAt: 'desc'
        }
    })
    // console.log('delivered order is ', orders);
    return orders;

}

