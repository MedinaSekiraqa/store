import { Brand } from '@/lib/types'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"
const URL = `${API_URL}/brands`

const getbrands = async (storeId: string): Promise<Brand[]> => {
   const res = await fetch(`${URL}/${storeId}/all`)

   return res.json()
}

export default getbrands
