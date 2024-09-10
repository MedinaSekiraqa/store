import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Order } from '@/lib/types'
import { getServerSession } from 'next-auth'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"
const URL = `${API_URL}/orders`

const getOrders = async (storeId: string): Promise<Order[]> => {
   const session = await getServerSession(authOptions)
   const user = session?.user
   //@ts-ignore
   if (user && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
      console.log("yay")
      const res = await fetch(`${URL}/${storeId}/all`)
      return res.json()
   } else {
      console.log('NOT yay')

      // If user is not ADMIN or MANAGER, return an empty array or handle accordingly
      return []
   }
}

export default getOrders
