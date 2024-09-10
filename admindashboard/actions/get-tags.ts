import { Tag } from '@/lib/types'

const API_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"
const URL = `${API_URL}/tags`

const getTags = async (storeId: string): Promise<Tag[]> => {
   const res = await fetch(`${URL}/${storeId}/all`)

   return res.json()
}

export default getTags
