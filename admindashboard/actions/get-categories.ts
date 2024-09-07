import { Category } from '@/lib/types'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api";
const URL = `${API_URL}/categories`;

const getCategories = async (storeId: string): Promise<Category[]> => {
   const res = await fetch(`${URL}/${storeId}/all`)

   return res.json()
}

export default getCategories
