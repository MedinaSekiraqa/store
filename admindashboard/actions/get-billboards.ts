import { Billboard } from '@/lib/types'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"
const URL = `${API_URL}/billboards`

const getBillboards = async (storeId: string): Promise<Billboard[]> => {
   const res = await fetch(`${URL}/${storeId}/all`)

   return res.json()
}

export default getBillboards
