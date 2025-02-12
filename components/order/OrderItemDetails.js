
import { Button } from "@/components/ui/button"
import Image from '../Image'
import StatusTracker from './StatusTracker';
import AfterDeliveryView from "./AfterDeliveryView";
export default function OrderItemDetails({orderId,item} ) {
    return (
        <div className="max-w-4xl mx-auto bg-white">

            {/* Order ID */}
            <div className="p-4 text-gray-500">
                Order ID - {orderId}
            </div>

            {/* Product Details */}
            <div className="flex p-4 border-b">
                <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name} </h2>
                    <p className="text-gray-500">{item.color} </p>
                    <p className="text-gray-500">Seller: Faax </p>
                    <p className="text-2xl font-bold mt-2">₹{item.price} </p>
                    <p className="text-green-500">Size : {item.size}</p>
                </div>
                <Image path={`${item.image}`} alt="product image" loading="lazy" lqip={{active:true,quality:5,blur:10}} height={150} width={150} className="rounded-sm w-16 h-24 object-cover" />
            </div>

            {/* Status Tracker */}
            {item.order.status !=='COMPLETED'?<StatusTracker order={item.order} />:<AfterDeliveryView itemId={item.id} deliveredAt={item.order.deliveredAt} orderId={orderId} status={item.status}/> }
            

            {/* Shipping Address */}
            <div className="p-4 border-b">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p>{item.order.address.name} </p>
                <p>{item.order.address.streetName} </p>
                <p>{item.order.address.landmark} , BR {item.order.address.pinCode} </p>
                <p>Phone: {item.order.address.phoneNumber} </p>
            </div>

            {/* Payment Information */}
            <div className="p-4 ">
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <p>Payment Method: {item.order.paymentMethod} </p>
                <p>Card ending in: 1234</p>
                <p>Total Amount: ₹{item.price} </p>
            </div>

            {/* Need Help Section */}
            <div className="mb-8 gap-2 px-4 bg-gray-100 flex rounded-md">
                
                <Button variant="link" className="p-0 flex-1 cursor-pointer rounded-none text-blue-500">
                Need Help?
                </Button>
            </div>
        </div>
    )
}