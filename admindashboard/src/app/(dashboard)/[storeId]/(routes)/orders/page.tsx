import React from 'react'
import OrderClient from './components/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getOrders from '../../../../../../actions/get-orders';
import { OrderColumn } from './components/columns';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

export const metadata = {
  title: "Orders",
  description: "Orders for the store",
};

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const orders = await getOrders(params.storeId)

   const formattedOrders: OrderColumn[] = orders.map((order) => ({
      id: order.id,
      phone: order.phone,
      address: order.address,
      products: order.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalPrice: formatter.format(
         order.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
         }, 0)
      ),
      isPaid: order.isPaid,
      createdAt: format(new Date(order.createdAt), 'dd MMMM yyyy'),
   }))
   
   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <OrderClient
               //@ts-ignore
               user={session?.user}
               orders={formattedOrders}
            />
         </div>
      </div>
   )
}

export default OrdersPage