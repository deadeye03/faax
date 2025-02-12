
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { PrismaClient } from "@prisma/client";
import twilio from 'twilio';

const prisma = new PrismaClient();

// Initialize Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const whatsappGroupId = process.env.WHATSAPP_GROUP_ID;

export const POST = async (req) => {
    try {
        let body = await req.formData();
        body = Object.fromEntries(body);

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
        let payment = await prisma.payment.findFirst({
            where: {
                razorpayId: razorpay_order_id
            },
            include: {
                order: {
                    include: {
                        orderItems: true,
                        user: true
                    }
                }
            }
        });

        if (!payment) throw new Error('Razor pay id not found in payment id');
        console.log('payment order in razor pay', payment);

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            throw new Error('Missing required parameters');
        }

        const razorpaySecret = process.env.KEY_SECRET;
        if (!razorpaySecret) {
            throw new Error('KEY_SECRET is not defined');
        }

        let isVerified = validatePaymentVerification({
            "order_id": razorpay_order_id,
            "payment_id": razorpay_payment_id
        }, razorpay_signature, razorpaySecret);

        if (isVerified) {
            console.log("Payment successful");

            // Update order status
            const updateOrder = await prisma.order.update({
                where: {
                    id: payment.orderId
                },
                data: {
                    paymentsId: payment.id,
                    paymentDone: true
                }
            });
            console.log('updated order is ', updateOrder);

            // Update payment status
            const updatePayment = await prisma.payment.update({
                where: {
                    id: payment.id
                },
                data: {
                    paymentStatus: 'SUCCESS'
                }
            });
            console.log('updated payment is ', updatePayment);

            // Decrease product quantities
            for (const item of payment.order.orderItems) {
                // Determine the correct size field to update (e.g., s_size, m_size, etc.)
                const sizeField = {
                    S: 's_size',
                    M: 'm_size',
                    L: 'l_size',
                    XL: 'xl_size'
                }[item.size];
                // First, fetch the current stock for the relevant product
                const product = await prisma.product.findUnique({
                    where: {
                        id: item.productId
                    },
                    select: {
                        s_size: true,
                        m_size: true,
                        l_size: true,
                        xl_size: true
                    }
                });
                console.log('befor buy product stock with size',product)
                // Get the current stock value for the relevant size
                const currentStock = product[sizeField];

                // Check if the stock is sufficient
                if (currentStock < item.quantity) {
                    throw new Error(`Not enough stock for ${item.size} size in product ${item.name}`);
                }

                // Update the stock by reducing the quantity ordered
                await prisma.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        [sizeField]: currentStock - item.quantity
                    }
                });
                console.log('after buy product stock with size',product)
            }


            // Prepare and send WhatsApp notification
            const message = `Payment Verified Successfully!
                Order ID: ${payment.order.id}
                Customer: ${payment.order.user.name}
                Total: ₹${payment.order.total.toFixed(2)}
                Quantity: ${payment.order.itemsQuantity}
                addressId: ${payment.order.addressId}
                paymentMode: ONLINE
                deliveryMode:${payment.order.isTrial ? 'Trial Mode' : 'standard mode'}
                Status: PAID`;
                
                console.log('message is ',message)

            await twilioClient.messages.create({
                body: message,
                from: `whatsapp:${twilioPhoneNumber}`,
                to: `whatsapp:${whatsappGroupId}`
            });
            console.log('updated payment is ', updatePayment);

            // Redirect to the confirm-order page
            const url = new URL(req.url);
            url.pathname = '/confirm-order';

            // Clear cart from local storage
            // Note: This needs to be done client-side, so we'll pass a flag to the confirm-order page
            url.searchParams.append('orderVerified', 'true');

            return NextResponse.redirect(url);
        } else {
            console.log("Payment verification failed");

            // Delete the order and associated order items
            await prisma.orderItem.deleteMany({
                where: {
                    orderId: payment.orderId
                }
            });

            await prisma.order.delete({
                where: {
                    id: payment.orderId
                }
            });

            return NextResponse.json({ message: "Payment verification failed. Order has been cancelled." }, { status: 400 });
        }

    } catch (error) {
        console.error("Error during payment verification:", error);
        return NextResponse.json({ error: "An error occurred during payment verification" }, { status: 500 });
    }
};