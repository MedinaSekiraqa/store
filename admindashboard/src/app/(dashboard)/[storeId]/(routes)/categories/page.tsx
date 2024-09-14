import React from 'react'
import CategoryClient from './components/client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getCategories from '../../../../../../actions/get-categories';
import { format } from 'date-fns';
import { CategoryColumn } from './components/columns';

export const metadata = {
  title: "Categories",
  description: "Categories for the store",
};
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
   const session = await getServerSession(authOptions)
   const categories = await getCategories(params.storeId)

   const formattedCategories: CategoryColumn[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
      billboard: category.billboard.label,
      createdAt: format(new Date(category.createdAt), 'dd MMMM yyyy'),
   }))
   
   return (
      <div className="flex-col px-4">
         <div className="flex-1 space-y-4p-8 pt-6">
            <CategoryClient
               //@ts-ignore
               user={session?.user}
               data={formattedCategories}
            />
         </div>
      </div>
   )
}

export default CategoriesPage