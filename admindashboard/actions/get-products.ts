import { Product } from '@/lib/types'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"
const URL = `${API_URL}/products`

const getProducts = async (storeId: string): Promise<Product[]> => {
   const res = await fetch(`${URL}/${storeId}/all`)
   console.log(storeId)
   console.log(URL)

   return res.json()
}

export default getProducts
