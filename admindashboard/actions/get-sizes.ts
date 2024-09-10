import { Size } from '@/lib/types'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"
const URL = `${API_URL}/sizes`

const getSizes = async (storeId: string): Promise<Size[]> => {
   const res = await fetch(`${URL}/${storeId}/all`)

   return res.json()
}

export default getSizes
