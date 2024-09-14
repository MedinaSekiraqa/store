import React from 'react'
import BrandClient from './components/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import getbrands from '../../../../../../actions/get-brands'
import { BrandColumn } from './components/columns'
import { format } from 'date-fns'

export const metadata = {
   title: 'Brands',
   description: 'Brands for the store',
}

const SizePage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const brands = await getbrands(params.storeId)

   const formattedBrands: BrandColumn[] = brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      createdAt: format(new Date(brand.createdAt), 'dd MMMM yyyy'),
   }))

   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <BrandClient
               //@ts-ignore
               user={session.user}
               brands={formattedBrands}
            />
         </div>
      </div>
   )
}

export default SizePage
