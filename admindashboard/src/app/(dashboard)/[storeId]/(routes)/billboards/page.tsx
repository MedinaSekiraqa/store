import React from 'react'
import BillboardClient from './components/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import getBillboards from '../../../../../../actions/get-billboards'
import { BillboardColumn } from './components/columns'
import { format } from 'date-fns'

export const metadata = {
   title: 'Billboards',
   description: 'Billboards for the store',
}

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const billboards = await getBillboards(params.storeId)

   const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(new Date(billboard.createdAt), 'dd MMMM yyyy'),
   }))

   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <BillboardClient
               //@ts-ignore
               user={session?.user}
               data={formattedBillboards}
            />
         </div>
      </div>
   )
}

export default BillboardsPage
