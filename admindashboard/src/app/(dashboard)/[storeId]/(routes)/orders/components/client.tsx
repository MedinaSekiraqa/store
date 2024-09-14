import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface OrderClientProps {
   user: {
      name: string
      email: string
      role: string
   }
   orders: OrderColumn[]
}

const OrderClient = ({ user, orders }: OrderClientProps) => {
   return (
      <>
         {user.role === 'ADMIN' || user.role === 'MANAGER' ? (
            <>
               <Heading title={`Orders (${orders.length})`} description="Manage orders for your store" />
               <Separator />
               <DataTable columns={columns} data={orders} searchKey="products" />
            </>
         ) : (
            <div className="flex justify-center">
               <div className="w-1/2 pt-2">
                  <h1 className="text-lg text-center">
                     Hello! You&apos;re a regular user. Your role is to view and interact with the content, but you won&apos;t be
                     able to make any changes.
                  </h1>
               </div>
            </div>
         )}
      </>
   )
}

export default OrderClient
