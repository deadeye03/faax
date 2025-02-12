import { orderItemDetails } from "@/actions/order"
import OrderItemDetails from "@/components/order/OrderItemDetails"


async function page({params}) {
    const orderId=params.slug[0]
    const item=params.slug[1]
    console.log(orderId,item)
    const order= await orderItemDetails(orderId,item)
    console.log('current ordritem is ',order)
  return (
    <>
      <OrderItemDetails orderId={orderId} item={order} />
    </>
  )
}

export default page
